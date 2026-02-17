import React from 'react';
import { Terminal } from 'lucide-react';
import { SKILLS } from '../config/constants';

import SkillsSphere from './SkillsSphere';

const Skills = () => {
    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-3 mb-2 z-10 relative">
                <Terminal className="text-indigo-400" />
                <h3 className="text-xl font-bold">Stack</h3>
            </div>
            <div className="flex-1 flex items-center justify-center -mt-4">
                <SkillsSphere />
            </div>
        </div>
    );
};

export default Skills;
