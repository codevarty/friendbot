package project.friendbot.domain.user.dto

import java.time.LocalDate


// 일반 response
data class UserResponse(
    val username: String,
    val email: String,
    val birthDate: LocalDate,
)
