import React from 'react';
import { Github, ArrowRight, Star, GitFork } from 'lucide-react';
import { GITHUB_USERNAME } from '../config/constants';

const RepoList = ({ repos }) => {
    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Github className="text-indigo-400" />
                    <h3 className="text-xl font-bold">Latest Repos</h3>
                </div>
                <a href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                    View All <ArrowRight size={12} />
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {repos.map((repo) => (
                    <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-xl bg-zinc-800/30 border border-white/5 hover:bg-zinc-800/50 hover:border-indigo-500/30 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-zinc-200 truncate group-hover:text-indigo-400 transition-colors">{repo.name}</h4>
                            <div className="flex items-center gap-1 text-xs text-zinc-500">
                                <Star size={10} /> {repo.stargazers_count}
                            </div>
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-2 mb-3 h-8">{repo.description || "No description available"}</p>
                        <div className="flex items-center justify-between text-xs text-zinc-500">
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                {repo.language || "Code"}
                            </div>
                            <div className="flex items-center gap-1">
                                <GitFork size={10} /> {repo.forks_count}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </>
    );
};

export default RepoList;
