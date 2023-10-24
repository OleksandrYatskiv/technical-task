import api from '../service';

const url = 'https://technical-task-api.icapgroupgmbh.com/api/table/';

export interface ApiResponse<T> {
  count: number;
  next: string;
  previous: string | null;
  results: T[];
}

const table = {
  get: () => api.get<ApiResponse<any>>(url)
    .then(({ data }) => data)
    .catch((err) => {
      throw new Error(err);
    }),
  post: (params: any) => api.post<ApiResponse<any>>(url, params)
    .then(({ data }) => data)
    .catch((err) => {
      throw new Error(err);
    }),
};

export { table };
