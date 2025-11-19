import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from '../hooks/use-toast';

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
      <div className="container mx-auto px-6">
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
            <Card className="p-8 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Email</p>
                    <a href={`mailto:${personalInfo.email}`} className="text-white hover:text-cyan-400 transition-colors">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Phone</p>
                    <a href={`tel:${personalInfo.phone}`} className="text-white hover:text-cyan-400 transition-colors">
                      +91 {personalInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Location</p>
                    <p className="text-white">{personalInfo.location}</p>
                  </div>
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
            <Card className="p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Name</label>
                  <Input
                    name="name"
                    required
                    placeholder="Your Name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500"
                  />
                </div>
                
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Email</label>
                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500"
                  />
                </div>
                
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Message</label>
                  <Textarea
                    name="message"
                    required
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none"
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-6 transition-all duration-300 hover:scale-105"
                >
                  <Send className="w-5 h-5 mr-2" />
                  <a href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=dipeshmahakali@gmail.com">Send Message</a>
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
