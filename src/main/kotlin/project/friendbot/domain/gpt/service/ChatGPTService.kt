package project.friendbot.domain.gpt.service

import org.springframework.stereotype.Service
import project.friendbot.domain.gpt.dto.CompletionRequestDto
import project.friendbot.domain.gpt.dto.TranscriptionRequestDto

@Service
interface ChatGPTService {

    fun modelList(): List<Map<String, Any>>
    fun prompt(completionRequestDto: CompletionRequestDto): Map<String, Any>
    fun isValidModel(modelName: String): Map<String, Any>

    fun speechToText(transcriptionRequestDto: TranscriptionRequestDto): String
}