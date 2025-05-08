interface ProjectCardSkeletonProps {
  hasButtons?: boolean;
}

export const ProjectCardSkeleton = ({
  hasButtons = false,
}: ProjectCardSkeletonProps) => {
  return (
    <div>
      <div className="flex flex-col justify-between p-5 border rounded shadow-sm animate-pulse">
        <div>
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        </div>
        <div className="h-4 mt-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
      </div>

      {hasButtons && (
        <div className="flex gap-2 mt-4">
          <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      )}
    </div>
  );
};
