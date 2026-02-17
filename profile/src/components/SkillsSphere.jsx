import React, { useEffect, useState, useRef, useMemo } from 'react';
import { SKILLS } from '../config/constants';

const SkillsSphere = () => {
    const containerRef = useRef(null);
    const rotationRef = useRef({ x: 0, y: 0 });
    const momentumRef = useRef({ x: 0.1, y: 0.1 }); // Initial slow rotation
    const requestRef = useRef();
    const isDragging = useRef(false);

    // Initial item positions (static)
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
                z: Math.sin(theta) * radius,
                ref: React.createRef() // Create ref for direct DOM manipulation
            };
        });
    }, []);

    useEffect(() => {
        const animate = () => {
            // Update rotation logic
            rotationRef.current.x += momentumRef.current.x * 0.05;
            rotationRef.current.y += momentumRef.current.y * 0.05;

            // Apply friction
            if (!isDragging.current) {
                momentumRef.current.x = momentumRef.current.x * 0.98 + 0.002;
                momentumRef.current.y = momentumRef.current.y * 0.98 + 0.002;
            }

            // Update DOM directly for each item to avoid React Re-renders
            // This is the key optimization: changing style transform directly
            const rx = rotationRef.current.x;
            const ry = rotationRef.current.y;

            // Pre-calculate trig values for this frame
            const cosX = Math.cos(rx);
            const sinX = Math.sin(rx);
            const cosY = Math.cos(ry);
            const sinY = Math.sin(ry);

            items.forEach(item => {
                if (!item.ref.current) return;

                // Rotate around X axis
                const y1 = item.y * cosX - item.z * sinX;
                const z1 = item.z * cosX + item.y * sinX;

                // Rotate around Y axis
                const x2 = item.x * cosY - z1 * sinY;
                const z2 = z1 * cosY + item.x * sinY;

                const scale = (z2 + 2) / 3;
                const opacity = Math.max(0.1, (z2 + 1.5) / 2.5);
                const blur = Math.max(0, (1 - scale) * 10);

                const radius = 100;
                const translateX = x2 * radius;
                const translateY = y1 * radius;

                // Direct DOM update
                item.ref.current.style.transform = `translate(-50%, -50%) translate3d(${translateX}px, ${translateY}px, ${z2 * 100}px) scale(${scale})`;
                item.ref.current.style.opacity = opacity;
                item.ref.current.style.filter = `blur(${blur}px)`;
                item.ref.current.style.zIndex = Math.floor(z2 * 1000);
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [items]); // Re-run if items change (should be stable)

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

        momentumRef.current = { x: y * 2, y: -x * 2 };
    };

    return (
        <div
            ref={containerRef}
            className="w-full h-[300px] relative flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseMove={handleMouseMove}
        >
            <div className="relative w-full h-full preserve-3d">
                {items.map((item, i) => (
                    <div
                        key={i}
                        ref={item.ref}
                        className="absolute top-1/2 left-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-700/50 shadow-xl backdrop-blur-sm transition-colors hover:border-indigo-500 hover:bg-zinc-800 will-change-transform"
                    // Styles are handled by JS loop now
                    >
                        <item.icon size={14} className={item.color} />
                        <span className="text-xs font-bold text-zinc-100 whitespace-nowrap">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsSphere;
