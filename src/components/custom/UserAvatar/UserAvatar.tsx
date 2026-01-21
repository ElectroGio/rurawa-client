import React from 'react'
import Avatar from '@/components/ui/Avatar'

interface UserAvatarProps {
    firstName?: string
    lastName?: string
    email?: string
    profileImage?: string
    size?: number
    className?: string
}

/**
 * UserAvatar component that displays user profile image or initials as fallback
 * Priority: profileImage > initials from firstName/lastName > first letter of email > 'U'
 */
const UserAvatar: React.FC<UserAvatarProps> = ({
    firstName,
    lastName,
    email,
    profileImage,
    size = 40,
    className = '',
}) => {
    const getInitials = () => {
        if (firstName && lastName) {
            return `${firstName[0]}${lastName[0]}`.toUpperCase()
        }
        if (firstName) {
            return firstName.substring(0, 2).toUpperCase()
        }
        if (email) {
            return email[0].toUpperCase()
        }
        return 'U'
    }

    const getBackgroundColor = () => {
        // Generate a consistent color based on the user's name or email
        const text = firstName || email || 'User'
        const hash = text.split('').reduce((acc, char) => {
            return char.charCodeAt(0) + ((acc << 5) - acc)
        }, 0)
        const colors = [
            'bg-blue-500',
            'bg-green-500',
            'bg-yellow-500',
            'bg-red-500',
            'bg-purple-500',
            'bg-pink-500',
            'bg-indigo-500',
            'bg-teal-500',
        ]
        return colors[Math.abs(hash) % colors.length]
    }

    if (profileImage && profileImage.startsWith('http')) {
        return (
            <Avatar
                size={size}
                shape="circle"
                src={profileImage}
                className={className}
            />
        )
    }

    return (
        <div
            className={`flex items-center justify-center rounded-full text-white font-semibold ${getBackgroundColor()} ${className}`}
            style={{ width: size, height: size, fontSize: size * 0.4 }}
        >
            {getInitials()}
        </div>
    )
}

export default UserAvatar
