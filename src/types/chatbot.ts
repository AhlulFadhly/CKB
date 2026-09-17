export interface DocumentReference {
  id: string;
  title: string;
  type: string;
  fileUrl: string;
  fileSize: string;
  revision: string;
  division?: string;
  author?: string;
  lastUpdated?: string;
}

export interface ChatProject {
  id: string;
  name: string;
  isStarred: boolean;
  lastUpdated: string;
  promptSuggestions?: string[];
  description?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  referencedDoc?: DocumentReference;
  actionSuggestions?: string[];
}

export interface RecentHistoryItem {
  id: string;
  title: string;
  timestamp: string;
}
