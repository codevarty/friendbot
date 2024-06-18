package project.friendbot.global.jwt.user

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import project.friendbot.domain.user.entity.User

class CustomUserDetails(private val user: User) : UserDetails {
    // null을 반환하도록 한다.
    override fun getAuthorities(): MutableCollection<out GrantedAuthority>? {
        return null
    }

    fun getEmail(): String = user.email

    override fun getPassword(): String = user.password

    override fun getUsername(): String = user.name

    override fun isAccountNonExpired(): Boolean = true

    override fun isAccountNonLocked(): Boolean = true

    override fun isCredentialsNonExpired(): Boolean = true

    override fun isEnabled(): Boolean = true
}
