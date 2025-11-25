import React, { useState } from 'react';
import { Star, ThumbsUp, Send } from 'lucide-react';
import { Comment, User } from '../types';

interface CommentsSectionProps {
  promptId: string;
  comments: Comment[];
  user: User | null;
  onAddComment: (comment: Omit<Comment, 'id' | 'createdAt' | 'likes'>) => void;
  onLikeComment: (commentId: string) => void;
}

export default function CommentsSection({
  promptId,
  comments,
  user,
  onAddComment,
  onLikeComment
}: CommentsSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    onAddComment({
      promptId,
      userId: user.uid,
      userDisplayName: user.displayName || 'Usuario',
      userPhotoURL: user.photoURL,
      content: newComment.trim(),
      rating
    });

    setNewComment('');
    setRating(5);
  };

  const averageRating = comments.length > 0
    ? (comments.reduce((sum, c) => sum + c.rating, 0) / comments.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-4">
      {/* Rating Summary */}
      <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
        <div className="text-center">
          <div className="text-3xl font-bold text-white">{averageRating}</div>
          <div className="flex gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(parseFloat(averageRating))
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-slate-600'
                }`}
              />
            ))}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {comments.length} {comments.length === 1 ? 'valoración' : 'valoraciones'}
          </div>
        </div>

        <div className="flex-1 space-y-1">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = comments.filter(c => c.rating === stars).length;
            const percentage = comments.length > 0 ? (count / comments.length) * 100 : 0;
            return (
              <div key={stars} className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 w-8">{stars}★</span>
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-slate-400 w-8 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Tu valoración:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= (hoveredStar || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-slate-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Comparte tu opinión sobre este prompt..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={3}
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="absolute right-2 bottom-2 p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center py-4 text-sm text-slate-400">
          Inicia sesión para dejar un comentario
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-sm text-slate-500">
            Sé el primero en comentar este prompt
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 space-y-2"
            >
              <div className="flex items-start gap-3">
                <img
                  src={comment.userPhotoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.userDisplayName)}&background=6366f1&color=fff`}
                  alt={comment.userDisplayName}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-white text-sm">
                      {comment.userDisplayName}
                    </span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= comment.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">{comment.content}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 pl-13">
                <button
                  onClick={() => onLikeComment(comment.id)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{comment.likes}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
