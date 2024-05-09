package project.friendbot.domain.user.dto

import java.time.LocalDateTime


// 일반 response
data class UserResponse(
    val username: String,
    val email: String,
    val birthDate: LocalDateTime,
)
