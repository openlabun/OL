export interface ProjectDTO {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: string;
  url?: string;
  authorId?: string;
  authorName?: string;
}
