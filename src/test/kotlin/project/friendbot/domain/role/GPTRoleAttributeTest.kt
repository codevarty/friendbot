package project.friendbot.domain.role

import com.google.gson.Gson
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test

class GPTRoleAttributeTest {

    private val gptRoleAttribute: GPTRoleAttribute = GPTRoleAttribute(Gson())

    @Test
    @DisplayName("GPT system json 파일 읽기")
    fun readSelectRoleContent() {
        val speaker = gptRoleAttribute.selectRole("speaker")

        // 값이 들어 있는지 확인한다.
        assertThat(speaker.content).isNotBlank()
    }

    @Test
    @DisplayName("비어있는 json 파일 읽기")
    fun readEmptyRoleContent() {
        val friend = gptRoleAttribute.selectRole("friend")

        // 값이 비어있는지 확인한다.
        assertThat(friend.content).isBlank()
    }
}