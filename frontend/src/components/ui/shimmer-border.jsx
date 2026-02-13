import React from 'react';

/**
 * YouTube-style Shimmer Box Component
 * Uses background-position animation on a large gradient for a smooth "wave" effect.
 */
export const ShimmerBox = ({ className = "" }) => (
  <div className={`shimmer-box-container ${className}`}>
    <style dangerouslySetInnerHTML={{ __html: `
      .shimmer-box-container {
        position: relative;
        overflow: hidden;
        background: #0f172a; 
        border-radius: inherit;
      }
      .shimmer-box-container::after {
        content: "";
        position: absolute;
        inset: 0;
        transform: translateX(-100%);
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.05),
          transparent
        );
        animation: shimmer-slide 1.5s infinite;
      }
      @keyframes shimmer-slide {
        100% {
          transform: translateX(100%);
        }
      }
    `}} />
  </div>
);

/**
 * ShimmerBorder Component
 * Adds a glowing moving border effect on hover.
 */
export const ShimmerBorder = ({ children, className = '', shimmerColor = 'cyan' }) => {
  const colorClasses = {
    cyan: 'from-cyan-500/0 via-cyan-500/40 to-cyan-500/0',
    purple: 'from-purple-500/0 via-purple-500/40 to-purple-500/0',
    blue: 'from-blue-500/0 via-blue-500/40 to-blue-500/0',
    green: 'from-green-500/0 via-green-500/40 to-green-500/0',
    pink: 'from-pink-500/0 via-pink-500/40 to-pink-500/0'
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl group ${className}`}>
      {/* Background Glow Layer (Visible on hover) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
        {/* The "Wavy" diagonal light beam */}
        <div className="absolute inset-x-0 inset-y-[-50%] w-[200%] h-[200%] animate-sweep bg-gradient-to-r ${colorClasses[shimmerColor]} skew-x-[-25deg]" 
             style={{ backgroundSize: '200% 100%' }} />
      </div>
      
      <div className="relative z-10">
        {children}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sweep {
          0% { transform: translate(-100%, 0) skewX(-25deg); }
          100% { transform: translate(100%, 0) skewX(-25deg); }
        }
        .animate-sweep {
          animation: sweep 2.5s infinite ease-in-out;
        }
      `}} />
    </div>
  );
};

export const CardShimmer = ({ className = '' }) => (
  <div className={`p-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl ${className}`}>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <ShimmerBox className="w-12 h-12 rounded-xl" />
        <ShimmerBox className="w-20 h-6 rounded-lg" />
      </div>
      <div className="space-y-2">
        <ShimmerBox className="w-3/4 h-6 rounded-lg" />
        <ShimmerBox className="w-1/2 h-4 rounded-lg" />
        <ShimmerBox className="w-full h-4 rounded-lg" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <ShimmerBox className="w-24 h-4 rounded-lg" />
        <ShimmerBox className="w-28 h-8 rounded-lg" />
      </div>
    </div>
  </div>
);

export const StatsCardShimmer = ({ className = '' }) => (
  <div className={`p-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl ${className}`}>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <ShimmerBox className="w-8 h-8 rounded-lg" />
        <ShimmerBox className="w-5 h-5 rounded-lg" />
      </div>
      <ShimmerBox className="w-16 h-10 rounded-lg" />
      <ShimmerBox className="w-32 h-5 rounded-lg" />
    </div>
  </div>
);

export const SkillCardShimmer = ({ className = '' }) => (
  <div className={`p-5 bg-slate-900/50 border border-slate-700/50 rounded-2xl h-full ${className}`}>
    <div className="flex flex-col items-center h-full justify-between gap-4">
      <div className="flex flex-col items-center space-y-3 w-full">
        <ShimmerBox className="w-14 h-14 rounded-2xl" />
        <ShimmerBox className="w-20 h-6 rounded-lg" />
      </div>
      <div className="w-full space-y-2">
        <div className="flex justify-between items-center">
          <ShimmerBox className="w-16 h-4 rounded-lg" />
          <ShimmerBox className="w-8 h-4 rounded-lg" />
        </div>
        <ShimmerBox className="w-full h-2 rounded-full" />
      </div>
    </div>
  </div>
);

export const TestimonialCardShimmer = ({ className = '' }) => (
  <div className={`w-[400px] p-8 bg-slate-900/40 border border-slate-700/50 rounded-2xl ${className}`}>
    <div className="space-y-4">
      <ShimmerBox className="w-10 h-10 rounded-lg" />
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <ShimmerBox key={i} className="w-5 h-5 rounded-lg" />
        ))}
      </div>
      <div className="space-y-2">
        <ShimmerBox className="w-full h-4 rounded-lg" />
        <ShimmerBox className="w-full h-4 rounded-lg" />
        <ShimmerBox className="w-3/4 h-4 rounded-lg" />
      </div>
      <div className="pt-4 border-t border-slate-700 space-y-2">
        <ShimmerBox className="w-32 h-5 rounded-lg" />
        <ShimmerBox className="w-28 h-4 rounded-lg" />
        <ShimmerBox className="w-24 h-4 rounded-lg" />
      </div>
    </div>
  </div>
);

export const BentoCardShimmer = ({ className = '', large = false }) => (
  <div className={`${large ? 'p-8' : 'p-6'} bg-slate-900/50 border border-slate-700/50 rounded-2xl h-full ${className}`}>
    <div className="space-y-4">
      {large && (
        <div className="flex items-center gap-4">
          <ShimmerBox className="w-20 h-20 rounded-full" />
          <div className="space-y-2">
            <ShimmerBox className="w-40 h-8 rounded-lg" />
            <ShimmerBox className="w-32 h-5 rounded-lg" />
          </div>
        </div>
      )}
      <div className="space-y-2">
        <ShimmerBox className="w-12 h-12 rounded-lg" />
        <ShimmerBox className={`${large ? 'w-3/4' : 'w-1/2'} h-6 rounded-lg`} />
        <ShimmerBox className="w-full h-4 rounded-lg" />
        {!large && <ShimmerBox className="w-2/3 h-4 rounded-lg" />}
      </div>
      {large && (
        <div className="space-y-3 pt-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <ShimmerBox className="w-5 h-5 rounded-lg" />
              <ShimmerBox className={`h-4 rounded-lg ${i === 0 ? 'w-48' : i === 1 ? 'w-36' : 'w-32'}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export const GitHubRepoShimmer = ({ className = '' }) => (
  <div className={`p-4 bg-slate-900/50 border border-slate-700/50 rounded-lg ${className}`}>
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <ShimmerBox className="w-32 h-5 rounded-lg" />
        <ShimmerBox className="w-16 h-6 rounded-lg" />
      </div>
      <ShimmerBox className="w-full h-4 rounded-lg" />
      <div className="flex items-center gap-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-1">
            <ShimmerBox className="w-4 h-4 rounded-lg" />
            <ShimmerBox className="w-8 h-4 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default {
  ShimmerBorder,
  CardShimmer,
  StatsCardShimmer,
  SkillCardShimmer,
  TestimonialCardShimmer,
  BentoCardShimmer,
  GitHubRepoShimmer,
  ShimmerBox
};
