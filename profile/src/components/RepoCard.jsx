import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Star, GitFork, ArrowUpRight } from 'lucide-react';

const RepoCard = ({ repo }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        x.set(clientX - centerX);
        y.set(clientY - centerY);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-100, 100], [5, -5]); // Inverted for natural tilt
    const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

    return (
        <motion.a
            ref={ref}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative h-full flex flex-col justify-between p-5 rounded-xl bg-zinc-900/40 border border-white/5 group perspective-1000 overflow-hidden hover:bg-zinc-800/60 transition-colors"
        >
            {/* Holographic Shine */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            600px circle at ${mouseX}px ${mouseY}px,
                            rgba(255, 255, 255, 0.06),
                            transparent 40%
                        )
                    `,
                }}
            />
            {/* Content Lift */}
            <div style={{ transform: "translateZ(20px)" }} className="relative z-20 pointer-events-none">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-zinc-100 truncate group-hover:text-indigo-400 transition-colors tracking-tight">
                        {repo.name}
                    </h4>
                    <div className="p-1.5 rounded-full bg-white/5 text-zinc-400 group-hover:text-white group-hover:bg-indigo-500 transition-all">
                        <ArrowUpRight size={14} />
                    </div>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2 mb-4 h-8 leading-relaxed font-medium">
                    {repo.description || "No description available"}
                </p>

                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                        <span className="group-hover:text-zinc-300 transition-colors">{repo.language || "Code"}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 group-hover:text-yellow-400 transition-colors">
                            <Star size={12} /> {repo.stargazers_count}
                        </div>
                        <div className="flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                            <GitFork size={12} /> {repo.forks_count}
                        </div>
                    </div>
                </div>
            </div>
        </motion.a>
    );
};

export default RepoCard;
