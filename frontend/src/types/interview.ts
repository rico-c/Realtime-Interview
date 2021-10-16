export interface CreateInterfacrAction {
  info ?: any;
  id: string;
  creator: string;
  teamId: string;
  type: number;
}

export interface UpdateNoteAPIAction {
  roomId: string,
  content: string
}

export interface endInterviewAction {
  roomId: string,
  rate: number,
  comment: string
}

export interface InterviewRoute {
  roomId?: string;
}

export interface UpdateAPIAction {
  joinerName?: string;
  roomId: string;
  time?: any;
}