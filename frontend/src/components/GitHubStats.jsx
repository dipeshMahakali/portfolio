import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Code2, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';

const GitHubStats = ({ personalInfo }) => {
    // Extract username from GitHub URL
    const githubUsername = personalInfo?.github?.split('github.com/')[1]?.replace('/', '') || 'yourusername';

    // Sample stats - in production, fetch from GitHub API
    const stats = {
        totalStars: 150,
        totalForks: 45,
        totalRepos: 50,
        contributions: 1250,
        languages: [
            { name: 'Python', percentage: 45, color: '#3776ab' },
            { name: 'JavaScript', percentage: 30, color: '#f7df1e' },
            { name: 'C++', percentage: 15, color: '#00599c' },
            { name: 'Other', percentage: 10, color: '#6c757d' }
        ]
    };

    const topRepos = [
        { name: 'ai-image-classifier', stars: 45, forks: 12, language: 'Python', description: 'Deep learning image classification model' },
        { name: 'iot-smart-home', stars: 38, forks: 15, language: 'C++', description: 'IoT-based home automation system' },
        { name: 'nlp-sentiment-analysis', stars: 32, forks: 8, language: 'Python', description: 'NLP model for sentiment analysis' }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-slate-950 to-[#0a0a1a] relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px]" />

            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-gray-900/50 border border-gray-800">
                        <Github className="w-4 h-4 text-white mr-2" />
                        <span className="text-sm text-gray-400 font-medium tracking-wide">OPEN SOURCE</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        GitHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200">Activity</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Contributing to the open-source community
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                    {/* Stats Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="p-6 bg-slate-900/50 border-slate-700/50 hover:border-yellow-500/50 transition-all duration-300 group">
                            <div className="flex items-center justify-between mb-4">
                                <Star className="w-8 h-8 text-yellow-400" />
                                <TrendingUp className="w-5 h-5 text-green-400" />
                            </div>
                            <div className="text-4xl font-bold text-white mb-2">{stats.totalStars}</div>
                            <div className="text-gray-400 text-sm">Total Stars Received</div>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="p-6 bg-slate-900/50 border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
                            <div className="flex items-center justify-between mb-4">
                                <GitFork className="w-8 h-8 text-cyan-400" />
                                <TrendingUp className="w-5 h-5 text-green-400" />
                            </div>
                            <div className="text-4xl font-bold text-white mb-2">{stats.totalForks}</div>
                            <div className="text-gray-400 text-sm">Total Forks</div>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card className="p-6 bg-slate-900/50 border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group">
                            <div className="flex items-center justify-between mb-4">
                                <Code2 className="w-8 h-8 text-purple-400" />
                                <TrendingUp className="w-5 h-5 text-green-400" />
                            </div>
                            <div className="text-4xl font-bold text-white mb-2">{stats.contributions}</div>
                            <div className="text-gray-400 text-sm">Contributions This Year</div>
                        </Card>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Languages Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card className="p-6 bg-slate-900/50 border-slate-700/50">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Code2 className="w-5 h-5 text-cyan-400" />
                                Most Used Languages
                            </h3>
                            <div className="space-y-4">
                                {stats.languages.map((lang, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-300 text-sm font-medium">{lang.name}</span>
                                            <span className="text-gray-400 text-sm">{lang.percentage}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${lang.percentage}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: lang.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>

                    {/* Top Repositories */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <Card className="p-6 bg-slate-900/50 border-slate-700/50">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Github className="w-5 h-5 text-white" />
                                Popular Repositories
                            </h3>
                            <div className="space-y-4">
                                {topRepos.map((repo, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group cursor-pointer"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                                                {repo.name}
                                            </h4>
                                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                                                {repo.language}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-3">{repo.description}</p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-400" />
                                                {repo.stars}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <GitFork className="w-4 h-4 text-cyan-400" />
                                                {repo.forks}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                </div>

                {/* GitHub Contribution Graph */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-8"
                >
                    <Card className="p-6 bg-slate-900/50 border-slate-700/50">
                        <h3 className="text-xl font-bold text-white mb-4">Contribution Activity</h3>
                        <div className="flex items-center justify-center py-8">
                            <img
                                src={`https://ghchart.rshah.org/00d4ff/${githubUsername}`}
                                alt="GitHub Contribution Graph"
                                className="w-full max-w-4xl opacity-90"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                        <div className="text-center mt-4">
                            <a
                                href={personalInfo?.github || `https://github.com/${githubUsername}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                            >
                                View Full Profile on GitHub
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
};

export default GitHubStats;
