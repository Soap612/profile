import React from 'react';
import { motion } from 'framer-motion';
import { Disc, Music2 } from 'lucide-react';

const SpotifyVisualizer = ({ data }) => {
    if (!data) return null;

    const { song, artist, album_art_url, track_id } = data;

    // Simulate audio bars animation
    const bars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#1DB954]/20 to-black p-4 border border-[#1DB954]/30 group">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />

            <div className="relative z-10 flex items-center gap-4">
                {/* Spinning Vinyl */}
                <motion.div
                    className="relative w-16 h-16 shrink-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute inset-0 rounded-full border-2 border-[#1DB954]/50 shadow-[0_0_15px_rgba(29,185,84,0.3)]" />
                    <img
                        src={album_art_url}
                        alt="Album Art"
                        className="w-full h-full rounded-full object-cover p-1"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 bg-zinc-900 rounded-full border border-zinc-700" />
                    </div>
                </motion.div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                        <Music2 size={10} className="text-[#1DB954]" />
                        <span className="text-[10px] font-bold text-[#1DB954] tracking-widest uppercase">Now Playing</span>
                    </div>
                    <h3 className="text-white font-bold truncate leading-tight mb-0.5">{song}</h3>
                    <p className="text-zinc-400 text-xs truncate">{artist}</p>
                </div>
            </div>

            {/* Audio Waveform */}
            <div className="relative z-10 mt-4 flex items-end justify-between h-8 gap-0.5 px-2 opacity-80">
                {bars.map((i) => (
                    <motion.div
                        key={i}
                        className="w-1 bg-[#1DB954] rounded-t-full shadow-[0_0_5px_rgba(29,185,84,0.5)]"
                        animate={{
                            height: [
                                `${Math.random() * 40 + 10}%`,
                                `${Math.random() * 90 + 10}%`,
                                `${Math.random() * 40 + 10}%`
                            ]
                        }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut",
                            delay: i * 0.05
                        }}
                    />
                ))}
            </div>

            {/* Background Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#1DB954]/20 blur-[50px] pointer-events-none" />
        </div>
    );
};

export default SpotifyVisualizer;
