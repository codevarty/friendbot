package project.friendbot.domain.exception

import org.springframework.http.HttpStatus

enum class CustomExceptionCode(
    val status: HttpStatus,
    val message: String,
) {
    BAD_FORMAT_FILE(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일입니다."),
    ERROR_CHANGE_TO_TEXT(HttpStatus.INTERNAL_SERVER_ERROR, "음성 파일을 텍스트 변환해 실패했습니다.")
}