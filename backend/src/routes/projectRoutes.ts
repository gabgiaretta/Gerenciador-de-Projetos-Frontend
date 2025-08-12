import { Router } from 'express';
import projectController from '../controllers/projectController';

const router: Router = Router();

router.route('/')
    .get(projectController.getAllProjects)
    .post(projectController.createProject);

router.route('/:id')
    .get(projectController.getProjectById)
    .put(projectController.updateProject)
    .delete(projectController.deleteProject);

export default router;