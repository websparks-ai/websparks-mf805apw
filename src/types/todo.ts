export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  priority: 'low' | 'medium' | 'high';
  category?: string;
}

export type FilterType = 'all' | 'active' | 'completed';

export type SortType = 'created' | 'priority' | 'alphabetical';
