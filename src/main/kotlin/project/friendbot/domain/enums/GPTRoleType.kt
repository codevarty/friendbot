package project.friendbot.domain.enums

enum class GPTRoleType(
    val role: String
) {
    SPEAKER("speaker"),
    COUNSELOR("counselor"),
    TEACHER("teacher"),
    FRIEND("friend")
}