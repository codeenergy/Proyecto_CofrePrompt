export enum Platform {
  ChatGPT = 'ChatGPT',
  Midjourney = 'Midjourney',
  Claude = 'Claude',
  StableDiffusion = 'Stable Diffusion',
  Gemini = 'Gemini'
}

export enum Category {
  All = 'Todos',
  General = 'General',
  Coding = 'Programación',
  Design = 'Diseño',
  Marketing = 'Marketing',
  Writing = 'Escritura',
  Business = 'Negocios'
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string; // New field for visual result
  platform: Platform;
  category: Category;
  author: string;
  likes: number;
  views: number;
  tags: string[];
  createdAt: string;
}

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  bio?: string;
  favoritePrompts?: string[];
  collections?: Collection[];
  following?: string[];
  followers?: string[];
  createdAt?: string;
}

export interface Comment {
  id: string;
  promptId: string;
  userId: string;
  userDisplayName: string;
  userPhotoURL: string | null;
  content: string;
  rating: number;
  createdAt: string;
  likes: number;
}

export interface Collection {
  id: string;
  userId: string;
  name: string;
  description: string;
  promptIds: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PromptHistory {
  id: string;
  userId: string;
  promptId: string;
  usedAt: string;
  platform: Platform;
}

export interface PromptStats {
  promptId: string;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalCopies: number;
  averageRating: number;
  viewsByDay: { date: string; count: number }[];
  topCountries: { country: string; count: number }[];
}

export interface FilterState {
  search: string;
  category: Category;
  platform: Platform | 'All';
}

export interface Notification {
  id: string;
  type: 'comment' | 'like' | 'follow' | 'trending';
  userId: string;
  userName: string;
  userPhoto: string | null;
  promptId?: string;
  promptTitle?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: 'trophy' | 'star' | 'zap' | 'award' | 'target' | 'flame' | 'crown' | 'sparkles';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  earned: boolean;
  progress?: number;
  maxProgress?: number;
  earnedAt?: string;
}