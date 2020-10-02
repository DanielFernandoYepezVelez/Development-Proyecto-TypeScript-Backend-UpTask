export interface ITask {
  id?: string;
  task: string;
  state?: number;
  project_id: string;
  created_at?: Date;
}
