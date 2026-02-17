import React from 'react';
import { SOCIAL_LINKS } from '../config/constants';
import Magnetic from './Magnetic';

const SocialLinks = () => {
    return (
        <div className="mt-8 flex gap-3 flex-wrap">
            {SOCIAL_LINKS.map((link, i) => (
                <Magnetic key={i}>
                    <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 transition-all duration-300 hover:scale-110 hover:border-zinc-600 ${link.color}`}
                        aria-label={link.label}
                    >
                        <link.icon size={20} />
                    </a>
                </Magnetic>
            ))}
        </div>
    );
};

export default SocialLinks;
