export interface AnyAction {
  type?: string;
  payload?: any;
  [key: string]: any
}

export interface AnyState {
  [key: string]: any;
}