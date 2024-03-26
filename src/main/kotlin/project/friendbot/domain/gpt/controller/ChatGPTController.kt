package project.friendbot.domain.gpt.controller

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import project.friendbot.domain.exception.CustomException
import project.friendbot.domain.exception.CustomExceptionCode
import project.friendbot.domain.exception.ErrorResponse
import project.friendbot.domain.gpt.dto.CompletionRequestDto
import project.friendbot.domain.gpt.dto.TranscriptionRequestDto
import project.friendbot.domain.gpt.service.ChatGPTService
import project.friendbot.global.controller.CustomErrorController
import io.netty.handler.codec.http.HttpResponse as HttpResponse1

// 주 생성자로 property를 정의
@RestController
@RequestMapping("/api/chatGpt")
class ChatGPTController(val chatGPTService: ChatGPTService) {

    /**
     * ChatGPT 모델 리스트 조회
     */
    @GetMapping("/modelList")
    fun selectModelList(): ResponseEntity<List<Map<String, Any>>> {
        val result = chatGPTService.modelList()
        return ResponseEntity(result, HttpStatus.OK)
    }

    /**
     *  ChatGPT 유요한 모델인지 조회
     *
     * @param modelName
     * @return
     */
    @GetMapping("model")
    fun isValidModel(@RequestParam(name = "modelName") modelName: String): ResponseEntity<Map<String, Any>> {
        val result = chatGPTService.isValidModel(modelName)
        return ResponseEntity(result, HttpStatus.OK)
    }

    /**
     *  ChatGPT 모델 리스트 조회
     */
    @PostMapping("/prompt")
    fun selectPrompt(@RequestBody completionRequestDto: CompletionRequestDto): ResponseEntity<Map<String, Any>> {
        // 잘못된 요청시 bad request 문을 보낸다.
        if (completionRequestDto.message.trim() == "") {
            return ResponseEntity(null, HttpStatus.BAD_REQUEST)
        }
        val result = chatGPTService.prompt(completionRequestDto)
        return ResponseEntity(result, HttpStatus.OK)
    }

    /**
     *  음성을 텍스트로 변환
     */
    @PostMapping(value = ["/transcription"], consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun uploadSpeechFile(@ModelAttribute transcriptionRequestDto: TranscriptionRequestDto): String {
        if (transcriptionRequestDto.file.isEmpty) {
            throw CustomException(CustomExceptionCode.BAD_FORMAT_FILE)
        }
        return chatGPTService.speechToText(transcriptionRequestDto)
    }

    /**
     * 음성을 텍스트로 변환 후 GPT 응답을 보낸다.
     */
    @PostMapping(value = ["/question"], consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun speechToTextResponse(@ModelAttribute transcriptionRequestDto: TranscriptionRequestDto): ResponseEntity<Map<String, Any>> {
        // 파일 데이터가 올바르게 들어가지 않았을 때의 오류
        if (transcriptionRequestDto.file.isEmpty) {
            throw CustomException(CustomExceptionCode.BAD_FORMAT_FILE)
        }

        val textData = chatGPTService.speechToText(transcriptionRequestDto)

        // 음성 파일을 텍스트 파일로 변경할 때 오류
        if (textData.isEmpty() || textData.isBlank()) {
            throw CustomException(CustomExceptionCode.ERROR_CHANGE_TO_TEXT)
        }

        val response = chatGPTService.prompt(CompletionRequestDto(textData))

        return ResponseEntity(response, HttpStatus.OK)
    }
}