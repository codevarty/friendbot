package project.friendbot.domain.gpt.dto

/*
kotlin은 data class 로 dto를 정의 할 수 있다.
 */
data class CompletionRequestDto(
    val role: String = "user",
    val content: String
)