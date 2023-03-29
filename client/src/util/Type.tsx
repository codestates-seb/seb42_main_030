export interface DiaryData {
  diaryId: number;
  title: string;
  body: string;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  modifiedAt: string;
  userNickname: string;
  comments: CommentData[];
  tag: string[];
  
}

export interface DiaryDataProps {
  list: DiaryData;
}

export interface CommentData {
  commentId: number;
  diaryId: number;
  body: string;
  createdAt: string;
  modifiedAt: string;
  userNickname: string;
}

export interface CommentDataProps {
  list: CommentData;
}

export interface UserData {
  userId: number;
  nickname: string;
  email: string;
  password: string;
  imageUrl?: string;
}
