package project.friendbot.global.jwt.filter

import com.fasterxml.jackson.databind.ObjectMapper
import io.jsonwebtoken.JwtException
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.filter.OncePerRequestFilter
import project.friendbot.domain.user.entity.User
import project.friendbot.domain.user.repository.UserRepository
import project.friendbot.global.jwt.service.JwtService
import project.friendbot.global.jwt.user.service.CustomUserDetailService
import java.io.IOException

class JwtAuthenticationProcessingFilter(
    private val jwtService: JwtService,
    private val userRepository: UserRepository,
    private val customUserDetailService: CustomUserDetailService
) : OncePerRequestFilter() {

    companion object {
        private val NO_CHECK_URLS = listOf("/api/user/login", "/api/logout")
    }

    private val authoritiesMapper = NullAuthoritiesMapper()

    private val objectMapper = ObjectMapper()

    @Throws(ServletException::class, IOException::class)
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        try {
            if (NO_CHECK_URLS.contains(request.requestURI)) {
                filterChain.doFilter(request, response) // /login 호출이 들어오면 다음 필터 호출
                return
            }
            // 사용자 요청에서 refresh token 추출
            val refreshToken = jwtService.extractRefreshToken(request)
                .filter(jwtService::isTokenValid)
                .orElse(null)

            // 1. refresh token 이 있는 경우
            if (refreshToken != null) {
                checkRefreshTokenAndReIssueAccessToken(response, refreshToken)
                println(refreshToken)
                filterChain.doFilter(request, response) // 재발급을 위해 다음 필터 이동
            }

            // 2. refresh token 이 없는 경우
            checkAccessTokenAndAuthentication(request, response, filterChain)
        } catch (e: JwtException) {
            // jwt Exception 핸들링
            response.contentType = MediaType.APPLICATION_JSON_VALUE
            response.status = HttpStatus.UNAUTHORIZED.value()
            response.characterEncoding = "UTF-8"
            objectMapper.writeValue(response.writer, e.message)
        }
    }

    private fun checkRefreshTokenAndReIssueAccessToken(response: HttpServletResponse, refreshToken: String) {
        userRepository.findByRefreshToken(refreshToken)
            .ifPresent { user ->
                run {
                    val reIssuedRefreshToken = reIssueRefreshToken(user)
                    jwtService.sendAccessAndRefreshToken(
                        response,
                        jwtService.generateAccessToken(user.email),
                        reIssuedRefreshToken
                    )
                }
            }
    }

    private fun reIssueRefreshToken(user: User): String {
        val generateRefreshToken = jwtService.generateRefreshToken()
        user.updateToken(generateRefreshToken)
        userRepository.save(user)
        return generateRefreshToken
    }

    @Throws(ServletException::class, IOException::class)
    fun checkAccessTokenAndAuthentication(
        request: HttpServletRequest?, response: HttpServletResponse?,
        filterChain: FilterChain
    ) {
        jwtService.extractAccessToken(request!!)
            .filter(jwtService::isTokenValid)
            .ifPresent { accessToken ->
                jwtService.extractEmail(accessToken)
                    .ifPresent { email ->
                        userRepository.findByEmail(email)
                            .ifPresent { myUser: User? -> this.saveAuthentication(myUser!!) }
                    }
            }
        filterChain.doFilter(request, response)
    }

    private fun saveAuthentication(user: User) {
        val customUserDetails = customUserDetailService.loadUserByUsername(user.email)
        val authentication = UsernamePasswordAuthenticationToken(
            customUserDetails,
            null,
            authoritiesMapper.mapAuthorities(customUserDetails.authorities)
        )

        SecurityContextHolder.getContext().authentication = authentication
    }
}