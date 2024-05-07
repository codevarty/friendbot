package project.friendbot.domain.user.controller

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import project.friendbot.domain.user.dto.SignUpUserRequest
import project.friendbot.domain.user.dto.UserResponse
import project.friendbot.domain.user.service.UserService

@RestController
class UserController(val userService: UserService) {

    @PostMapping("/signup")
    fun signup(@RequestBody signUpUserRequest: SignUpUserRequest): UserResponse {
        return userService.join(signUpUserRequest)
    }
}