import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, CheckCircle, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import SparkleEffect from './ui/HoverSparkles';

const Certifications = ({ certificationsData }) => {
    const defaultCertifications = [
        {
            id: 1,
            title: 'AWS Certified Machine Learning - Specialty',
            issuer: 'Amazon Web Services',
            date: '2024',
            credentialId: 'AWS-ML-12345',
            logo: '☁️',
            description: 'Advanced ML model development and deployment on AWS',
            verified: true,
            color: 'from-orange-500 to-yellow-500'
        },
        {
            id: 2,
            title: 'TensorFlow Developer Certificate',
            issuer: 'Google',
            date: '2023',
            credentialId: 'TF-DEV-67890',
            logo: '🧠',
            description: 'Deep learning and neural network implementation',
            verified: true,
            color: 'from-orange-600 to-red-600'
        },
        {
            id: 3,
            title: 'IoT Specialization',
            issuer: 'Coursera',
            date: '2023',
            credentialId: 'IOT-SPEC-54321',
            logo: '📡',
            description: 'End-to-end IoT system design and implementation',
            verified: true,
            color: 'from-cyan-500 to-blue-500'
        },
        {
            id: 4,
            title: 'Deep Learning Specialization',
            issuer: 'DeepLearning.AI',
            date: '2022',
            credentialId: 'DL-SPEC-98765',
            logo: '🎓',
            description: 'Advanced neural networks and deep learning techniques',
            verified: true,
            color: 'from-purple-500 to-pink-500'
        }
    ];

    const certifications = (certificationsData && certificationsData.length > 0) ? certificationsData : defaultCertifications;

    return (
        <section className="py-20 bg-gradient-to-b from-[#0a0a1a] to-[#0f0f23] relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[linear-gradient(30deg,#00d4ff_12%,transparent_12.5%,transparent_87%,#00d4ff_87.5%,#00d4ff)] bg-[length:40px_70px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-purple-950/30 border border-purple-800/30">
                        <Award className="w-4 h-4 text-purple-400 mr-2" />
                        <span className="text-sm text-purple-400 font-medium tracking-wide">CREDENTIALS</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Achievements</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Professional credentials validating expertise in AI/ML and IoT technologies
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="p-6 bg-gradient-to-br from-slate-900/50 to-slate-900/30 border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden rounded-2xl">
                                <SparkleEffect />

                                <div className="relative z-10 space-y-4">
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-4">
                                        <div className={`text-5xl w-16 h-16 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                            {cert.logo}
                                        </div>
                                        {cert.verified && (
                                            <div className="flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
                                                <CheckCircle className="w-3 h-3" />
                                                Verified
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                                            {cert.title}
                                        </h3>
                                        <p className="text-purple-400 font-medium">{cert.issuer}</p>
                                        <p className="text-gray-400 text-sm leading-relaxed">{cert.description}</p>
                                    </div>

                                    {/* Footer */}
                                    <div className="pt-3 border-t border-slate-700/50 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                            <Calendar className="w-4 h-4" />
                                            <span>{cert.date}</span>
                                        </div>
                                        <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors group/btn">
                                            <span>View Credential</span>
                                            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>

                                    <div className="text-xs text-gray-600 font-mono">
                                        ID: {cert.credentialId}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-400">
                        Want to see all credentials?{' '}
                        <a href="#contact" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                            Get in touch →
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Certifications;
