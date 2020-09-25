export interface ITask {
  id?: string;
  task: string;
  state?: number;
  project_id: string | number;
  created_at?: Date;
}
