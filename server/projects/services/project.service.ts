import slug from 'slug';
import { generate } from 'shortid';

/* Database Connection */
import pool from '../../libs/mysql2';

/* Interface */
import { IProject } from '../interfaces/project.interface';

export class ProjectService {
    public async projects(idUser: any): Promise<object[]> {
        const [rows, fields]: object[][] = await pool.query('SELECT * FROM projects WHERE user_id = ?', [ idUser ]);
        return [rows, fields][0];
    }

    public async project(url_id: string, idUser: any): Promise<object[]> {
        const [rows, fields]: object[][] = await pool.query('SELECT * FROM projects WHERE url = ? AND user_id = ?', [url_id, idUser]);

        if(![rows, fields][0][0]) {
            throw new Error("Project Not Exist!").message;
        }

        return [rows, fields][0];
    }

    public async createProject(name:string, idUser: any): Promise<object> {
        const url_id: string = `${generate()}-${slug(name).toLocaleLowerCase()}`;
        const project: IProject = {name, url: url_id, user_id: idUser};

        let [rows, fields]: object[][] = await pool.query('SELECT name FROM projects WHERE name = ? AND user_id = ?', [ name, idUser ]);

        if([rows, fields][0][0]) {
            throw new Error("Name Project Already Exist!").message;
        }

        await pool.query('INSERT INTO projects SET ?', [ project ]);
        [rows, fields] = await pool.query('SELECT * FROM projects WHERE name = ? AND user_id = ? ORDER BY id ASC', [ name, idUser ]);

        return [rows, fields][0];
    }

    public async updateProject(name: string, project_url: string, project_id: string, idUser: any): Promise<string> {
        const [rows, fields]: object[][] = await pool.query('SELECT * FROM projects WHERE id = ? AND url = ? AND user_id = ?', [project_id, project_url, idUser]); 

        if(![rows, fields][0][0]) {
            throw new Error("Project No Exist!").message;
        }

        const project: IProject = { id: project_id, name, url: project_url, user_id: idUser};
        
        await pool.query('UPDATE projects SET ? WHERE id = ? AND url = ?', [project, project_id, project_url]);
        return 'Successfully Updated Project';
    }

    public async deleteProject(project_id: string, project_url: string, idUser: any): Promise<any> {
        const [rows, fields]: object[][] = await pool.query('SELECT * FROM projects WHERE id = ? AND url = ? AND user_id = ?', [project_id, project_url, idUser]); 

        if(![rows, fields][0][0]) {
            throw new Error("Project No Exist!").message;
        }

        await pool.query('DELETE FROM projects WHERE id = ? AND url = ?', [project_id, project_url]);
        await pool.query('DELETE FROM tasks WHERE project_id = ?', [project_id]);
        return 'Successfully Deleted Project And Tasks';
    }
}