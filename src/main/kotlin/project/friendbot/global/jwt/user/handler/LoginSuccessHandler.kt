package project.friendbot.global.jwt.user.handler

import com.fasterxml.jackson.databind.ObjectMapper
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler
import org.springframework.stereotype.Component
import project.friendbot.domain.user.dto.UserResponse
import project.friendbot.domain.user.entity.User
import project.friendbot.domain.user.repository.UserRepository
import project.friendbot.global.jwt.service.JwtService
import project.friendbot.global.jwt.user.CustomUserDetails
import java.io.IOException

@Component
class LoginSuccessHandler( // 로그인 성공시 실행 되는 핸들러
    private val jwtService: JwtService,
    // userService 를 사용하면 filter 순환 에러가 발생하므로 userRepository 를 사용
    private val userRepository: UserRepository,
    private val objectMapper: ObjectMapper
) : SimpleUrlAuthenticationSuccessHandler() {


    private val log = LoggerFactory.getLogger(LoginSuccessHandler::class.java)

    @Value("\${jwt.access.expiration}")
    private lateinit var accessTokenExpiration: String

    private fun extractEmail(authentication: Authentication): String {
        val userDetails: CustomUserDetails = authentication.principal as CustomUserDetails
        return userDetails.getEmail()
    }

    @Throws(IOException::class, ServletException::class)
    override fun onAuthenticationSuccess(
        request: HttpServletRequest?,
        response: HttpServletResponse,
        authentication: Authentication?
    ) {
        if (authentication == null) return
        val email: String = extractEmail(authentication)
        val accessToken: String = jwtService.generateAccessToken(email)
        val refreshToken: String = jwtService.generateRefreshToken()

        // 사용자가 로그인 할 때 마다  새로운 토큰을 생성하여 발급한다.
        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken)

        val user: User = userRepository.findByEmail(email)
            .orElseThrow { Error("유저를 찾을 수 없습니다.") }

        jwtService.updateRefreshToken(user.email, refreshToken)

        log.info("Login Success. email={}", user.email)
        log.info("Login Success. AccessToken={}", accessToken)
        log.info("accessToken Expiration={}", accessTokenExpiration)

        response.status = HttpServletResponse.SC_OK
        response.contentType = "application/json"
        response.characterEncoding = "UTF-8"

        val userResponse = UserResponse(
            username = user.name,
            email = user.email,
            birthDate = user.birthdate
        )

        objectMapper.writeValue(response.writer, userResponse)
    }
}