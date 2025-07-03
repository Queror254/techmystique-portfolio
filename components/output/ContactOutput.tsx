import React, { useState } from 'react';
import { YOUR_EMAIL } from '../../constants';

const ContactOutput: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would send this data to a backend API.
    // For now, we just simulate success.
    console.log({ name, email, message });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
        <div className="max-w-lg p-4 rounded-md border border-[var(--accent-green)] bg-[var(--bg-tertiary-alpha)]">
            <h3 className="font-bold text-[var(--accent-green)]">Success!</h3>
            <p className="text-[var(--text-primary)]">Your message has been sent. I'll be in touch shortly.</p>
        </div>
    );
  }

  return (
    <div>
      <p className="mb-4">
        Have a question or want to work together? Feel free to reach out. You can email me directly at <a href={`mailto:${YOUR_EMAIL}`} className="text-[var(--accent-cyan)] hover:underline">{YOUR_EMAIL}</a> or use the form below.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-1">name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md p-2 focus:ring-2 focus:ring-[var(--accent-cyan)] focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-1">email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md p-2 focus:ring-2 focus:ring-[var(--accent-cyan)] focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[var(--text-primary)] mb-1">message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md p-2 focus:ring-2 focus:ring-[var(--accent-cyan)] focus:outline-none"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-[var(--button-primary-bg)] text-white font-bold rounded-md hover:bg-[var(--button-primary-hover-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]">
          sendMessage()
        </button>
      </form>
    </div>
  );
};

export default ContactOutput;