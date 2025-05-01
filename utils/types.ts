// Define the Post interface
export interface Post {
  title: string;
  description: string;
  content: string;
  image: string;
  tags: string;
  slug: string;
  url: string;
  created: string;
  lastUpdated: string;
}

// Define the Project interface
export interface Project {
  title: string;
  summary: string;
  description: string;
  image: string;
  tags: string[];
  created: Date;
}

export interface ProjectsData {
  projects: Project[];
}

export interface ProjectListProps {
  file?: string;
  maxProjects?: number;
}
