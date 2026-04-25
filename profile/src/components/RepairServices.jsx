import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Cpu, Wifi, HardDrive, Monitor, Battery, ChevronRight, CheckCircle, Package, Bug, Film, Palette } from 'lucide-react';

const services = [
    {
        icon: Package,
        title: "PC Assembly",
        desc: "Full custom PC builds from scratch — component selection, assembly, cable management & BIOS setup.",
        color: "text-violet-400",
        bg: "bg-violet-500/10",
        border: "border-violet-500/20",
    },
    {
        icon: Cpu,
        title: "Hardware Diagnosis",
        desc: "Full diagnostic for desktops & laptops — motherboard, RAM, GPU, CPU fault isolation & repair.",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
    },
    {
        icon: Monitor,
        title: "Screen & Display",
        desc: "Laptop screen replacements, display calibration, GPU/display driver issues & dead pixel fixes.",
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20",
    },
    {
        icon: Wrench,
        title: "Laptop Hardware Fix",
        desc: "Keyboard replacements, hinge repairs, thermal paste, overheating fixes & physical damage repairs.",
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
    },
    {
        icon: HardDrive,
        title: "Storage & Data",
        desc: "SSD/HDD upgrades, OS reinstall, data recovery, partitioning & storage performance tuning.",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
    },
    {
        icon: Wifi,
        title: "Networking",
        desc: "Wi-Fi card replacement, router/switch setup, LAN config, VPN & network troubleshooting.",
        color: "text-indigo-400",
        bg: "bg-indigo-500/10",
        border: "border-indigo-500/20",
    },
    {
        icon: Battery,
        title: "Power Issues",
        desc: "Battery replacements, charging port repairs, power delivery diagnostics & power supply fixes.",
        color: "text-rose-400",
        bg: "bg-rose-500/10",
        border: "border-rose-500/20",
    },
    {
        icon: Bug,
        title: "Software Issues",
        desc: "OS troubleshooting, driver conflicts, malware removal, system optimisation & clean Windows installs.",
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
    },
    {
        icon: Film,
        title: "Video Editing",
        desc: "Professional video editing, cuts, transitions, colour grading & export optimisation for any platform.",
        color: "text-pink-400",
        bg: "bg-pink-500/10",
        border: "border-pink-500/20",
    },
    {
        icon: Palette,
        title: "Photo Editing & Colour Grading",
        desc: "Light Photoshop retouching, colour grading, LUT creation & photo post-processing.",
        color: "text-fuchsia-400",
        bg: "bg-fuchsia-500/10",
        border: "border-fuchsia-500/20",
    },
];

const RepairServices = ({ isComradeMode }) => {
    const [hovered, setHovered] = useState(null);
    const accent = isComradeMode ? 'text-yellow-400' : 'text-indigo-400';

    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                    <Wrench className={accent} size={22} />
                </div>
                <div>
                    <h3 className="text-xl font-bold leading-none">Services & Skills</h3>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">Hardware · Software · Creative</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-bold tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    AVAILABLE
                </div>
            </div>

            {/* Service Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {services.map((svc, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, type: 'spring', stiffness: 80 }}
                        viewport={{ once: true }}
                        onHoverStart={() => setHovered(i)}
                        onHoverEnd={() => setHovered(null)}
                        className={`relative p-4 rounded-2xl border ${svc.bg} ${svc.border} cursor-default group overflow-hidden transition-all duration-300`}
                        style={{
                            boxShadow: hovered === i ? `0 0 28px 0 rgba(99,102,241,0.12)` : 'none',
                        }}
                    >
                        {/* Corner accent glow on hover */}
                        <motion.div
                            className={`absolute top-0 right-0 w-16 h-16 ${svc.bg} rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        />

                        <div className={`w-9 h-9 rounded-xl ${svc.bg} border ${svc.border} flex items-center justify-center mb-3`}>
                            <svc.icon size={18} className={svc.color} />
                        </div>
                        <h4 className="text-sm font-bold text-zinc-100 mb-1">{svc.title}</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed">{svc.desc}</p>

                        <AnimatePresence>
                            {hovered === i && (
                                <motion.div
                                    initial={{ opacity: 0, x: -4 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -4 }}
                                    className={`flex items-center gap-1 mt-3 text-[11px] font-bold ${svc.color}`}
                                >
                                    <CheckCircle size={11} />
                                    Contact me for a quote
                                    <ChevronRight size={11} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Footer note */}
            <p className="text-center text-zinc-600 text-xs mt-5 font-mono">
                Based in Dehiwala, Sri Lanka · Remote support available
            </p>
        </div>
    );
};

export default RepairServices;
