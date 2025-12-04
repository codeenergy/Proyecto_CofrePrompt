const SkeletonCard = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-40 bg-slate-800" />

      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="h-5 bg-slate-800 rounded w-3/4" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-3 bg-slate-800 rounded w-full" />
          <div className="h-3 bg-slate-800 rounded w-5/6" />
        </div>

        {/* Tags skeleton */}
        <div className="flex gap-2 pt-2">
          <div className="h-6 bg-slate-800 rounded-full w-16" />
          <div className="h-6 bg-slate-800 rounded-full w-20" />
          <div className="h-6 bg-slate-800 rounded-full w-14" />
        </div>

        {/* Footer skeleton */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-800 rounded-full" />
            <div className="h-3 bg-slate-800 rounded w-20" />
          </div>
          <div className="flex gap-3">
            <div className="h-3 bg-slate-800 rounded w-12" />
            <div className="h-3 bg-slate-800 rounded w-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
