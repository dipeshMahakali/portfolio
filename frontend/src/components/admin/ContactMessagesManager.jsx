import React, { useState, useEffect } from 'react';
import { Trash2, Loader2, Mail, MailOpen, Clock } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { toast } from '../../hooks/use-toast';
import api from '../../services/api';

const ContactMessagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await api.contact.getAll();
      setMessages(response.data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.contact.markAsRead(id);
      toast({
        title: "Success",
        description: "Message marked as read!"
      });
      fetchMessages();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark message as read",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      await api.contact.delete(id);
      toast({
        title: "Success",
        description: "Message deleted successfully!"
      });
      fetchMessages();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-pink-400" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Contact Messages</h2>
        <div className="text-cyan-400 text-sm">
          Total Messages: {messages.length} | Unread: {messages.filter(m => !m.read).length}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {messages.length === 0 ? (
          <Card className="p-8 bg-gradient-to-br from-gray-900/20 to-gray-800/20 border-gray-500/20 text-center">
            <p className="text-gray-400">No messages yet. They will appear here when someone contacts you.</p>
          </Card>
        ) : (
          messages.map((message) => (
            <Card 
              key={message.id || message._id} 
              className={`p-4 sm:p-6 bg-gradient-to-br border ${message.read ? 'from-gray-900/20 to-gray-800/20 border-gray-500/20' : 'from-pink-900/20 to-rose-900/20 border-pink-500/20'}`}
            >
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {message.read ? (
                      <MailOpen className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Mail className="w-5 h-5 text-pink-400" />
                    )}
                    <h3 className="text-lg font-bold text-white">{message.name}</h3>
                    {!message.read && (
                      <span className="px-2 py-1 bg-pink-500/20 rounded-full border border-pink-500/30 text-pink-400 text-xs">
                        New
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <p className="text-cyan-400 text-sm">
                      <strong>Email:</strong> {message.email}
                    </p>
                    {message.phone && (
                      <p className="text-cyan-400 text-sm">
                        <strong>Phone:</strong> {message.phone}
                      </p>
                    )}
                    <p className="text-gray-300">{message.message}</p>
                    <p className="text-gray-500 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(message.createdAt)}
                    </p>
                  </div>
                </div>
                
                <div className="flex sm:flex-col gap-2">
                  {!message.read && (
                    <Button
                      onClick={() => handleMarkAsRead(message.id || message._id)}
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600 text-white flex-1 sm:flex-none"
                    >
                      <MailOpen className="w-4 h-4 sm:mr-0 mr-1" />
                      <span className="sm:hidden">Mark Read</span>
                    </Button>
                  )}
                  <Button
                    onClick={() => handleDelete(message.id || message._id)}
                    size="sm"
                    className="bg-red-500 hover:bg-red-600 text-white flex-1 sm:flex-none"
                  >
                    <Trash2 className="w-4 h-4 sm:mr-0 mr-1" />
                    <span className="sm:hidden">Delete</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactMessagesManager;