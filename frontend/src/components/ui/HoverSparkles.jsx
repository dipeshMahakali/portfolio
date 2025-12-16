import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HoverSparkles = () => {
    const [sparkles, setSparkles] = useState([]);

    // Generate random sparkles
    useEffect(() => {
        const generateSparkles = () => {
            const newSparkles = Array.from({ length: 20 }).map((_, i) => ({
                id: i,
                x: Math.random() * 100, // percentage
                y: Math.random() * 100, // percentage
                size: Math.random() * 2 + 1, // 1-3px
                duration: Math.random() * 1 + 0.5, // 0.5-1.5s
                delay: Math.random() * 0.5,
            }));
            setSparkles(newSparkles);
        };

        generateSparkles();
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            <AnimatePresence>
                {sparkles.map((sparkle) => (
                    <motion.span
                        key={sparkle.id}
                        className="absolute bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.3)]"
                        initial={{ opacity: 0, scale: 0 }}
                        whileHover={{ opacity: 1, scale: 1 }} // This won't work on the span itself because parent is hovering
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            y: [0, -20], // float up slightly
                        }}
                        transition={{
                            duration: sparkle.duration,
                            repeat: Infinity,
                            delay: sparkle.delay,
                            ease: "easeInOut",
                        }}
                        style={{
                            left: `${sparkle.x}%`,
                            top: `${sparkle.y}%`,
                            width: sparkle.size,
                            height: sparkle.size,
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export const SparkleEffect = () => {
    return (
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            {/* Use a simple CSS animation-based sparkle or mapped motion divs */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
            <HoverSparkles />
        </div>
    );
};

export default SparkleEffect;
