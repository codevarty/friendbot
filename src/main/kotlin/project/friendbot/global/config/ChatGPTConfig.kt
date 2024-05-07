package project.friendbot.global.config

import io.netty.channel.ChannelOption
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpHeaders
import org.springframework.http.client.reactive.ReactorClientHttpConnector
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.reactive.function.client.WebClient
import reactor.netty.http.client.HttpClient
import reactor.netty.resources.ConnectionProvider
import java.time.Duration


@Configuration
class ChatGPTConfig {

    companion object {
        // 상수 설정
        const val OPENAI_API_URL: String = "https://api.openai.com/v1"
    }

    @Value("\${openapi.secret-key}") // YAML 파일에 있는 시크릿 키 매핑
    lateinit var secretKey: String

    val httpClient = HttpClient.create()
        .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 10000) // 연결 유지 시간을 10초로 지정

    /*
    webClient를 사용하여 openapi 접속
     */
    @Bean
    fun webClient(): WebClient =
        WebClient.builder().baseUrl(OPENAI_API_URL) // 기본 url 지정
            .defaultHeader(
                HttpHeaders.CONTENT_TYPE,
                "application/json"
            ) // 기본 Content type 지정
            .clientConnector(ReactorClientHttpConnector(httpClient))
            .build()

    /*
        API 통신 과정시 timeout 되어 해당 서버와의 연결이 끊긴 경우
        'Connection prematurely closed BEFORE response' 에러 방지를 위해
        커넥션풀 설정
    */
    @Bean
    fun connectionProvider() = ConnectionProvider.builder("http-pool")
        .maxConnections(100)
        .pendingAcquireTimeout(Duration.ofMillis(0))
        .pendingAcquireMaxCount(-1)
        .maxIdleTime(Duration.ofMillis(1000L))
        .build()

    /*
    chatGTP 인증을 위한 토큰을 헤더에 설정
     */
    @Bean
    fun httpHeaders(): HttpHeaders {
        val headers = HttpHeaders()
        headers.set("Authorization", "Bearer $secretKey")
        return headers
    }

    @Bean
    fun passwordEncoder(): BCryptPasswordEncoder = BCryptPasswordEncoder()
}