package project.friendbot.domain.user.controller

import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import project.friendbot.domain.user.dto.SignUpUserRequest
import project.friendbot.domain.user.dto.UpdateUserInfoRequest
import project.friendbot.domain.user.dto.UserResponse
import project.friendbot.domain.user.service.UserService
import project.friendbot.global.jwt.user.CustomUserDetails

@RestController
@RequestMapping("/api/user")
class UserController(val userService: UserService) {

    @GetMapping("/username")
    fun getUsername(@AuthenticationPrincipal userDetails: CustomUserDetails): String {
        return userDetails.username
    }

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