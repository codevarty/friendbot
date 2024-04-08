package project.friendbot.domain.gpt.dto

import com.google.gson.annotations.SerializedName
import project.friendbot.global.completion.Completion

data class ChatMessageRequest(
    val model: String,
    val messages: List<Completion> = arrayListOf(),
    val temperature: Int,
    @SerializedName("max_tokens")
    val maxTokens: Int = 256,
)

