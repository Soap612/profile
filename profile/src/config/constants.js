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
