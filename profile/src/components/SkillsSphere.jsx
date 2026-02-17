import React, { useEffect, useState, useRef, useMemo } from 'react';
import { SKILLS } from '../config/constants';

const SkillsSphere = () => {
    const containerRef = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const lastMouse = useRef({ x: 0, y: 0 });
    const momentum = useRef({ x: 0.1, y: 0.1 }); // Initial slow rotation

    // Fibonacci Sphere Distribution
    const items = useMemo(() => {
        const phi = Math.PI * (3 - Math.sqrt(5));
        const n = SKILLS.length;
        return SKILLS.map((skill, i) => {
            const y = 1 - (i / (n - 1)) * 2;
            const radius = Math.sqrt(1 - y * y);
            const theta = phi * i;
            return {
                ...skill,
                x: Math.cos(theta) * radius,
                y: y,
                z: Math.sin(theta) * radius
            };
        });
    }, []);

    useEffect(() => {
        let animationFrame;

        const animate = () => {
            setRotation(prev => ({
                x: prev.x + momentum.current.x * 0.05,
                y: prev.y + momentum.current.y * 0.05
            }));

            // Friction
            if (!isDragging.current) {
                // Keep a minimum auto-rotation
                momentum.current.x = momentum.current.x * 0.98 + 0.002;
                momentum.current.y = momentum.current.y * 0.98 + 0.002;
            }

            animationFrame = requestAnimationFrame(animate);
        };
        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

        // Mouse influence on momentum
        momentum.current = { x: y * 2, y: -x * 2 };
    };

    return (
        <div
            ref={containerRef}
            className="w-full h-[300px] relative flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseMove={handleMouseMove}
        >
            <div className="relative w-full h-full preserve-3d">
                {items.map((item, i) => {
                    // Apply rotation
                    // Rotate around X axis
                    let y1 = item.y * Math.cos(rotation.x) - item.z * Math.sin(rotation.x);
                    let z1 = item.z * Math.cos(rotation.x) + item.y * Math.sin(rotation.x);

                    // Rotate around Y axis
                    let x2 = item.x * Math.cos(rotation.y) - z1 * Math.sin(rotation.y);
                    let z2 = z1 * Math.cos(rotation.y) + item.x * Math.sin(rotation.y);

                    const scale = (z2 + 2) / 3; // Depth scale
                    const opacity = Math.max(0.1, (z2 + 1.5) / 2.5);
                    const blur = Math.max(0, (1 - scale) * 10);

                    // Project to 2D
                    const radius = 100; // Sphere radius in px
                    const translateX = x2 * radius;
                    const translateY = y1 * radius;

                    return (
                        <div
                            key={i}
                            className="absolute top-1/2 left-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-700/50 shadow-xl backdrop-blur-sm transition-colors hover:border-indigo-500 hover:bg-zinc-800"
                            style={{
                                transform: `translate(-50%, -50%) translate3d(${translateX}px, ${translateY}px, ${z2 * 100}px) scale(${scale})`,
                                opacity,
                                filter: `blur(${blur}px)`,
                                zIndex: Math.floor(z2 * 1000)
                            }}
                        >
                            <item.icon size={14} className={item.color} />
                            <span className="text-xs font-bold text-zinc-100 whitespace-nowrap">{item.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SkillsSphere;
