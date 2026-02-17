import React, { useRef, useEffect } from 'react';

const StarField = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const STAR_COUNT = 400;
        const SPEED = 0.05;
        const MOUSE_SENSITIVITY = 0.0005;

        let stars = [];
        let mouseX = 0;
        let mouseY = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            stars = [];
            for (let i = 0; i < STAR_COUNT; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    z: Math.random() * 2, // Depth (size & speed)
                    alpha: Math.random(),
                    flickerSpeed: 0.02 + Math.random() * 0.04
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Movement based on mouse position (parallax)
            const moveX = (mouseX - canvas.width / 2) * MOUSE_SENSITIVITY;
            const moveY = (mouseY - canvas.height / 2) * MOUSE_SENSITIVITY;

            stars.forEach(star => {
                // Update position
                star.x -= moveX * star.z;
                star.y -= moveY * star.z;

                // Wrap around screen
                if (star.x < 0) star.x = canvas.width;
                if (star.x > canvas.width) star.x = 0;
                if (star.y < 0) star.y = canvas.height;
                if (star.y > canvas.height) star.y = 0;

                // Flicker effect
                star.alpha += star.flickerSpeed;
                if (star.alpha > 1 || star.alpha < 0.2) star.flickerSpeed *= -1;

                // Draw star
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
                ctx.arc(star.x, star.y, star.z * 0.8, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none opacity-60"
        />
    );
};

export default StarField;
