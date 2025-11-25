import React, { useMemo } from 'react';
import { TrendingUp, Hash } from 'lucide-react';
import { Prompt } from '../types';

interface TrendingTagsProps {
  prompts: Prompt[];
  onTagClick: (tag: string) => void;
  className?: string;
}

export default function TrendingTags({ prompts, onTagClick, className = '' }: TrendingTagsProps) {
  const trendingTags = useMemo(() => {
    // Count tag frequency
    const tagCounts = new Map<string, number>();

    prompts.forEach(prompt => {
      prompt.tags.forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });

    // Convert to array and sort by count
    return Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));
  }, [prompts]);

  if (trendingTags.length === 0) return null;

  return (
    <div className={`bg-slate-800/50 dark:bg-slate-800/50 border border-slate-700 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-5 h-5 text-indigo-400" />
        <h3 className="text-sm font-bold text-white">Tags Trending</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {trendingTags.map(({ tag, count }) => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className="group flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/50 hover:bg-indigo-500/20 border border-slate-600 hover:border-indigo-500/50 rounded-full transition-all text-xs"
          >
            <Hash className="w-3 h-3 text-slate-400 group-hover:text-indigo-400" />
            <span className="text-slate-300 group-hover:text-indigo-300 font-medium">{tag}</span>
            <span className="text-slate-500 group-hover:text-indigo-400 text-[10px] font-bold">
              {count}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-3 text-[10px] text-slate-500 text-center">
        Click en un tag para filtrar prompts
      </div>
    </div>
  );
}
