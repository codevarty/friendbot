package project.friendbot.global.jwt.user.service

import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import project.friendbot.domain.user.entity.User
import project.friendbot.domain.user.repository.UserRepository
import project.friendbot.global.jwt.user.CustomUserDetails

@Service
class CustomUserDetailService(private val userRepository: UserRepository) : UserDetailsService {
    override fun loadUserByUsername(email: String): UserDetails {
        val user: User = userRepository.findByEmail(email)
            .orElseThrow { Error("사용자를 찾을 수 없습니다.") }

        return CustomUserDetails(user)
    }
}