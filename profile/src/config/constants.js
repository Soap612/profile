import {
    Github,
    Instagram,
    Facebook,
    Linkedin,
    MessageCircle,
    Send,
    MessageSquare,
    Code2,
    Layout,
    Globe,
    Server,
    Zap,
    Database,
    Cloud,
    Box
} from 'lucide-react';

export const DISCORD_ID = "934845738322636880"; // Soap's ID
export const GITHUB_USERNAME = "Soap612";

export const BUSINESS_HOURS = {
    start: 8, // 8 AM
    end: 22,   // 10 PM
    timezone: "Asia/Colombo" // User is in Sri Lanka
};

export const SOCIAL_LINKS = [
    { icon: Github, href: "https://github.com/Soap612", label: "GitHub", color: "hover:text-white" },
    { icon: Instagram, href: "https://www.instagram.com/methmikamanipura/", label: "Instagram", color: "hover:text-pink-500" },
    { icon: Facebook, href: "https://web.facebook.com/profile.php?id=100089018156380", label: "Facebook", color: "hover:text-blue-500" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/methmika-manipura-77ab9028b", label: "LinkedIn", color: "hover:text-blue-400" },
];

export const MESSAGING_APPS = [
    { icon: MessageCircle, href: "https://wa.me/94767067892", label: "WhatsApp", color: "bg-green-500/10 text-green-500 hover:bg-green-500/20" },
    { icon: Send, href: "https://t.me/soap612", label: "Telegram", color: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20" },
    { icon: MessageSquare, href: "https://discord.com/users/934845738322636880", label: "Discord", color: "bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20" },
];

export const SKILLS = [
    { name: "JavaScript", icon: Code2, color: "text-yellow-400" },
    { name: "TypeScript", icon: Code2, color: "text-blue-400" },
    { name: "React", icon: Layout, color: "text-cyan-400" },
    { name: "Next.js", icon: Globe, color: "text-white" },
    { name: "Node.js", icon: Server, color: "text-green-500" },
    { name: "Rust", icon: Zap, color: "text-orange-500" },
    { name: "GraphQL", icon: Database, color: "text-pink-400" },
    { name: "AWS", icon: Cloud, color: "text-yellow-500" },
    { name: "Docker", icon: Box, color: "text-blue-500" }
];

export const GAMES = [
    { name: "The Witcher 3", id: "292030", image: "https://steamcdn-a.akamaihd.net/steam/apps/292030/capsule_616x353.jpg" },
    { name: "Red Dead Redemption 2", id: "1174180", image: "https://steamcdn-a.akamaihd.net/steam/apps/1174180/capsule_616x353.jpg" },
    { name: "Assassin's Creed: Black Flag", id: "242050", image: "https://steamcdn-a.akamaihd.net/steam/apps/242050/capsule_616x353.jpg" },
    { name: "Assassin's Creed: Unity", id: "289650", image: "https://steamcdn-a.akamaihd.net/steam/apps/289650/capsule_616x353.jpg" },
    { name: "Assassin's Creed II", id: "33230", image: "https://steamcdn-a.akamaihd.net/steam/apps/33230/capsule_616x353.jpg" },
    { name: "Assassin's Creed III", id: "911400", image: "https://steamcdn-a.akamaihd.net/steam/apps/911400/capsule_616x353.jpg" },
    { name: "Forza Horizon 5", id: "1551360", image: "https://steamcdn-a.akamaihd.net/steam/apps/1551360/capsule_616x353.jpg" },
    { name: "Minecraft", id: "minecraft", image: "https://image.api.playstation.com/vulcan/img/rnd/202010/2618/w48z6bzefZPrRcJHc7L8SO66.png" }
];

export const COMMUNIST_WORKS = [
    { name: "The Communist Manifesto", id: "manifesto", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Communist-manifesto.png/618px-Communist-manifesto.png", author: "Karl Marx & Friedrich Engels" },
    { name: "Das Kapital", id: "kapital", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Das_Kapital.jpg/640px-Das_Kapital.jpg", author: "Karl Marx" },
    { name: "State and Revolution", id: "staterev", image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/The_State_and_Revolution.jpg", author: "Vladimir Lenin" },
    { name: "Reform or Revolution", id: "reformrev", image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Social_Reform_or_Revolution.jpg", author: "Rosa Luxemburg" },
    { name: "What Is to Be Done?", id: "whatis", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/What_Is_To_Be_Done.jpg/640px-What_Is_To_Be_Done.jpg", author: "Vladimir Lenin" }
];
