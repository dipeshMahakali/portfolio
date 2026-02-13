import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from '../hooks/use-toast';
import SparkleEffect from './ui/HoverSparkles';

const Contact = ({ personalInfo }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    try {
      const api = (await import('../services/api')).default;
      await api.contact.send(data);

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      e.target.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-[#0f0f23] to-[#0a0a1a]">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="text-cyan-400">Touch</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Let's discuss your next project or collaboration opportunity
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="p-8 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 relative group overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(6,182,212,0.1)]">
              <SparkleEffect />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Contact Information</h3>
                <p className="text-gray-400 text-sm mb-6">Feel free to reach out through any platform</p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 group/item">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-cyan-500/20 transition-all">
                      <Mail className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm mb-1">Email</p>
                      <a href={`mailto:${personalInfo.email}`} className="text-white hover:text-cyan-400 transition-colors block">
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group/item">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-cyan-500/20 transition-all">
                      <Phone className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm mb-1">Phone</p>
                      <a href={`tel:${personalInfo.phone}`} className="text-white hover:text-cyan-400 transition-colors block">
                        +91 {personalInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group/item">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-cyan-500/20 transition-all">
                      <MapPin className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm mb-1">Location</p>
                      <p className="text-white">{personalInfo.location}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Buttons */}
                <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                  <a
                    href={`https://wa.me/91${personalInfo.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 hover:border-green-500/50 rounded-lg text-green-400 font-medium transition-all duration-300 hover:scale-[1.02] group/wa"
                  >
                    <svg className="w-5 h-5 group-hover/wa:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Me
                  </a>

                  <a
                    href={`mailto:${personalInfo.email}?subject=Project Inquiry&body=Hi, I'd like to discuss a project with you.`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg text-cyan-400 font-medium transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Mail className="w-5 h-5" />
                    Quick Email
                  </a>
                </div>

                {/* Availability Badge */}
                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-wavy"></div>
                  <span className="text-green-400 text-sm font-medium">Available for projects</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 relative group overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(168,85,247,0.1)]">
              <SparkleEffect />
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Name *</label>
                    <Input
                      name="name"
                      required
                      placeholder="Your Name"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500 hover:border-white/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Email *</label>
                    <Input
                      name="email"
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500 hover:border-white/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Project Type</label>
                  <select
                    name="projectType"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:border-cyan-500 hover:border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    <option value="ai-ml" className="bg-slate-900">AI/ML Development</option>
                    <option value="iot" className="bg-slate-900">IoT Solutions</option>
                    <option value="automation" className="bg-slate-900">Automation</option>
                    <option value="web-dev" className="bg-slate-900">Web Development</option>
                    <option value="consultation" className="bg-slate-900">Technical Consultation</option>
                    <option value="other" className="bg-slate-900">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Message *</label>
                  <Textarea
                    name="message"
                    required
                    placeholder="Tell me about your project, timeline, and requirements..."
                    rows={5}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500 hover:border-white/20 transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] group"
                >
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </Button>

                <p className="text-gray-500 text-xs text-center">
                  Usually responds within 24 hours
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
