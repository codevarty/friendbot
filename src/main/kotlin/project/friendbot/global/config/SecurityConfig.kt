package project.friendbot.global.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.SecurityFilterChain

@Configuration
@EnableWebSecurity
class SecurityConfig(val passwordEncoder: BCryptPasswordEncoder) {

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http.csrf { config -> config.disable() }
            .authorizeHttpRequests { authorizeRequests ->
                authorizeRequests
                    .anyRequest().permitAll() // 테스트를 위해 모두 허용
            }

        return http.build()
    }
}