package project.friendbot.domain.exception

import java.time.LocalDateTime
import java.time.LocalDateTime.now

data class ErrorResponse(
    // 에러 발생 시간
    val timestamp: LocalDateTime,
    // 에러 코드
    val status: Int,
    // 에러에 대한 설명
    val error: String,
    // 에러가 발생한 이유
    val message: Map<String, String>?,
) {
    constructor(status: Int, error: String) : this(now(), status, error, emptyMap())
    constructor(status: Int, error: String, message: Map<String, String>?) : this(now(), status, error, message)
}
