import { memo } from "react";

const AvatarDisplay = memo(({ user, className }) => {
    const sizeClass = className ?? "w-12 h-12";

    if (user?.avatar) {
        return (
            <img
                src={user.avatar}
                alt={`${user.name || "User"}'s avatar`}
                className={`rounded-full object-cover ${sizeClass}`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextElementSibling.style.display = "flex";
                }}
            />
        );
    }

    const initial = (user?.name || "A").charAt(0).toUpperCase();
    const colors = [
        "bg-red-500",
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-indigo-500",
    ];
    const colorIndex = initial.charCodeAt(0) % colors.length;

    return (
        <div
            className={`rounded-full ${colors[colorIndex]} ${sizeClass} flex items-center justify-center text-white font-semibold`}>
            {initial}
        </div>
    );
});

export default AvatarDisplay;