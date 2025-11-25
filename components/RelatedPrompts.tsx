import React from 'react';
import { Sparkles } from 'lucide-react';
import { Prompt } from '../types';
import PromptCard from './PromptCard';

interface RelatedPromptsProps {
  currentPrompt: Prompt;
  allPrompts: Prompt[];
  onSelectPrompt: (prompt: Prompt) => void;
  maxResults?: number;
}

export default function RelatedPrompts({
  currentPrompt,
  allPrompts,
  onSelectPrompt,
  maxResults = 4
}: RelatedPromptsProps) {
  // Algorithm to find related prompts
  const getRelatedPrompts = (): Prompt[] => {
    const scored = allPrompts
      .filter(p => p.id !== currentPrompt.id)
      .map(prompt => {
        let score = 0;

        // Same category: +3 points
        if (prompt.category === currentPrompt.category) score += 3;

        // Same platform: +2 points
        if (prompt.platform === currentPrompt.platform) score += 2;

        // Shared tags: +1 point per tag
        const sharedTags = prompt.tags.filter(tag =>
          currentPrompt.tags.includes(tag)
        ).length;
        score += sharedTags;

        // Same author: +1 point
        if (prompt.author === currentPrompt.author) score += 1;

        // Popularity bonus (normalize to 0-2 range)
        const popularityScore = Math.min(2, (prompt.likes / 100) * 2);
        score += popularityScore;

        return { prompt, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults)
      .map(item => item.prompt);

    return scored;
  };

  const relatedPrompts = getRelatedPrompts();

  if (relatedPrompts.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-indigo-400" />
        <h3 className="text-lg font-bold text-white">Prompts Relacionados</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {relatedPrompts.map(prompt => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            onOpen={onSelectPrompt}
          />
        ))}
      </div>
    </div>
  );
}
