import React from 'react';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

const Footer = ({ personalInfo }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a1a] border-t border-cyan-500/20 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">
              <span className="text-cyan-400">Dipesh</span> Patel
            </h3>
            <p className="text-gray-400 text-sm">
              Python Developer, AI and IoT Enthusiast
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Github className="w-5 h-5 text-cyan-400" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-5 h-5 text-cyan-400" />
            </a>
            <a
              href={personalInfo.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Twitter className="w-5 h-5 text-cyan-400" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            © {currentYear} Dipesh Patel. Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> using React & Three.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
