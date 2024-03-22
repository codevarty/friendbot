package project.friendbot

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class FriendBotApplication

fun main(args: Array<String>) {
    runApplication<FriendBotApplication>(*args)
}
