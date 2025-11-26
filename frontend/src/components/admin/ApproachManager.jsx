import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2, Save, MoveUp, MoveDown } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from '../../hooks/use-toast';
import api from '../../services/api';

const ApproachManager = () => {
  const [approach, setApproach] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newItem, setNewItem] = useState({ phase: '', title: '', description: '' });

  useEffect(() => {
    fetchApproach();
  }, []);

  const fetchApproach = async () => {
    try {
      const response = await api.approach.get();
      setApproach(response.data || []);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load approach",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const handleAddItem = () => {
    if (!newItem.phase.trim() || !newItem.title.trim() || !newItem.description.trim()) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive"
      });
      return;
    }

    setApproach([...approach, { ...newItem, id: Date.now().toString() }]);
    setNewItem({ phase: '', title: '', description: '' });
  };

  const handleRemoveItem = (index) => {
    const updatedApproach = approach.filter((_, i) => i !== index);
    setApproach(updatedApproach);
  };

  const handleItemChange = (index, field, value) => {
    const updatedApproach = [...approach];
    updatedApproach[index][field] = value;
    setApproach(updatedApproach);
  };

  const moveItem = (index, direction) => {
    const newApproach = [...approach];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newApproach.length) return;
    
    [newApproach[index], newApproach[targetIndex]] = [newApproach[targetIndex], newApproach[index]];
    setApproach(newApproach);
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      await api.approach.update(approach);
      toast({
        title: "Success",
        description: "Approach updated successfully!"
      });
      fetchApproach();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update approach",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Approach Management</h2>
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

      {/* Add New Item */}
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border-blue-500/20 mb-6">
        <h3 className="text-lg font-bold text-white mb-4">Add New Approach Phase</h3>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Phase (e.g., Phase 1)"
            value={newItem.phase}
            onChange={(e) => setNewItem({ ...newItem, phase: e.target.value })}
            className="bg-white/5 border-white/10 text-white"
          />
          <Input
            type="text"
            placeholder="Title (e.g., Planning & Strategy)"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            className="bg-white/5 border-white/10 text-white"
          />
          <textarea
            placeholder="Description"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            rows="3"
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:border-blue-500 focus:outline-none"
          />
        </div>
        <Button
          onClick={handleAddItem}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Phase
        </Button>
      </Card>

      {/* Approach List */}
      <div className="grid grid-cols-1 gap-4">
        {approach.map((item, index) => (
          <Card key={index} className="p-4 sm:p-6 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/20">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 space-y-4">
                  <Input
                    type="text"
                    value={item.phase}
                    onChange={(e) => handleItemChange(index, 'phase', e.target.value)}
                    placeholder="Phase"
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <Input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                    placeholder="Title"
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <textarea
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    placeholder="Description"
                    rows="3"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex sm:flex-col gap-2">
                  <Button
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    size="sm"
                    className="bg-gray-600 hover:bg-gray-700 text-white flex-1 sm:flex-none"
                  >
                    <MoveUp className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === approach.length - 1}
                    size="sm"
                    className="bg-gray-600 hover:bg-gray-700 text-white flex-1 sm:flex-none"
                  >
                    <MoveDown className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleRemoveItem(index)}
                    size="sm"
                    className="bg-red-500 hover:bg-red-600 text-white flex-1 sm:flex-none"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {approach.length === 0 && (
        <Card className="p-8 bg-gradient-to-br from-gray-900/20 to-gray-800/20 border-gray-500/20 text-center">
          <p className="text-gray-400">No approach phases added yet. Add your first phase above!</p>
        </Card>
      )}
    </div>
  );
};

export default ApproachManager;