
import React from 'react';
import { X, Mail, MessageSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data
    console.log('Contact form submitted');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-violet-800">
            <MessageSquare className="w-5 h-5" />
            <span>Contact Us</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-violet-700">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              required
              className="border-violet-200 focus:border-violet-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-violet-700">Subject</Label>
            <Input
              id="subject"
              placeholder="How can we help?"
              required
              className="border-violet-200 focus:border-violet-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message" className="text-violet-700">Message</Label>
            <Textarea
              id="message"
              placeholder="Tell us more about your question or issue..."
              rows={4}
              required
              className="border-violet-200 focus:border-violet-400"
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-violet-600 hover:bg-violet-700 text-white"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Message
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-violet-200 text-violet-700 hover:bg-violet-50"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
