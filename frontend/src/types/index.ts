export * from './reducers'
export * from './editor'
export * from './user'
export * from './interview'
export * from './question'

export interface ReduxState {
  accout? : {
    userId: string;
    name: string;
  };
  editor?: any;
  interview?: any;
  currentteam?: any;
}