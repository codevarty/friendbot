package project.friendbot.domain.role.dto

data class Message(
    val speaker: Content,
    val teacher: Content,
    val counselor: Content,
    val friend: Content

)

// Message Content
data class Content(
    val content: String?
)
