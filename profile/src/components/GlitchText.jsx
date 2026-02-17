import React from 'react';
import { motion } from 'framer-motion';

const GlitchText = ({ text, className = "" }) => {
    return (
        <div className={`relative inline-block group ${className}`}>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                className="relative z-10 block"
            >
                {text}
            </motion.span>

            {/* Glitch Layers */}
            <motion.span
                className="absolute top-0 left-0 -z-10 w-full h-full text-indigo-500 opacity-70 mix-blend-screen"
                initial={{ x: 0 }}
                animate={{
                    x: [-2, 2, -1, 0],
                    clipPath: [
                        'inset(10% 0 80% 0)',
                        'inset(40% 0 10% 0)',
                        'inset(80% 0 5% 0)',
                        'inset(10% 0 60% 0)'
                    ]
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2,
                    repeatDelay: 4,
                    ease: "linear",
                    times: [0, 0.1, 0.2, 0.3]
                }}
            >
                {text}
            </motion.span>

            <motion.span
                className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-70 mix-blend-screen"
                initial={{ x: 0 }}
                animate={{
                    x: [2, -2, 1, 0],
                    clipPath: [
                        'inset(80% 0 10% 0)',
                        'inset(10% 0 40% 0)',
                        'inset(40% 0 20% 0)',
                        'inset(5% 0 80% 0)'
                    ]
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2,
                    repeatDelay: 3, // slightly offset
                    ease: "linear",
                    times: [0, 0.1, 0.2, 0.3]
                }}
            >
                {text}
            </motion.span>
        </div>
    );
};

export default GlitchText;
