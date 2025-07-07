export interface BlogPost {
  id: string
  topic: string
  htmlContent: string
  deltaContent: string
  stamp: String
  view: number
  thumbnail: string
  category_name: string
}

export interface EditorDetails {
  id: string;
  htmlContent: string;
  // post
  topic: string;
  deltaContent: string;
  categoryName: string;
  thumbnail: string;
  // lawyer profile
  name: string;
  bio: string;
}

export interface EditorProps {
  type: string;
  object: EditorDetails | null;
  onSuccess?: () => void;
}
