package project.friendbot.global.controller

import org.springframework.boot.web.servlet.error.ErrorController
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
class CustomErrorController : ErrorController {
    @RequestMapping("/error")
    fun handleError(): String {
        // You can customize the error message and page here
        return "error/error-page"
    }
}