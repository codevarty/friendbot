package project.friendbot.domain.user.repository

import org.springframework.data.jpa.repository.JpaRepository
import project.friendbot.domain.user.entity.User
import java.util.*

interface UserRepository : JpaRepository<User, Long> {
    override fun findAll(): List<User>
    override fun findById(id: Long): Optional<User>
    fun findByEmail(email: String): Optional<User>
}