import React, { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from '../../hooks/use-toast';
import api from '../../services/api';

const PersonalInfoManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
    twitter: ''
  });

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  const fetchPersonalInfo = async () => {
    try {
      const response = await api.personalInfo.get();
      setFormData(response.data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load personal information",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.personalInfo.update(formData);
      toast({
        title: "Success",
        description: "Personal information updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update personal information",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/20">
      <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white text-sm font-medium mb-2 block">Name</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">Title</label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-white text-sm font-medium mb-2 block">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">Phone</label>
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">Location</label>
            <Input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">GitHub URL</label>
            <Input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">LinkedIn URL</label>
            <Input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">Twitter URL</label>
            <Input
              type="url"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={saving}
          className="w-full md:w-auto bg-cyan-500 hover:bg-cyan-600 text-black font-semibold"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default PersonalInfoManager;
