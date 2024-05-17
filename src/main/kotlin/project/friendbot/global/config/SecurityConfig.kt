package project.friendbot.global.config

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.ProviderManager
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.logout.LogoutFilter
import project.friendbot.domain.user.repository.UserRepository
import project.friendbot.global.jwt.filter.JwtAuthenticationProcessingFilter
import project.friendbot.global.jwt.service.JwtService
import project.friendbot.global.jwt.user.filter.CustomJsonLoginFilter
import project.friendbot.global.jwt.user.handler.LoginFailureHandler
import project.friendbot.global.jwt.user.handler.LoginSuccessHandler
import project.friendbot.global.jwt.user.service.CustomUserDetailService

@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val jwtService: JwtService,
    private val userRepository: UserRepository,
    private val customUserDetailService: CustomUserDetailService,
    private val objectMapper: ObjectMapper,
    private val loginSuccessHandler: LoginSuccessHandler,
    private val loginFailureHandler: LoginFailureHandler,

    ) {

    @Bean
    fun passwordEncoder(): BCryptPasswordEncoder = BCryptPasswordEncoder()

    private val allowPatterns = arrayOf("/", "/api/user/signup")

    @Bean
    fun authenticationManager(): AuthenticationManager {
        val provider = DaoAuthenticationProvider()
        provider.setPasswordEncoder(passwordEncoder())
        provider.setUserDetailsService(customUserDetailService)
        return ProviderManager(provider)
    }

    @Bean
    fun customJsonLoginFilter(): CustomJsonLoginFilter {
        val customJsonLoginFilter = CustomJsonLoginFilter(objectMapper)
        customJsonLoginFilter.setAuthenticationManager(authenticationManager())
        customJsonLoginFilter.setAuthenticationSuccessHandler(loginSuccessHandler)
        customJsonLoginFilter.setAuthenticationFailureHandler(loginFailureHandler)
        return customJsonLoginFilter

    }

    @Bean
    fun jwtAuthenticationProcessingFilter(): JwtAuthenticationProcessingFilter {
        return JwtAuthenticationProcessingFilter(jwtService, userRepository, customUserDetailService)
    }

    @Bean
    open fun filterChain(http: HttpSecurity): SecurityFilterChain {

        http.csrf { it.disable() }
        http.httpBasic { it.disable() } // form login, redirect 비활성화 => rest api 통신을 하기 때문

        http
            .authorizeHttpRequests { authorizeRequests ->
                authorizeRequests
                    .requestMatchers(*allowPatterns).permitAll()
                    .anyRequest().authenticated()// 테스트를 위해 모두 허용
            }

        // 세션을 사용하지 않으므로 STATELESS 설정
        http.sessionManagement { it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }

        // filter 적용
        http.addFilterAfter(customJsonLoginFilter(), LogoutFilter::class.java)
        http.addFilterBefore(jwtAuthenticationProcessingFilter(), CustomJsonLoginFilter::class.java)

        return http.build()
    }
}