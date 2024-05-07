package project.friendbot.domain.user.dto

// 회원 가입 request
data class SignUpUserRequest(
    val username: String,
    val password: String,
    val email: String,
)
