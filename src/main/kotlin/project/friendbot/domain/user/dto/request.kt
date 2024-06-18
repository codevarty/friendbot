package project.friendbot.domain.user.dto

import org.springframework.format.annotation.DateTimeFormat
import java.time.LocalDate

// 회원 가입 request
data class SignUpUserRequest(
    val username: String,
    val password: String,
    val email: String,
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    val birthdate: LocalDate,
)

// 회원 비밀번호 수정 request
data class UpdatePasswordRequest(
    val currentPassword: String,
    val newPassword: String
)

// 회원 정보 수정 request
data class UpdateUserInfoRequest(
    val username: String,
    val birthdate: LocalDate,
)