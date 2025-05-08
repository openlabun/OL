import React from "react";
import type { Project } from "../../domain/entities/Project";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
}: ProjectCardProps) => {
  return (
    <div className="flex">
      <div className="pt-1 mr-6 text-center">
        <div className="px-2 pb-1 mb-1 border-b border-gray-400">
          <p className="text-sm text-blue-gray-700">JUN</p>
        </div>
        <div className="px-2">
          <p className="text-lg font-bold">05</p>
        </div>
      </div>
      <div>
        {/* <div className="mb-2">
          <a
            href={project.tagHref}
            className="text-xs font-semibold tracking-wide uppercase transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
            aria-label="Category"
            title={project.tag}
          >
            {project.tag}
          </a> */}

        <div className="mb-2">
          <a
            href={project.title}
            aria-label="Article"
            className="inline-block text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
          >
            {project.title}
          </a>
        </div>
        <p className="mb-5 text-gray-700">{project.description}</p>
        <div className="flex items-center">
          <a
            href={project.authorName}
            aria-label="Author"
            title={project.authorName}
            className="mr-3"
          >
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt="avatar"
              className="object-cover w-10 h-10 rounded-full shadow-sm"
            />
          </a>
          <div>
            <a
              href={project.authorName}
              aria-label="Author"
              title={project.authorName}
              className="font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              {project.authorName}
            </a>
            <p className="text-sm font-medium leading-4 text-gray-600">
              {project.authorName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
