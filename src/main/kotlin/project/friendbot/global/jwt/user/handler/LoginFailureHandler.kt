package project.friendbot.global.jwt.user.handler

import com.fasterxml.jackson.databind.ObjectMapper
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.MediaType
import org.springframework.security.authentication.AuthenticationServiceException
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler
import org.springframework.stereotype.Component

@Component // 로그인 실패시 실행 되는 핸들러.
class LoginFailureHandler(private val objectMapper: ObjectMapper) :
    SimpleUrlAuthenticationFailureHandler() {

    companion object {
        private const val ERROR_MESSAGE = "이메일이나 비밀번호를 확인해주세요."
    }

    override fun onAuthenticationFailure(
        request: HttpServletRequest?,
        response: HttpServletResponse?,
        exception: AuthenticationException?
    ) {
        if (response == null || !response.isCommitted) {
            throw AuthenticationServiceException("Authentication failed")
        }

        response.status = HttpServletResponse.SC_BAD_REQUEST
        response.contentType = MediaType.APPLICATION_JSON_VALUE
        objectMapper.writeValue(response.outputStream, ERROR_MESSAGE)

    }
}