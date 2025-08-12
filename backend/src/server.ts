// Importa módulos usando a sintaxe ES6 'import'
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes';

const app: Express = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('API de Gerenciamento de Projetos está rodando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});