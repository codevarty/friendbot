package project.friendbot.domain.gpt.service

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.google.gson.JsonArray
import com.google.gson.JsonObject
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import project.friendbot.domain.gpt.dto.CompletionRequestDto
import project.friendbot.global.config.ChatGPTConfig


@Service
class ChatGPTServiceImpl(val chatGPTConfig: ChatGPTConfig) : ChatGPTService {
    private val log = LoggerFactory.getLogger(this.javaClass)

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
            .uri("/v1/models")
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

        val arr = JsonArray()

        val message = JsonObject()

        message.addProperty("role", "user")
        message.addProperty("content", completionRequestDto.message)

        arr.add(message)

        val requestBody = JsonObject()

        requestBody.addProperty("model", model)
        requestBody.add("messages", arr)


        val response = chatGPTConfig.webClient()
            .post()
            .uri("/v1/chat/completions")
            .headers { headers -> headers.addAll(chatGPTConfig.httpHeaders()) }
            .bodyValue(requestBody.toString())
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
            .uri("/v1/models/$modelName")
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
}