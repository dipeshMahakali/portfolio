// Continuous background gradient system for seamless component transitions
// This ensures all sections blend smoothly without visible boxes

export const sectionBackgrounds = {
  // Hero section - starts dark
  hero: "bg-gradient-to-b from-[#0a0a1a] via-[#0f0f23] to-[#0a0a1a]",
  
  // About/BentoGrid - continues from hero's end color
  bentoGrid: "bg-gradient-to-b from-[#0a0a1a] via-[#0d0d1f] to-[#0f0f23]",
  
  // Metrics Dashboard - seamless transition
  metrics: "bg-gradient-to-b from-[#0f0f23] via-[#0d0d1f] to-[#0a0a1a]",
  
  // Skills - alternates smoothly  
  skills: "bg-gradient-to-b from-[#0a0a1a] via-[#0d0d1f] to-[#0f0f23]",
  
  // Certifications - continues pattern
  certifications: "bg-gradient-to-b from-[#0f0f23] via-[#0d0d1f] to-[#0a0a1a]",
  
  // Projects - maintains flow
  projects: "bg-gradient-to-b from-[#0a0a1a] via-[#0f0f23] to-[#0d0d1f]",
  
  // Work Experience - smooth transition
  workExperience: "bg-gradient-to-b from-[#0d0d1f] via-[#0f0f23] to-[#0a0a1a]",
  
  // GitHub Stats - seamless
  githubStats: "bg-gradient-to-b from-[#0a0a1a] via-[#0d0d1f] to-[#0f0f23]",
  
  // Testimonials - continues
  testimonials: "bg-gradient-to-b from-[#0f0f23] via-[#0d0d1f] to-[#0a0a1a]",
  
  // Approach - smooth flow
  approach: "bg-gradient-to-b from-[#0a0a1a] via-[#0d0d1f] to-[#0f0f23]",
  
  // Contact - final section
  contact: "bg-gradient-to-b from-[#0f0f23] via-[#0d0d1f] to-[#0a0a1a]",
  
  // Footer - ends dark
  footer: "bg-[#0a0a1a]"
};

// Alternative: Ultra-smooth continuous background (more subtle)
export const smoothBackgrounds = {
  hero: "bg-[#0a0a1a]",
  bentoGrid: "bg-[linear-gradient(180deg,#0a0a1a_0%,#0c0c1d_50%,#0e0e20_100%)]",
  metrics: "bg-[linear-gradient(180deg,#0e0e20_0%,#0c0c1d_50%,#0a0a1a_100%)]",
  skills: "bg-[linear-gradient(180deg,#0a0a1a_0%,#0d0d1f_50%,#0f0f23_100%)]",
  certifications: "bg-[linear-gradient(180deg,#0f0f23_0%,#0d0d1f_50%,#0b0b1c_100%)]",
  projects: "bg-[linear-gradient(180deg,#0b0b1c_0%,#0c0c1d_50%,#0e0e20_100%)]",
  workExperience: "bg-[linear-gradient(180deg,#0e0e20_0%,#0c0c1d_50%,#0a0a1a_100%)]",
  githubStats: "bg-[linear-gradient(180deg,#0a0a1a_0%,#0b0b1c_50%,#0d0d1f_100%)]",
  testimonials: "bg-[linear-gradient(180deg,#0d0d1f_0%,#0c0c1d_50%,#0a0a1a_100%)]",
  approach: "bg-[linear-gradient(180deg,#0a0a1a_0%,#0d0d1f_50%,#0f0f23_100%)]",
  contact: "bg-[linear-gradient(180deg,#0f0f23_0%,#0c0c1d_50%,#0a0a1a_100%)]",
  footer: "bg-[#0a0a1a]"
};
