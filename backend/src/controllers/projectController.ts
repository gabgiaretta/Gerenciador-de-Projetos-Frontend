import { Request, Response } from 'express';
import db from '../db';


interface Project {
    id?: number;
    name: string;
    description?: string;
}


const projectController = {
    getAllProjects: (req: Request, res: Response) => {
        db.all('SELECT * FROM projects', [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ projects: rows });
        });
    },

    createProject: (req: Request<{}, {}, Project>, res: Response) => {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'O nome do projeto é obrigatório.' });
        }
        db.run('INSERT INTO projects (name, description) VALUES (?, ?)', [name, description], function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(409).json({ error: 'Um projeto com este nome já existe.' });
                }
                return res.status(500).json({ error: err.message });
            }
            const newProject: Project = { id: this.lastID, name, description };
            res.status(201).json(newProject);
        });
    },

    getProjectById: (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        db.get('SELECT * FROM projects WHERE id = ?', [id], (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!row) {
                return res.status(404).json({ error: 'Projeto não encontrado.' });
            }
            res.json({ project: row });
        });
    },

    updateProject: (req: Request<{ id: string }, {}, Project>, res: Response) => {
        const { id } = req.params;
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'O nome do projeto é obrigatório.' });
        }
        db.run('UPDATE projects SET name = ?, description = ? WHERE id = ?', [name, description, id], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Projeto não encontrado.' });
            }
            res.json({ message: 'Projeto atualizado com sucesso.', id, name, description });
        });
    },

    deleteProject: (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        db.run('DELETE FROM projects WHERE id = ?', [id], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Projeto não encontrado.' });
            }
            res.json({ message: 'Projeto excluído com sucesso.' });
        });
    }
};

export default projectController;