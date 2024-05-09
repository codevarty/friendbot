package project.friendbot.domain.user.entity

import jakarta.persistence.*
import java.time.LocalDateTime


@Entity
@Table(name = "user")
class User(
    @Column(length = 50, unique = true, nullable = false)
    val email: String,
    name: String,
    password: String,
    birthdate: LocalDateTime,
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null

    @Column(length = 20, nullable = false)
    var name: String = name
        protected set

    var refreshToken: String? = null
        protected set

    @Column(nullable = false)
    var password: String = password
        protected set

    @Column(nullable = false)
    var birthdate: LocalDateTime = birthdate
        protected set

    val createdAt: LocalDateTime = LocalDateTime.now()

    fun updateToken(token: String) {
        this.refreshToken = token
    }

    fun updateUserInfo(name: String, birthdate: LocalDateTime) {
        this.name = name
        this.birthdate = birthdate
    }

    fun updatePassword(password: String) {
        this.password = password
    }
}
