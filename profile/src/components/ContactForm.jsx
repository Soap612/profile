import React, { useState, useRef } from 'react';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Loader, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';

// ─── EmailJS credentials ───────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = 'service_rz6p3zv';
const EMAILJS_TEMPLATE_ID = 'template_87fqoxd';
const EMAILJS_PUBLIC_KEY = 'YYWImzuwWzD0rcxns';
// ──────────────────────────────────────────────────────────────────────────────

const ContactForm = ({ isComradeMode }) => {
    const formRef = useRef(null);
    const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
    const [contactType, setContactType] = useState('whatsapp'); // 'email' | 'whatsapp'
    const [formData, setFormData] = useState({ from_name: '', from_email: '', message: '' });

    const accent = isComradeMode ? 'text-yellow-400' : 'text-indigo-400';
    const focusBorder = isComradeMode ? 'focus:border-red-500/50' : 'focus:border-indigo-500/50';
    const btnBg = isComradeMode ? 'bg-red-700 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-500';

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === 'sending') return;

        setStatus('sending');
        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            );
            setStatus('success');
            setFormData({ from_name: '', from_email: '', message: '' });
            setTimeout(() => setStatus('idle'), 4000);
        } catch (err) {
            console.error('EmailJS error:', err);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    const isEmail = contactType === 'email';

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Left: info */}
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                    <Mail className={accent} />
                    <h3 className="text-xl font-bold">Get in Touch</h3>
                </div>
                <p className="text-zinc-400 mb-6">
                    Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and ideas.
                </p>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-zinc-300">
                        <div className="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center border border-white/5">
                            <Mail size={18} className={accent} />
                        </div>
                        <div>
                            <div className="text-xs text-zinc-500">Email</div>
                            <div className="font-mono text-sm">methmikamanipura@gmail.com</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-300">
                        <div className="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center border border-white/5">
                            <MapPin size={18} className={accent} />
                        </div>
                        <div>
                            <div className="text-xs text-zinc-500">Location</div>
                            <div className="font-mono text-sm">Dehiwala, Sri Lanka</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: form */}
            <div className="flex-1 bg-zinc-900/50 rounded-2xl p-6 border border-white/5">
                {status === 'success' ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 py-8 text-center">
                        <CheckCircle size={48} className="text-emerald-400 animate-bounce" />
                        <p className="text-emerald-400 font-bold text-lg">Message sent!</p>
                        <p className="text-zinc-400 text-sm">Thanks for reaching out. I'll get back to you soon.</p>
                    </div>
                ) : status === 'error' ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 py-8 text-center">
                        <AlertCircle size={48} className="text-red-400" />
                        <p className="text-red-400 font-bold text-lg">Something went wrong</p>
                        <p className="text-zinc-400 text-sm">Please try again or email me directly.</p>
                    </div>
                ) : (
                    <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-xs text-zinc-400 font-medium ml-1">Name</label>
                                <input
                                    type="text"
                                    name="from_name"
                                    required
                                    value={formData.from_name}
                                    onChange={handleChange}
                                    className={`w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none ${focusBorder} focus:bg-zinc-800 transition-all`}
                                    placeholder="John Doe"
                                />
                            </div>

                            {/* Email / WhatsApp toggle field */}
                            <div className="space-y-2">
                                {/* Toggle pills */}
                                <div className="flex items-center gap-1 ml-1">
                                    <button
                                        type="button"
                                        onClick={() => setContactType('email')}
                                        className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${
                                            isEmail
                                                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                                                : 'text-zinc-600 hover:text-zinc-400'
                                        }`}
                                    >
                                        <Mail size={9} /> Email
                                    </button>
                                    <span className="text-zinc-700 text-[10px]">/</span>
                                    <button
                                        type="button"
                                        onClick={() => setContactType('whatsapp')}
                                        className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${
                                            !isEmail
                                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                                : 'text-zinc-600 hover:text-zinc-400'
                                        }`}
                                    >
                                        <Phone size={9} /> WhatsApp
                                    </button>
                                </div>

                                {isEmail ? (
                                    <input
                                        key="email-input"
                                        type="email"
                                        name="from_email"
                                        required
                                        value={formData.from_email}
                                        onChange={handleChange}
                                        className={`w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none ${focusBorder} focus:bg-zinc-800 transition-all`}
                                        placeholder="john@example.com"
                                    />
                                ) : (
                                    <input
                                        key="whatsapp-input"
                                        type="tel"
                                        name="from_email"
                                        required
                                        value={formData.from_email}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-zinc-800 transition-all"
                                        placeholder="+94 76 123 4567"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Hidden field to tell EmailJS which contact method was used */}
                        <input type="hidden" name="contact_type" value={contactType === 'email' ? 'Email' : 'WhatsApp'} />

                        <div className="space-y-2">
                            <label className="text-xs text-zinc-400 font-medium ml-1">Message</label>
                            <textarea
                                name="message"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                className={`w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none ${focusBorder} focus:bg-zinc-800 transition-all resize-none h-32`}
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className={`w-full ${btnBg} text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed`}
                        >
                            {status === 'sending' ? (
                                <>
                                    <Loader size={16} className="animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContactForm;
