import pool from '../../libs/mysql2';

/* Interfaces */
import { ITask } from '../interfaces/task.interface';

export class TaskService{
    public async tasks(project_id: string): Promise<Object[]> {
        let [rows, fields]: object[][] = await pool.query('SELECT * FROM projects WHERE id = ?', [project_id]);
    
        if(![rows, fields][0][0]) {
            throw new Error("Project No Exist!").message;
        }

        [rows, fields] = await pool.query('SELECT * FROM tasks WHERE project_id = ? ORDER BY id ASC', [project_id]);        
        return [rows, fields][0];
    }

    public async createTask(project_id: string, name: string): Promise<Object[]> {
        let [rows, fields]: object[][] = await pool.query('SELECT * FROM projects WHERE id = ?', [project_id]);
    
        if(![rows, fields][0][0]) {
            throw new Error("Project No Exist!").message;
        }

        [rows, fields] = await pool.query('SELECT task FROM tasks WHERE task = ? AND project_id = ?', [name, project_id]);

        if([rows, fields][0][0]) {
            throw new Error("Task Name Already Exist!").message;
        }

        const task: ITask = { task: name, project_id };

        [rows, fields] = await pool.query('INSERT INTO tasks SET ?', [task]);
        [rows, fields] = await pool.query('SELECT * FROM tasks WHERE project_id = ? ORDER BY id ASC', [project_id]);        

        return [rows, fields][0];
    }

    /* Solo Cambia El Estado Si Esta Completada O No(1 - 0) */
    public async updateTask(task_id: string): Promise<string> {
        let [rows, fields]: object[][] = await pool.query('SELECT state FROM tasks WHERE id = ?', [task_id]);
    
        if(![rows, fields][0][0]) {
            throw new Error("Task No Exist!").message;
        }

        const stateDB: number[] = Object.values([rows, fields][0][0]).map(state => state);

        let state = 0;
        if(stateDB[0] === state) {
            state = 1;
        }

        [rows, fields] = await pool.query('UPDATE tasks SET state = ? WHERE id = ?', [state, task_id]);
        return 'Successfully Updated Task';
    }

    public async deleteTask(id_task: string): Promise<string> {
        let [rows, fields]: object[][] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id_task]);
    
        if(![rows, fields][0][0]) {
            throw new Error("Task No Exist!").message;
        }

        [rows, fields] = await pool.query('DELETE FROM tasks WHERE id = ?', [id_task]);
        return 'Successfully Deleted Task';
    }



}