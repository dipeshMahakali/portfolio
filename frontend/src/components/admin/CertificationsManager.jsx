import React, { useState, useEffect } from 'react';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from '../../hooks/use-toast';
import api from '../../services/api';

const CertificationsManager = () => {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchCertifications();
    }, []);

    const fetchCertifications = async () => {
        try {
            const response = await api.certifications.get();
            setCertifications(response.data.certifications || []);
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to load certifications",
                variant: "destructive"
            });
            setLoading(false);
        }
    };

    const handleChange = (index, field, value) => {
        const newCerts = [...certifications];
        newCerts[index] = { ...newCerts[index], [field]: value };
        setCertifications(newCerts);
    };

    const handleAdd = () => {
        setCertifications([
            ...certifications,
            {
                title: 'New Certification',
                issuer: 'Issuer Name',
                date: new Date().getFullYear().toString(),
                credential_id: '',
                description: '',
                verified: true,
                logo: '🎓',
                color: 'from-blue-500 to-cyan-500'
            }
        ]);
    };

    const handleDelete = (index) => {
        const newCerts = certifications.filter((_, i) => i !== index);
        setCertifications(newCerts);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.certifications.update({ certifications });
            toast({
                title: "Success",
                description: "Certifications updated successfully!"
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save certifications",
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
                <h2 className="text-2xl md:text-3xl font-bold text-white">Certifications</h2>
                <div className="flex gap-2">
                    <Button
                        onClick={handleAdd}
                        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add New
                    </Button>
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
            </div>

            <div className="space-y-4">
                {certifications.map((cert, index) => (
                    <Card key={index} className="p-4 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 relative group">
                        <Button
                            onClick={() => handleDelete(index)}
                            size="icon"
                            variant="destructive"
                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-12">
                            <div>
                                <label className="text-gray-400 text-xs mb-1 block">Title</label>
                                <Input
                                    value={cert.title}
                                    onChange={(e) => handleChange(index, 'title', e.target.value)}
                                    className="bg-black/20 border-white/10 text-white"
                                />
                            </div>
                            <div>
                                <label className="text-gray-400 text-xs mb-1 block">Issuer</label>
                                <Input
                                    value={cert.issuer}
                                    onChange={(e) => handleChange(index, 'issuer', e.target.value)}
                                    className="bg-black/20 border-white/10 text-white"
                                />
                            </div>
                            <div>
                                <label className="text-gray-400 text-xs mb-1 block">Date</label>
                                <Input
                                    value={cert.date}
                                    onChange={(e) => handleChange(index, 'date', e.target.value)}
                                    className="bg-black/20 border-white/10 text-white"
                                />
                            </div>
                            <div>
                                <label className="text-gray-400 text-xs mb-1 block">Credential ID</label>
                                <Input
                                    value={cert.credential_id || cert.credentialId || ''}
                                    onChange={(e) => handleChange(index, 'credential_id', e.target.value)}
                                    className="bg-black/20 border-white/10 text-white"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-gray-400 text-xs mb-1 block">Description</label>
                                <Input
                                    value={cert.description || ''}
                                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                                    className="bg-black/20 border-white/10 text-white"
                                />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CertificationsManager;
