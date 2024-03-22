package project.friendbot.domain.gpt.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import project.friendbot.domain.gpt.dto.CompletionRequestDto
import project.friendbot.domain.gpt.service.ChatGPTService

// 주 생성자로 property를 정의
@RestController
@RequestMapping("/api/chatGpt")
class ChatGPTController(val chatGPTService: ChatGPTService) {

    /**
     * [API] ChatGPT 모델 리스트 조회
     */
    @GetMapping("/modelList")
    fun selectModelList(): ResponseEntity<List<Map<String, Any>>> {
        val result = chatGPTService.modelList()
        return ResponseEntity(result, HttpStatus.OK)
    }

    /**
     * [API] ChatGPT 유요한 모델인지 조회
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
     * [API] ChatGPT 모델 리스트 조회
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
}