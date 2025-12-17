import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Loader2, X } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from '../../hooks/use-toast';
import api from '../../services/api';

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    github: '',
    demo: '',
    featured: false
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.projects.getAll();
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies,
        github: project.github || '',
        demo: project.demo || '',
        featured: project.featured || false
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        technologies: '',
        github: '',
        demo: '',
        featured: false
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      technologies: '',
      github: '',
      featured: false
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t)
      };

      if (editingProject) {
        await api.projects.update(editingProject.id || editingProject._id, projectData);
        toast({
          title: "Success",
          description: "Project updated successfully!"
        });
      } else {
        await api.projects.create(projectData);
        toast({
          title: "Success",
          description: "Project created successfully!"
        });
      }

      fetchProjects();
      handleCloseModal();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await api.projects.delete(id);
      toast({
        title: "Success",
        description: "Project deleted successfully!"
      });
      fetchProjects();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive"
      });
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
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Projects Management</h2>
        <Button
          onClick={() => handleOpenModal()}
          className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <Card key={project.id || project._id} className="p-4 sm:p-6 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/20">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(Array.isArray(project.technologies) ? project.technologies : []).map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/30 text-cyan-400 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-sm hover:underline">
                    View on GitHub
                  </a>
                )}
              </div>
              <div className="flex sm:flex-col gap-2">
                <Button
                  onClick={() => handleOpenModal(project)}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white flex-1 sm:flex-none"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleDelete(project.id || project._id)}
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
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0f0f23] border-cyan-500/30 p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div>
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
                <label className="text-white text-sm font-medium mb-2 block">Technologies (comma-separated)</label>
                <Input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
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
                  placeholder="https://github.com/..."
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Demo URL</label>
                <Input
                  type="url"
                  name="demo"
                  value={formData.demo}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <label className="text-white text-sm">Featured Project</label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold flex-1"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Project'
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

export default ProjectsManager;