import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Book } from 'lucide-react';
import { GAMES, COMMUNIST_WORKS } from '../config/constants';

const GameSlideshow = ({ isComradeMode }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const data = isComradeMode ? COMMUNIST_WORKS : GAMES;

    useEffect(() => {
        // Preload images for smoother transitions
        data.forEach((item) => {
            const img = new Image();
            img.src = item.image;
        });

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % data.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

}, [isComradeMode, data]);

const currentItem = data[currentIndex];

return (
    <div className="relative w-full h-full min-h-[200px] overflow-hidden rounded-2xl group">
        {/* Slide Images */}
        <AnimatePresence mode="wait">
            <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 z-0"
            >
                <img
                    src={currentItem.image}
                    alt={currentItem.name}
                    className="w-full h-full object-cover"
                />
                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </motion.div>
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-end h-full p-4">
            <div className="flex items-center gap-2 mb-2">
                <div className={`p-2 rounded-lg backdrop-blur-sm border ${isComradeMode ? 'bg-red-500/20 border-red-500/30' : 'bg-indigo-500/20 border-indigo-500/30'}`}>
                    {isComradeMode ? (
                        <Book className={`${isComradeMode ? 'text-yellow-400' : 'text-indigo-400'} w-5 h-5`} />
                    ) : (
                        <Gamepad2 className="text-indigo-400 w-5 h-5" />
                    )}
                </div>
                <span className={`text-xs font-bold tracking-widest ${isComradeMode ? 'text-yellow-400' : 'text-indigo-300'} uppercase`}>
                    {isComradeMode ? "Required Theory" : "Current Obsessions"}
                </span>
            </div>

            <AnimatePresence mode="wait">
                <motion.h3
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-black text-white leading-tight drop-shadow-lg"
                >
                    >
                    {currentItem.name}
                    {isComradeMode && <span className="block text-sm font-normal text-zinc-300 mt-1">{currentItem.author}</span>}
                </motion.h3>
            </AnimatePresence>

            {/* Progress Indicators */}
            <div className="flex gap-1 mt-3">
                {data.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex
                            ? (isComradeMode ? 'w-6 bg-yellow-500' : 'w-6 bg-indigo-500')
                            : 'w-1 bg-white/20'}`}
                    />
                ))}
            </div>
        </div>
    </div>
);
};

export default GameSlideshow;
