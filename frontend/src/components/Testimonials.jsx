import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { Card } from './ui/card';
import SparkleEffect from './ui/HoverSparkles';

const Testimonials = ({ testimonials }) => {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-[#0f0f23] to-[#0a0a1a] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What People <span className="text-cyan-400">Say</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Testimonials from colleagues and industry professionals
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="flex gap-6 pb-6"
            animate={{
              x: [0, -2000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <Card
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-[400px] p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 relative group overflow-hidden"
              >
                <SparkleEffect />
                <div className="space-y-4 relative z-10">
                  <Quote className="w-10 h-10 text-cyan-400" />

                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-gray-300 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>

                  <div className="pt-4 border-t border-gray-700">
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-cyan-400 text-sm">{testimonial.position}</p>
                    <p className="text-gray-500 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#0f0f23] to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#0a0a1a] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
