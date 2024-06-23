package project.friendbot.global.controller

import io.jsonwebtoken.JwtException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import project.friendbot.global.jwt.service.JwtService

@RestController
@RequestMapping("/api")
class JwtController(private val jwtService: JwtService) {

    @PostMapping("/refresh-token")
    fun reissue(
        request: HttpServletRequest,
        response: HttpServletResponse
    ): String {
        // refresh token을 받는다.
        val refreshToken = jwtService.extractRefreshToken(request)
            .filter(jwtService::isTokenValid)
            .orElseThrow { throw JwtException("Refresh token is invalid") }

        println("received token: $refreshToken")
        return "hello"
    }
}