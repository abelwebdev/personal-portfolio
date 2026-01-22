import React, { useState } from 'react';
import { Send, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/xpqpabgd', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _replyto: formData.email,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Form submission failed');
      }

      setStatus('success');
      setFormData({ email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-950 transition-colors duration-300"
    >
      <div className="max-w-3xl mx-auto text-center mb-12">
        <RevealOnScroll>
          <h2 className="text-primary font-medium tracking-wide uppercase text-sm mb-4">
            03. What's Next?
          </h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Get In Touch
          </h3>
          <p className="text-lg text-gray-600 dark:text-zinc-400 leading-relaxed">
            I'm currently looking for new opportunities and my inbox is always open.
            Fill out the form below and I’ll get back to you soon.
          </p>
        </RevealOnScroll>
      </div>

      <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-zinc-800">
        <RevealOnScroll delay={200}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="john@example.com"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Project Inquiry"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                placeholder="Hello, I'd like to discuss..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-lg text-lg font-medium hover:bg-emerald-600 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </button>

            {/* Status Messages */}
            {status === 'success' && (
              <p className="flex items-center gap-2 text-green-600 text-sm mt-4">
                <CheckCircle size={16} />
                Message sent successfully. I’ll reply soon!
              </p>
            )}

            {status === 'error' && (
              <p className="flex items-center gap-2 text-red-600 text-sm mt-4">
                <XCircle size={16} />
                Something went wrong. Please try again later.
              </p>
            )}
          </form>
        </RevealOnScroll>
      </div>
    </section>
  );
};