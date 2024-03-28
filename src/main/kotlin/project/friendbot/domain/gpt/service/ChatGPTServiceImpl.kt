package project.friendbot.domain.gpt.service

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.google.gson.Gson
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.FileSystemResource
import org.springframework.http.MediaType
import org.springframework.stereotype.Service
import org.springframework.util.LinkedMultiValueMap
import org.springframework.web.reactive.function.BodyInserters
import project.friendbot.domain.gpt.dto.ChatMessageRequest
import project.friendbot.domain.gpt.dto.CompletionRequestDto
import project.friendbot.domain.gpt.dto.TranscriptionRequestDto
import project.friendbot.global.config.ChatGPTConfig
import java.io.File
import java.nio.file.Files


@Service
class ChatGPTServiceImpl(val chatGPTConfig: ChatGPTConfig, val gson: Gson) : ChatGPTService {
    private val log = LoggerFactory.getLogger(this.javaClass)

    @Value("\${openapi.audio-model}")
    lateinit var audioModel: String

    @Value("\${openapi.model}")
    lateinit var model: String


    /**
     * 사용 가능한 모델 리스트를 조회하는 비지니스 설계
     */
    override fun modelList(): List<Map<String, Any>> {
        log.debug("[+] 모델 리스트 조회합니다.")

        // webClient 통신 부분 설정
        val result = chatGPTConfig.webClient()
            .get()
            .uri("/models")
            .headers { headers -> headers.addAll(chatGPTConfig.httpHeaders()) }
            .retrieve()
            .bodyToMono(String::class.java)

        val resultList: List<Map<String, Any>> = try {
            val mapper = ObjectMapper()
            val data: Map<String, Any> = mapper.readValue(result.block()!!) // null 일 경우 Exception 발생

            @Suppress("UNCHECKED_CAST")
            data["data"] as List<Map<String, Any>>

        } catch (e: Exception) { // Exception 처리
            log.error("Error processing the response: ${e.message}")
            throw RuntimeException(e)
        }
        return resultList
    }


    /**
     * ChatGTP 프롬프트 검색
     *
     * @param completionRequestDto
     * @return
     */
    override fun prompt(completionRequestDto: CompletionRequestDto): Map<String, Any> {
        log.debug("[+] 프롬프트를 수행합니다.")

        val mapper = ObjectMapper()

        val arr = arrayListOf<CompletionRequestDto>()

        val system = CompletionRequestDto(
            role = "system", // system Instruction
            content = "You are an expert professor and explain questions accurately and comprehensibly."
        )
        arr.add(system)
        arr.add(completionRequestDto)

        val requestBody = ChatMessageRequest(
            model = model,
            messages = arr,
            temperature = 1,
        )

        val json = gson.toJson(requestBody)

        log.info("prompt={}", json)

        val response = chatGPTConfig.webClient()
            .post()
            .uri("/chat/completions")
            .headers { headers -> headers.addAll(chatGPTConfig.httpHeaders()) }
            .bodyValue(json)
            .retrieve()
            .bodyToMono(String::class.java)

        val result: Map<String, Any> = try {
            mapper.readValue(response.block()!!)
        } catch (e: Exception) {
            throw RuntimeException(e)
        }

        return result
    }

    /**
     * 모델이 유효한지 확인하는 비지니스 로직
     */
    override fun isValidModel(modelName: String): Map<String, Any> {

        log.debug("[+] 모델이 유효한지 조회합니다. 모델 : {}", modelName)

        val response = chatGPTConfig.webClient()
            .get()
            .uri("/models/$modelName")
            .headers { headers -> headers.addAll(chatGPTConfig.httpHeaders()) }
            .retrieve()
            .bodyToMono(String::class.java)

        val result: Map<String, Any> = try { // try / catch 문은 표현식이다.
            val mapper = ObjectMapper()
            mapper.readValue(response.block()!!)


        } catch (e: Exception) {
            log.error("Error processing the response: ${e.message}")
            throw RuntimeException(e)
        }

        return result

    }

    /**
     * 음성 파일을 텍스트로 변환하는 메서드
     */
    override fun speechToText(transcriptionRequestDto: TranscriptionRequestDto): String {

        // 임시 파일을 생성한다.
        val tempFile = Files.createTempFile("upload-", transcriptionRequestDto.file.originalFilename).toFile().apply {
            transcriptionRequestDto.file.transferTo(this)
        }

        // form data 를 만든다.
        val formData = LinkedMultiValueMap<String, Any>().apply {
            add("model", audioModel)
            add("file", fileResource(tempFile, transcriptionRequestDto.file.originalFilename ?: "file"))
        }


        val response = chatGPTConfig.webClient()
            .post()
            .uri("/audio/transcriptions")
            .headers { headers -> headers.addAll(chatGPTConfig.httpHeaders()) }
            .contentType(MediaType.MULTIPART_FORM_DATA) // 파일 형식을 받는다.
            .body(BodyInserters.fromMultipartData(formData))
            .retrieve()
            .bodyToMono(String::class.java)

        val result: String = try {
            response.block().toString()
        } catch (e: Exception) {
            log.error("Error processing the response: ${e.message}")
            throw RuntimeException(e)
        }

        return result
    }

    // 파일 재정의
    private fun fileResource(file: File, originalFilename: String): FileSystemResource =
        object : FileSystemResource(file) {
            override fun getFilename(): String = originalFilename
        }
}