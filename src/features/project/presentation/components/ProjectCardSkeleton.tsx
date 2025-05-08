interface ProjectCardSkeletonProps {
  hasButtons?: boolean;
}

export const ProjectCardSkeleton = ({
  hasButtons = false,
}: ProjectCardSkeletonProps) => {
  return (
    <div>
      <div className="p-8 bg-white border rounded shadow-sm animate-pulse">
        <p className="mb-3 text-xs font-semibold tracking-wide uppercase flex items-center gap-2">
          <span className="h-3 w-20 bg-gray-200 rounded" />
          <span className="h-3 w-24 bg-gray-200 rounded" />
        </p>

        <div className="mb-3 h-6 w-3/4 bg-gray-200 rounded" />
        <div className="mb-5 h-4 w-full bg-gray-200 rounded" />

        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3" />
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-1" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {hasButtons && (
        <div className="flex gap-2 mt-4">
          <div className="h-8 w-20 bg-gray-200 rounded" />
          <div className="h-8 w-20 bg-gray-200 rounded" />
        </div>
      )}
    </div>
  );
};
