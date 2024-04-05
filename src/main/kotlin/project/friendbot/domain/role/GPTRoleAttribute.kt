package project.friendbot.domain.role

import com.google.gson.Gson
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.ClassPathResource
import org.springframework.stereotype.Component
import org.springframework.util.FileCopyUtils
import project.friendbot.domain.enums.GPTRoleType
import project.friendbot.domain.gpt.dto.CompletionRequestDto
import project.friendbot.domain.role.dto.Message
import java.nio.charset.StandardCharsets

@Component
class GPTRoleAttribute(@Autowired gson: Gson) {

    private final val json: Message

    // 상수 정의 --> java static final
    companion object {
        const val ROLE = "system"
    }

    init {
        val resource = ClassPathResource("json/GPT-ROLE.json")
        val byteData = FileCopyUtils.copyToByteArray(resource.inputStream)
        val data = String(byteData, StandardCharsets.UTF_8)
        json = gson.fromJson(data, Message::class.java)
    }

    fun selectRole(type: GPTRoleType): CompletionRequestDto {
        return when (type) {
            GPTRoleType.SPEAKER -> toCompletionRequest(json.speaker.content ?: "")

            GPTRoleType.TEACHER -> toCompletionRequest(json.teacher.content ?: "")

            GPTRoleType.COUNSELOR -> toCompletionRequest(json.counselor.content ?: "")

            GPTRoleType.FRIEND -> toCompletionRequest(json.friend.content ?: "")

            else -> throw IllegalArgumentException("제공되지 않는 타입입니다. GPTRoleType: $type")
        }
    }

    private fun toCompletionRequest(data: String): CompletionRequestDto = CompletionRequestDto(ROLE, data)
}