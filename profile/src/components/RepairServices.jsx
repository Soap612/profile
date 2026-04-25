import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Cpu, Wifi, HardDrive, Monitor, Battery, ChevronRight, CheckCircle } from 'lucide-react';

const services = [
    {
        icon: Cpu,
        title: "Hardware Repair",
        desc: "Motherboard diagnostics, component replacement, soldering & circuit-level fixes.",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
    },
    {
        icon: Monitor,
        title: "Screen & Display",
        desc: "Laptop screen replacements, display calibration, GPU/display driver issues.",
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20",
    },
    {
        icon: HardDrive,
        title: "Storage & Data",
        desc: "SSD/HDD upgrades, OS reinstall, data recovery, and storage optimisation.",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
    },
    {
        icon: Wifi,
        title: "Networking",
        desc: "Wi-Fi card replacement, router setup, LAN configuration & troubleshooting.",
        color: "text-indigo-400",
        bg: "bg-indigo-500/10",
        border: "border-indigo-500/20",
    },
    {
        icon: Battery,
        title: "Power Issues",
        desc: "Battery replacements, charging port repairs, power delivery diagnostics.",
        color: "text-rose-400",
        bg: "bg-rose-500/10",
        border: "border-rose-500/20",
    },
    {
        icon: Wrench,
        title: "General Servicing",
        desc: "Thermal paste replacement, deep cleaning, overheating fixes & performance tuning.",
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
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
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full" />
                </div>
                <div>
                    <h3 className="text-xl font-bold leading-none">Tech Repair Services</h3>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">Laptops · Desktops · Peripherals</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-bold tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    AVAILABLE
                </div>
            </div>

            {/* Service Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {services.map((svc, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07, type: 'spring', stiffness: 80 }}
                        viewport={{ once: true }}
                        onHoverStart={() => setHovered(i)}
                        onHoverEnd={() => setHovered(null)}
                        className={`relative p-4 rounded-2xl border ${svc.bg} ${svc.border} cursor-default group overflow-hidden transition-all duration-300`}
                        style={{
                            boxShadow: hovered === i ? `0 0 24px 0 rgba(99,102,241,0.15)` : 'none',
                        }}
                    >
                        {/* Animated corner accent */}
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
                                    Contact me to get a quote
                                    <ChevronRight size={11} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Footer note */}
            <p className="text-center text-zinc-600 text-xs mt-5 font-mono">
                Based in Ratnapura, Sri Lanka · Remote diagnostics available
            </p>
        </div>
    );
};

export default RepairServices;
