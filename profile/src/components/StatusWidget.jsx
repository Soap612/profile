import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Disc, Moon } from 'lucide-react';

const StatusWidget = ({ lanyardData }) => {
    if (!lanyardData) return (
        <div className="flex h-full w-full items-center justify-center gap-2 text-zinc-500">
            <div className="h-3 w-3 rounded-full bg-zinc-700 animate-pulse"></div>
            <span className="text-sm font-medium font-mono">INITIALIZING...</span>
        </div>
    );

    const { discord_status, activities, spotify, listening_to_spotify } = lanyardData;

    const statusColors = {
        online: "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]",
        idle: "bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.6)]",
        dnd: "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]",
        offline: "bg-zinc-500"
    };

    const statusText = {
        online: "ONLINE",
        idle: "IDLE",
        dnd: "DND",
        offline: "OFFLINE"
    };

    const gameActivity = activities?.find(act => act.type === 0);

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className={`h-3 w-3 rounded-full ${statusColors[discord_status] || statusColors.offline}`} />
                        <div className={`absolute inset-0 h-3 w-3 rounded-full ${statusColors[discord_status] || statusColors.offline} animate-ping opacity-75`} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold leading-none tracking-wide text-sm">STATUS</h3>
                        <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">
                            {statusText[discord_status] || "OFFLINE"}
                        </span>
                    </div>
                </div>
                <Gamepad2 className="text-zinc-600 w-5 h-5" />
            </div>

            <div className="flex-1 flex flex-col justify-center gap-3">
                <AnimatePresence mode="wait">
                    {listening_to_spotify ? (
                        <motion.div
                            key="spotify"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-4"
                        >
                            <div className="relative shrink-0 group">
                                {/* Vinyl Record Container */}
                                <motion.div
                                    className="w-20 h-20 rounded-full relative overflow-hidden shadow-xl border-2 border-zinc-800"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                >
                                    <img
                                        src={spotify.album_art_url}
                                        alt="Album Art"
                                        className="w-full h-full object-cover opacity-80"
                                    />
                                    {/* Vinyl Center Hole & Details */}
                                    <div className="absolute inset-0 rounded-full border-4 border-black/20 pointer-events-none"></div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-zinc-900 rounded-full border-2 border-zinc-700 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-black rounded-full"></div>
                                    </div>
                                </motion.div>

                                <div className="absolute -bottom-1 -right-1 bg-[#1DB954] text-black p-1.5 rounded-full shadow-lg z-10">
                                    <Disc size={14} />
                                </div>
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 text-[#1DB954] text-[10px] font-bold uppercase tracking-wider mb-1">
                                    LISTENING
                                </div>
                                <h4 className="text-white font-bold truncate leading-tight text-sm" title={spotify.song}>
                                    {spotify.song}
                                </h4>
                                <p className="text-zinc-400 text-xs truncate" title={spotify.artist}>
                                    {spotify.artist}
                                </p>
                            </div>
                        </motion.div>
                    ) : gameActivity ? (
                        <motion.div
                            key="game"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-4"
                        >
                            <div className="w-16 h-16 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                                <Gamepad2 className="text-indigo-400 w-8 h-8" />
                            </div>
                            <div>
                                <div className="text-indigo-400 text-[10px] font-bold uppercase tracking-wider mb-1">PLAYING</div>
                                <h4 className="text-white font-bold text-sm">{gameActivity.name}</h4>
                                <p className="text-zinc-400 text-xs">
                                    {gameActivity.state || gameActivity.details || "In Game"}
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-4 opacity-50"
                        >
                            <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center">
                                <Moon className="text-zinc-400 w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="text-zinc-300 font-bold text-sm">Chilling</h4>
                                <p className="text-zinc-500 text-xs">No active status</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default StatusWidget;
