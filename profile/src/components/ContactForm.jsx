import React from 'react';
import { Mail, MapPin, Send } from 'lucide-react';

const ContactForm = () => {
    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                    <Mail className="text-indigo-400" />
                    <h3 className="text-xl font-bold">Get in Touch</h3>
                </div>
                <p className="text-zinc-400 mb-6">
                    Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and ideas.
                </p>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-zinc-300">
                        <div className="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center border border-white/5">
                            <Mail size={18} className="text-indigo-400" />
                        </div>
                        <div>
                            <div className="text-xs text-zinc-500">Email</div>
                            <div className="font-mono text-sm">methmikamanipura@gmail.com</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-300">
                        <div className="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center border border-white/5">
                            <MapPin size={18} className="text-indigo-400" />
                        </div>
                        <div>
                            <div className="text-xs text-zinc-500">Location</div>
                            <div className="font-mono text-sm">Ratnapura, Sri Lanka</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-zinc-900/50 rounded-2xl p-6 border border-white/5">
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs text-zinc-400 font-medium ml-1">Name</label>
                            <input type="text" className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:bg-zinc-800 transition-all" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-zinc-400 font-medium ml-1">Email</label>
                            <input type="email" className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:bg-zinc-800 transition-all" placeholder="john@example.com" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-zinc-400 font-medium ml-1">Message</label>
                        <textarea className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:bg-zinc-800 transition-all resize-none h-32" placeholder="Tell me about your project..."></textarea>
                    </div>
                    <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 group">
                        Send Message
                        <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
