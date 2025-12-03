import React from 'react';
import { Terminal } from 'lucide-react';
import { SKILLS } from '../config/constants';

const Skills = () => {
    return (
        <>
            <div className="flex items-center gap-3 mb-6">
                <Terminal className="text-indigo-400" />
                <h3 className="text-xl font-bold">Stack</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill, i) => (
                    <div
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-xs font-mono text-zinc-300 flex items-center gap-2 hover:bg-zinc-700/50 hover:text-white hover:border-indigo-500/50 transition-colors cursor-default group"
                    >
                        <skill.icon size={12} className={`group-hover:${skill.color} transition-colors`} />
                        {skill.name}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Skills;
