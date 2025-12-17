import React, { useState, useEffect } from 'react';
import { Save, Loader2, RefreshCw } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from '../../hooks/use-toast';
import api from '../../services/api';

const MetricsManager = () => {
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchMetrics();
    }, []);

    const fetchMetrics = async () => {
        try {
            const response = await api.metrics.get();
            // Ensure we have the metrics array
            setMetrics(response.data.metrics || []);
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to load metrics",
                variant: "destructive"
            });
            setLoading(false);
        }
    };

    const handleChange = (index, field, value) => {
        const newMetrics = [...metrics];
        newMetrics[index] = { ...newMetrics[index], [field]: value };
        setMetrics(newMetrics);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.metrics.update({ metrics });
            toast({
                title: "Success",
                description: "Metrics updated successfully!"
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save metrics",
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
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Dashboard Metrics</h2>
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold"
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {metrics.map((metric, index) => (
                    <Card key={index} className="p-4 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${metric.color || 'from-gray-700 to-gray-600'}`}>
                                <span className="text-white text-xs">{metric.iconName}</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-medium">{metric.label}</h3>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="text-gray-400 text-xs mb-1 block">Value</label>
                                <Input
                                    value={metric.value}
                                    onChange={(e) => handleChange(index, 'value', e.target.value)}
                                    className="bg-black/20 border-white/10 text-white"
                                />
                            </div>
                            <div>
                                <label className="text-gray-400 text-xs mb-1 block">Label</label>
                                <Input
                                    value={metric.label}
                                    onChange={(e) => handleChange(index, 'label', e.target.value)}
                                    className="bg-black/20 border-white/10 text-white"
                                />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {metrics.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                    No metrics found. Run the seed script to initialize default metrics.
                </div>
            )}
        </div>
    );
};

export default MetricsManager;
