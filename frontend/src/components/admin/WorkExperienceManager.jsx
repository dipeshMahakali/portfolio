import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Loader2, X } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from '../../hooks/use-toast';
import api from '../../services/api';

const WorkExperienceManager = () => {
  const [workExperience, setWorkExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    period: '',
    description: '',
    technologies: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchWorkExperience();
  }, []);

  const fetchWorkExperience = async () => {
    try {
      const response = await api.workExperience.getAll();
      setWorkExperience(response.data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load work experience",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        company: item.company,
        period: item.period,
        description: item.description,
        technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies || ''
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        company: '',
        period: '',
        description: '',
        technologies: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      title: '',
      company: '',
      period: '',
      description: '',
      technologies: ''
    });
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
      const data = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t)
      };

      if (editingItem) {
        await api.workExperience.update(editingItem.id || editingItem._id, data);
        toast({
          title: "Success",
          description: "Work experience updated successfully!"
        });
      } else {
        await api.workExperience.create(data);
        toast({
          title: "Success",
          description: "Work experience created successfully!"
        });
      }

      fetchWorkExperience();
      handleCloseModal();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save work experience",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this work experience?')) return;

    try {
      await api.workExperience.delete(id);
      toast({
        title: "Success",
        description: "Work experience deleted successfully!"
      });
      fetchWorkExperience();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete work experience",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Work Experience Management</h2>
        <Button
          onClick={() => handleOpenModal()}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {workExperience.map((item) => (
          <Card key={item.id || item._id} className="p-4 sm:p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/20">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{item.title}</h3>
                <p className="text-purple-400 font-medium mb-2">{item.company} • {item.period}</p>
                <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(item.technologies) ? item.technologies : []).map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 bg-purple-500/10 rounded-full border border-purple-500/30 text-purple-400 text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex sm:flex-col gap-2">
                <Button
                  onClick={() => handleOpenModal(item)}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white flex-1 sm:flex-none"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleDelete(item.id || item._id)}
                  size="sm"
                  className="bg-red-500 hover:bg-red-600 text-white flex-1 sm:flex-none"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0f0f23] border-purple-500/30 p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {editingItem ? 'Edit Work Experience' : 'Add Work Experience'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Job Title</label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Company</label>
                <Input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Period</label>
                <Input
                  type="text"
                  name="period"
                  value={formData.period}
                  onChange={handleChange}
                  placeholder="Jan 2020 - Dec 2022"
                  required
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Technologies (comma-separated)</label>
                <Input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold flex-1"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Experience'
                  )}
                </Button>
                <Button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-600 hover:bg-gray-700 text-white flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WorkExperienceManager;