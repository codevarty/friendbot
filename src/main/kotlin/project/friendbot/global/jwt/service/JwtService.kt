package project.friendbot.global.jwt.service

import io.jsonwebtoken.Claims
import io.jsonwebtoken.ExpiredJwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.MalformedJwtException
import io.jsonwebtoken.UnsupportedJwtException
import io.jsonwebtoken.security.Keys
import jakarta.annotation.PostConstruct
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import project.friendbot.domain.user.repository.UserRepository
import java.util.*
import javax.crypto.SecretKey

@Service
class JwtService(private val userRepository: UserRepository) {

    private val log = LoggerFactory.getLogger(this.javaClass)

    // static final 상수 정의
    companion object {
        private const val ACCESS_TOKEN_SUBJECT = "Authorization"
        private const val REFRESH_TOKEN_SUBJECT = "Authorization refresh"
        private const val BEARER = "Bearer "
    }

    @Value("\${jwt.secretKey}")
    private lateinit var secretKey: String

    @Value("\${jwt.access.expiration}")
    private lateinit var accessTokenExpiration: String // lateinit 은 기본형 초기화를 지원하지 않는다.

    @Value("\${jwt.refresh.expiration}")
    private lateinit var refreshTokenExpiration: String

    @Value("\${jwt.access.header}")
    private lateinit var accessTokenHeader: String

    @Value("\${jwt.refresh.header}")
    private lateinit var refreshTokenHeader: String

    // jwt 토큰에 사용되는 키
    private lateinit var key: SecretKey

    @PostConstruct
    fun init() {
        // Base64로 인코딩
        val encodeKey = Base64.getEncoder().encodeToString(secretKey.toByteArray())
        key = Keys.hmacShaKeyFor(encodeKey.toByteArray())
    }

    /**
     *  Access Token 생성 메소드
     */
    fun generateAccessToken(email: String): String {
        val now = Date()
        return Jwts.builder()
            .subject(ACCESS_TOKEN_SUBJECT)
            .expiration(Date(now.time + accessTokenExpiration.toLong()))
            .claim("email", email)
            .signWith(key)
            .compact()
    }

    /**
     *  Refresh Token 생성 메소드
     */
    fun generateRefreshToken(): String {
        val now = Date()
        return Jwts.builder()
            .subject(REFRESH_TOKEN_SUBJECT)
            .expiration(Date(now.time + refreshTokenExpiration.toLong()))
            .signWith(key)
            .compact()
    }

    /**
     *  Access Token을 헤더에 담아서 보낸다.
     */
    fun sendAccessToken(response: HttpServletResponse, accessToken: String) {
        response.status = HttpServletResponse.SC_OK
        response.addHeader(accessTokenHeader, accessToken)
    }

    /**
     * Access Token과 Refresh Token을 헤더에 담아서 보낸다.
     */
    fun sendAccessAndRefreshToken(response: HttpServletResponse, accessToken: String, refreshToken: String) {
        response.status = HttpServletResponse.SC_OK
        response.addHeader(accessTokenHeader, accessToken)
        response.addHeader(refreshTokenHeader, refreshToken)
    }

    /**
     * 데이터베이스에 저장된 Refresh Token 가져오기
     */
    fun getRefreshToken(email: String): String {
        val user = userRepository.findByEmail(email)
            .orElseThrow { Error("사용자를 찾을 수 없습니다.") }
        return user.refreshToken!!
    }

    /**
     * 데이터베이스에 저장된 Refresh Token 업데이트
     */
    fun updateRefreshToken(email: String, refreshToken: String) {
        val user = userRepository.findByEmail(email)
            .orElseThrow { Error("사용자를  찾을 수 없습니다,") }

        user.updateToken(refreshToken)
        userRepository.save(user)
    }

    /**
     *  받은 Refresh Token 에서 Bearer 제거 시키기
     */
    fun extractRefreshToken(request: HttpServletRequest): Optional<String> {
        return Optional.ofNullable(request.getHeader(refreshTokenHeader))
            .filter { it.startsWith(BEARER) }
            .map { it.replace(BEARER, "") }
    }

    /**
     *  받은 Access Token 에서 Bearer 제거 시키기
     */
    fun extractAccessToken(request: HttpServletRequest): Optional<String> {
        return Optional.ofNullable(request.getHeader(accessTokenHeader))
            .filter { it.startsWith(BEARER) }
            .map { it.replace(BEARER, "") }
    }

    fun extractEmail(token: String): Optional<String> {
        try {
            val claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
            return Optional.ofNullable(claims.payload.get("email", String::class.java))
        } catch (e: Exception) {
            return Optional.empty()
        }
    }

    /**
     * 토큰 검증 메소드
     */
    fun isTokenValid(token: String): Boolean {
        try {
            Jwts.parser().verifyWith(key).build().parseSignedClaims(token)
            return true
        } catch (e: MalformedJwtException) {
            log.error("Invalid JWT token: {}", e.message)
        } catch (e: ExpiredJwtException) {
            log.error("JWT token is expired: {}", e.message)
        } catch (e: UnsupportedJwtException) {
            log.error("JWT token is unsupported: {}", e.message)
        } catch (e: IllegalArgumentException) {
            log.error("JWT claims string is empty: {}", e.message)
        }

        return false
    }

    fun isRefreshTokenValid(token: String): Boolean {
        if (isTokenValid(token)) {
            return true
        }

        // 토큰이 같은지 검사를 한다.
        val findByRefreshToken = userRepository.findByRefreshToken(token)

        return !findByRefreshToken.isEmpty
    }


}