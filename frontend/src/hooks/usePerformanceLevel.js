import { useState, useEffect } from 'react';

/**
 * Performance detection levels:
 * - 'high': Desktop with 8GB+ RAM, 4+ cores
 * - 'medium': Tablet or desktop with 4-8GB RAM
 * - 'low': Mobile or devices with <4GB RAM
 */
export const usePerformanceLevel = () => {
  const [performanceLevel, setPerformanceLevel] = useState('high');

  useEffect(() => {
    const detectPerformance = () => {
      // Check if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        return 'low';
      }

      // Get device memory (in GB)
      const memory = navigator.deviceMemory || 8; // Default to 8GB if not supported
      
      // Get CPU cores
      const cores = navigator.hardwareConcurrency || 4; // Default to 4 cores
      
      // Check if mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      
      // Check screen size
      const isSmallScreen = window.innerWidth < 768;
      
      // Check connection speed (if available)
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const slowConnection = connection && (
        connection.effectiveType === 'slow-2g' || 
        connection.effectiveType === '2g' ||
        connection.saveData === true
      );

      // Determine performance level
      if (slowConnection || (memory < 4) || (cores < 4) || (isMobile && isSmallScreen)) {
        return 'low';
      } else if (memory < 8 || cores < 6 || isMobile) {
        return 'medium';
      } else {
        return 'high';
      }
    };

    setPerformanceLevel(detectPerformance());

    // Listen for changes in reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      setPerformanceLevel(detectPerformance());
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  return performanceLevel;
};

/**
 * Get animation configuration based on performance level
 */
export const getAnimationConfig = (performanceLevel) => {
  switch (performanceLevel) {
    case 'low':
      return {
        enableThreeJS: false,
        particleCount: 25,
        enableScrollAnimations: false,
        enableHoverEffects: true, // Keep hover effects, they're cheap
        animationDuration: 0.2,
        staggerDelay: 0,
      };
    case 'medium':
      return {
        enableThreeJS: true,
        particleCount: 35,
        enableScrollAnimations: true,
        enableHoverEffects: true,
        animationDuration: 0.4,
        staggerDelay: 0.05,
      };
    case 'high':
    default:
      return {
        enableThreeJS: true,
        particleCount: 50,
        enableScrollAnimations: true,
        enableHoverEffects: true,
        animationDuration: 0.8,
        staggerDelay: 0.1,
      };
  }
};

export default usePerformanceLevel;
