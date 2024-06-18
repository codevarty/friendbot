package project.friendbot.domain.user.service

import jakarta.transaction.Transactional
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import project.friendbot.domain.user.dto.SignUpUserRequest
import project.friendbot.domain.user.dto.UpdateUserInfoRequest
import project.friendbot.domain.user.dto.UserResponse
import project.friendbot.domain.user.entity.User
import project.friendbot.domain.user.repository.UserRepository

@Service
class UserService(
    private val userRepository: UserRepository,
    private val passwordEncoder: BCryptPasswordEncoder
) {

    @Transactional
    fun createUser(signUpUserRequest: SignUpUserRequest): Long {
        println("회원 가입: $signUpUserRequest")
        if (userRepository.findByEmail(signUpUserRequest.email).isPresent) {
            throw Error("이메일이 중복되었습니다.")
        }
        // 비밀번호 암호화
        val password = passwordEncoder.encode(signUpUserRequest.password)
        val user = User(signUpUserRequest.email, signUpUserRequest.username, password, signUpUserRequest.birthdate)

        userRepository.save(user)

        return user.id!!
    }

    @Transactional
    fun updateUserInfo(email: String, updateUserInfoRequest: UpdateUserInfoRequest): UserResponse {
        val findUser = userRepository.findByEmail(email)
            .orElseThrow { Error("사용자를 찾을 수 없습니다.") }

        findUser.updateUserInfo(updateUserInfoRequest.username, updateUserInfoRequest.birthdate)

        userRepository.save(findUser)

        return UserResponse(findUser.name, findUser.email, findUser.birthdate)
    }

    fun findByEmail(email: String): User = userRepository.findByEmail(email)
        .orElseThrow { Error("사용자를 찾을 수 없습니다.") }

    @Transactional
    fun deleteUser(id: Long) {
        val findUser = userRepository.findById(id)
            .orElseThrow { Error("사용자를 찾을 수 없습니다.") }

        userRepository.delete(findUser)
    }
}