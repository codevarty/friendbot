package project.friendbot.domain.gpt.dto

import project.friendbot.global.completion.Completion

/*
kotlin은 data class 로 dto를 정의 할 수 있다.
 */
data class CompletionRequestDto(
    val type: String,
    val content: String
) {
    fun toCompletion(): Completion = Completion("user", this.content)
}