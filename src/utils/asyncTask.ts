export interface AsyncTask<T = any> {
  isInit?: boolean;
  isLoading?: boolean;
  result?: T;
  resultDate?: Date;
  error?: any;
}
