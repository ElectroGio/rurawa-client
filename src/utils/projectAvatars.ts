// Avatares por defecto para proyectos
export const projectAvatars = [
    { id: 'yellow', emoji: '💛', color: 'bg-yellow-400' },
    { id: 'blue', emoji: '💙', color: 'bg-blue-400' },
    { id: 'purple', emoji: '💜', color: 'bg-purple-400' },
    { id: 'green', emoji: '💚', color: 'bg-green-400' },
    { id: 'pink', emoji: '💗', color: 'bg-pink-400' },
    { id: 'orange', emoji: '🧡', color: 'bg-orange-400' },
    { id: 'red', emoji: '❤️', color: 'bg-red-400' },
    { id: 'teal', emoji: '🩵', color: 'bg-teal-400' },
    { id: 'indigo', emoji: '💙', color: 'bg-indigo-400' },
    { id: 'lime', emoji: '💚', color: 'bg-lime-400' },
]

export const getProjectAvatar = (avatarId: string | undefined) => {
    return projectAvatars.find(a => a.id === avatarId) || projectAvatars[0]
}
