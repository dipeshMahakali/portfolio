import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2, Save } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from '../../hooks/use-toast';
import api from '../../services/api';

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // New skill form
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: ''
  });

  // Fetch skills on mount
  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await api.skills.get();
      setSkills(response.data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load skills",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Add new skill
  const handleAddSkill = () => {
    if (!newSkill.name.trim()) {
      return toast({
        title: "Error",
        description: "Skill name is required",
        variant: "destructive"
      });
    }

    setSkills([...skills, { name: newSkill.name, level: newSkill.level }]);

    // Reset input fields
    setNewSkill({ name: '', level: '' });
  };

  // Remove skill
  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // Edit skill fields
  const handleSkillChange = (index, field, value) => {
    const updated = [...skills];
    updated[index][field] = value;
    setSkills(updated);
  };

  // Save skills to backend
  const handleSave = async () => {
    setSaving(true);
    try {
      await api.skills.update(skills);
      toast({
        title: "Success",
        description: "Skills updated successfully!"
      });
      fetchSkills();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update skills",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Skills Management
        </h2>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold w-full sm:w-auto"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save All Changes
            </>
          )}
        </Button>
      </div>

      {/* Add New Skill */}
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border-blue-500/20 mb-6">
        <h3 className="text-lg font-bold text-white mb-4">Add New Skill</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Skill name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            className="bg-white/5 border-white/10 text-white"
          />

          <Input
            type="text"
            placeholder="Level (e.g., Beginner, Intermediate, Expert)"
            value={newSkill.level}
            onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <Button
          onClick={handleAddSkill}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </Card>

      {/* Skills List */}
      <div className="grid grid-cols-1 gap-4">
        {skills.map((skill, index) => (
          <Card
            key={index}
            className="p-4 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/20"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <Input
                type="text"
                value={skill.name}
                onChange={(e) =>
                  handleSkillChange(index, "name", e.target.value)
                }
                placeholder="Skill name"
                className="bg-white/5 border-white/10 text-white"
              />

              <Input
                type="text"
                value={skill.level}
                onChange={(e) =>
                  handleSkillChange(index, "level", e.target.value)
                }
                placeholder="Level"
                className="bg-white/5 border-white/10 text-white"
              />

              <Button
                onClick={() => handleRemoveSkill(index)}
                size="sm"
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Remove
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {skills.length === 0 && (
        <Card className="p-8 bg-gradient-to-br from-gray-900/20 to-gray-800/20 border-gray-500/20 text-center">
          <p className="text-gray-400">
            No skills added yet. Add your first skill above!
          </p>
        </Card>
      )}
    </div>
  );
};

export default SkillsManager;
