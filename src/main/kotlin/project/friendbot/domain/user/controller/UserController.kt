package project.friendbot.domain.user.controller

import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import project.friendbot.domain.user.dto.SignUpUserRequest
import project.friendbot.domain.user.dto.UpdateUserInfoRequest
import project.friendbot.domain.user.dto.UserResponse
import project.friendbot.domain.user.service.UserService

@RestController("/user")
class UserController(val userService: UserService) {

    @PostMapping("/signup")
    fun signup(@RequestBody signUpUserRequest: SignUpUserRequest): Long {
        return userService.createUser(signUpUserRequest)
    }

    @PatchMapping("/update/info")
    fun updateUserInfo(
        @RequestBody email: String,
        @RequestBody updateUserInfoRequest: UpdateUserInfoRequest
    ): UserResponse {
        return userService.updateUserInfo(email, updateUserInfoRequest)
    }

    @DeleteMapping("/delete")
    fun deleteUser(@RequestBody id: Long) = userService.deleteUser(id)
}