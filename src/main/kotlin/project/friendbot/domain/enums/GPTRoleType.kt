package project.friendbot.domain.enums

enum class GPTRoleType(
    val role: String
) {
    SPEAKER("speaker"),
    TEACHER("teacher"),
    COUNSELOR("counselor"),
    FRIEND("friend")
}