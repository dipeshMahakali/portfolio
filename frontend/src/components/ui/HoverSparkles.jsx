import React, { useMemo } from "react";

const HoverSparkles = () => {
    // Generate sparkles once and memoize
    const sparkles = useMemo(() => 
        Array.from({ length: 12 }).map((_, i) => ({ // Reduced from 20 to 12
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 2,
        })), []
    );

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {sparkles.map((sparkle) => (
                <span
                    key={sparkle.id}
                    className="absolute bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.3)] animate-sparkle"
                    style={{
                        left: `${sparkle.x}%`,
                        top: `${sparkle.y}%`,
                        width: sparkle.size,
                        height: sparkle.size,
                        animationDelay: `${sparkle.delay}s`,
                    }}
                />
            ))}
        </div>
    );
};

export const SparkleEffect = () => {
    return (
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
            <HoverSparkles />
        </div>
    );
};

export default SparkleEffect;
