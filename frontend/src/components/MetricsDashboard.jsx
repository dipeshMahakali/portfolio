import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Cpu, Database, Zap, Code, GitBranch, Trophy, Users } from 'lucide-react';
import { Card } from './ui/card';

const MetricsDashboard = ({ metricsData }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    // Icon mapping
    const iconMap = {
        'Brain': Brain,
        'Cpu': Cpu,
        'Database': Database,
        'Zap': Zap,
        'Trophy': Trophy,
        'Code': Code,
        'GitBranch': GitBranch,
        'Users': Users
    };

    const defaultMetrics = [
        {
            icon: Brain,
            label: 'AI Models Deployed',
            value: 25,
            suffix: '+',
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/30'
        },
        {
            icon: Cpu,
            label: 'IoT Devices Connected',
            value: 500,
            suffix: '+',
            color: 'from-cyan-500 to-blue-500',
            bgColor: 'bg-cyan-500/10',
            borderColor: 'border-cyan-500/30'
        },
        {
            icon: Database,
            label: 'Data Processed',
            value: 100,
            suffix: 'TB+',
            color: 'from-green-500 to-emerald-500',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/30'
        },
        {
            icon: Zap,
            label: 'API Requests Served',
            value: 1,
            suffix: 'M+',
            color: 'from-yellow-500 to-orange-500',
            bgColor: 'bg-yellow-500/10',
            borderColor: 'border-yellow-500/30'
        },
        {
            icon: Trophy,
            label: 'Model Accuracy',
            value: 95,
            suffix: '%+',
            color: 'from-amber-500 to-red-500',
            bgColor: 'bg-amber-500/10',
            borderColor: 'border-amber-500/30'
        },
        {
            icon: Code,
            label: 'Projects Completed',
            value: 30,
            suffix: '+',
            color: 'from-blue-500 to-indigo-500',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/30'
        },
        {
            icon: GitBranch,
            label: 'GitHub Repositories',
            value: 50,
            suffix: '+',
            color: 'from-slate-500 to-gray-500',
            bgColor: 'bg-slate-500/10',
            borderColor: 'border-slate-500/30'
        },
        {
            icon: Users,
            label: 'Satisfied Clients',
            value: 15,
            suffix: '+',
            color: 'from-pink-500 to-rose-500',
            bgColor: 'bg-pink-500/10',
            borderColor: 'border-pink-500/30'
        }
    ];

    // Use API data if available, otherwise default
    const metrics = (metricsData && metricsData.length > 0)
        ? metricsData.map(m => ({
            ...m,
            icon: iconMap[m.iconName] || Brain // Fallback icon
        }))
        : defaultMetrics;

    const Counter = ({ target, suffix, duration = 2000 }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            if (!isInView) return;

            let startTime;
            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);

                setCount(Math.floor(progress * target));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }, [isInView, target, duration]);

        return (
            <span className="text-4xl md:text-5xl font-extrabold">
                {count}
                <span className="text-3xl md:text-4xl">{suffix}</span>
            </span>
        );
    };

    return (
        <section className="py-20 bg-gradient-to-b from-[#0f0f23] to-[#0a0a1a] relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.05),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.05),transparent_50%)]" />

            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-cyan-950/30 border border-cyan-800/30">
                        <Trophy className="w-4 h-4 text-cyan-400 mr-2" />
                        <span className="text-sm text-cyan-400 font-medium tracking-wide">ACHIEVEMENTS</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Metrics</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Quantifiable results from AI/ML and IoT projects
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className={`p-6 h-full ${metric.bgColor} ${metric.borderColor} border backdrop-blur-sm hover:scale-105 transition-all duration-300 group relative overflow-hidden`}>
                                {/* Glow effect on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                <div className="relative z-10 space-y-4">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${metric.color} p-0.5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                                            <metric.icon className="w-7 h-7 text-white" />
                                        </div>
                                    </div>

                                    <div>
                                        <div className={`text-transparent bg-clip-text bg-gradient-to-r ${metric.color}`}>
                                            <Counter target={metric.value} suffix={metric.suffix} />
                                        </div>
                                        <p className="text-gray-400 text-sm font-medium mt-2">{metric.label}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Additional highlight banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 text-center"
                >
                    <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-cyan-500/30 rounded-full backdrop-blur-sm">
                        <Zap className="w-6 h-6 text-yellow-400" />
                        <p className="text-white font-semibold">
                            Specialized in <span className="text-cyan-400">Edge AI</span> & <span className="text-purple-400">Industrial IoT</span> Solutions
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default MetricsDashboard;
