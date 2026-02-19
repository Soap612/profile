import React from 'react';
import { Github, ArrowRight } from 'lucide-react';
import { GITHUB_USERNAME } from '../config/constants';
import RepoCard from './RepoCard';

const RepoList = ({ repos, isComradeMode }) => {
    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Github className={isComradeMode ? "text-yellow-400" : "text-indigo-400"} />
                    <h3 className="text-xl font-bold">Latest Repos</h3>
                </div>
                <a href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                    View All <ArrowRight size={12} />
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 perspective-1000">
                {repos.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} isComradeMode={isComradeMode} />
                ))}
            </div>
        </>
    );
};

export default RepoList;
