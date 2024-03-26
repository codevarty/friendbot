package project.friendbot.domain.exception

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

// Restful 웹 서비스에 대한 모든 예외를 핸들링하기 위한 어노테이션
@RestControllerAdvice
class GlobalExceptionHandler {

    // ErrorResponse를 생성하여 반환
    @ExceptionHandler(CustomException::class)
    fun handleCustomException(e: CustomException): ResponseEntity<ErrorResponse> {
        val errorResponse = ErrorResponse(
            e.exceptionCode.status.value(),
            e.exceptionCode.message,
        )
        return ResponseEntity(errorResponse, e.exceptionCode.status)
    }
}