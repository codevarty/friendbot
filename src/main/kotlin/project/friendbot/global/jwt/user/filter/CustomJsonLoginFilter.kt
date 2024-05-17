package project.friendbot.global.jwt.user.filter

import com.fasterxml.jackson.databind.ObjectMapper
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.LoggerFactory
import org.springframework.security.authentication.AuthenticationServiceException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter
import org.springframework.security.web.util.matcher.AntPathRequestMatcher
import org.springframework.util.StreamUtils
import java.nio.charset.StandardCharsets


class CustomJsonLoginFilter(private val objectMapper: ObjectMapper) :
    AbstractAuthenticationProcessingFilter(AntPathRequestMatcher("/api/user/login", "POST")) {


    private val log = LoggerFactory.getLogger(CustomJsonLoginFilter::class.java)


    override fun attemptAuthentication(request: HttpServletRequest?, response: HttpServletResponse?): Authentication {
        if (request === null) {
            throw AuthenticationServiceException("AuthenticationService")
        }


        if (request.contentType === null || request.contentType != "application/json") {
            throw AuthenticationServiceException("Authentication Content-Type not supported: " + request.contentType)
        }

        val messageBody = StreamUtils.copyToString(request.inputStream, StandardCharsets.UTF_8)
        val usernamePasswordMap: MutableMap<String, String>? = objectMapper.readValue(
            messageBody,
            MutableMap::class.java
        ) as MutableMap<String, String>?

        val email = usernamePasswordMap?.get("email")
        val password = usernamePasswordMap?.get("password")


        log.info("email=$email, password=$password")

        val authenticationToken = UsernamePasswordAuthenticationToken(email, password)
        return authenticationManager.authenticate(authenticationToken)
    }
}