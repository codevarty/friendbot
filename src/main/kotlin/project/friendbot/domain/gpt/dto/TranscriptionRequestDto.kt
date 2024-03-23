package project.friendbot.domain.gpt.dto

import org.springframework.web.multipart.MultipartFile

data class TranscriptionRequestDto(
    val file: MultipartFile // 음성 파일을 받는다.
)
