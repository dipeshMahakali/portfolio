import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, LogIn } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { toast } from '../hooks/use-toast';
import api from '../services/api';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.auth.login(password);
      localStorage.setItem('admin_token', response.data.token);
      
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel!",
      });
      
      navigate('/admin/dashboard');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid password. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] to-[#0f0f23] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400">Enter your password to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter admin password"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-6 transition-all duration-300 hover:scale-105"
            >
              {loading ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Login
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-cyan-400 hover:text-cyan-300 text-sm">
              ← Back to Portfolio
            </a>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
