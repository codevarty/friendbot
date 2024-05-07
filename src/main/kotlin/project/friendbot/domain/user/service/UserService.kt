package project.friendbot.domain.user.service

import jakarta.transaction.Transactional
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import project.friendbot.domain.user.dto.SignUpUserRequest
import project.friendbot.domain.user.dto.UserResponse
import project.friendbot.domain.user.entity.User
import project.friendbot.domain.user.repository.UserRepository

@Service
class UserService(
    private val userRepository: UserRepository,
    private val passwordEncoder: BCryptPasswordEncoder
) {

    @Transactional
    fun join(signUpUserRequest: SignUpUserRequest): UserResponse {
        // 비밀번호 암호화
        val password = passwordEncoder.encode(signUpUserRequest.password)
        val user = User(signUpUserRequest.email, signUpUserRequest.username, password)

        userRepository.save(user)

        return UserResponse(user.name, user.email)
    }
}