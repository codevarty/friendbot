package project.friendbot.domain.gpt.dto

import com.google.gson.annotations.SerializedName

data class ChatMessageRequest(
    val model: String,
    val messages: List<CompletionRequestDto> = arrayListOf(),
    val temperature: Int,
    @SerializedName("max_tokens")
    val maxTokens: Int = 256,
)
