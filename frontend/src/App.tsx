// frontend/src/App.tsx
import { useState, useEffect, FormEvent } from 'react';
import './App.css';

interface Project {
    id: number;
    name: string;
    description?: string;
}

const API_URL = 'http://localhost:3000/api/projects';

function App() {
    // Tipando o estado dos projetos como um array de objetos Project
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [newProjectName, setNewProjectName] = useState<string>('');
    const [newProjectDesc, setNewProjectDesc] = useState<string>('');

    const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
    const [editProjectName, setEditProjectName] = useState<string>('');
    const [editProjectDesc, setEditProjectDesc] = useState<string>('');
    
    const [filterText, setFilterText] = useState<string>('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Falha ao buscar projetos.');
            }
            const data = await response.json();
            setProjects(data.projects);
        } catch (e: any) {
            alert(`Erro: ${e.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Tipando o evento do formulário como FormEvent
    const handleCreateProject = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newProjectName, description: newProjectDesc }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
            const newProject = await response.json();
            setProjects([...projects, newProject]);
            setNewProjectName('');
            setNewProjectDesc('');
        } catch (e: any) {
            alert(`Erro: ${e.message}`);
        }
    };

    // Tipando o parâmetro 'id' como number
    const handleDeleteProject = async (id: number) => {
        if (!window.confirm('Tem certeza que deseja excluir este projeto?')) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
            setProjects(projects.filter(project => project.id !== id));
        } catch (e: any) {
            alert(`Erro: ${e.message}`);
        }
    };

    // Tipando o parâmetro 'project' como Project
    const handleEditStart = (project: Project) => {
        setEditingProjectId(project.id);
        setEditProjectName(project.name);
        setEditProjectDesc(project.description || '');
    };

    const handleEditCancel = () => {
        setEditingProjectId(null);
        setEditProjectName('');
        setEditProjectDesc('');
    };

    const handleUpdateProject = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/${editingProjectId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: editProjectName, description: editProjectDesc }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            setProjects(projects.map(p =>
                p.id === editingProjectId ? { ...p, name: editProjectName, description: editProjectDesc } : p
            ));
            handleEditCancel();
        } catch (e: any) {
            alert(`Erro: ${e.message}`);
        }
    };

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(filterText.toLowerCase())
    );

    if (loading) return <p>Carregando projetos...</p>;

    return (
        <div className="app-container">
            <h1>Gerenciador de Projetos</h1>
            
            <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Pesquisar projetos pelo nome..."
                className="filter-input"
            />

            <form onSubmit={handleCreateProject} className="project-form">
                <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="Nome do Projeto"
                    required
                />
                <textarea
                    value={newProjectDesc}
                    onChange={(e) => setNewProjectDesc(e.target.value)}
                    placeholder="Descrição do Projeto"
                />
                <button type="submit">Adicionar Projeto</button>
            </form>

            <h2>Projetos Existentes</h2>
            <div className="project-list">
                {filteredProjects.length === 0 ? (
                    <p>Nenhum projeto encontrado.</p>
                ) : (
                    filteredProjects.map((project: Project) => (
                        <div key={project.id} className="project-item">
                            {editingProjectId === project.id ? (
                                <form onSubmit={handleUpdateProject} className="edit-form">
                                    <input
                                        type="text"
                                        value={editProjectName}
                                        onChange={(e) => setEditProjectName(e.target.value)}
                                        required
                                    />
                                    <textarea
                                        value={editProjectDesc}
                                        onChange={(e) => setEditProjectDesc(e.target.value)}
                                    />
                                    <div className="edit-buttons">
                                        <button type="submit">Salvar</button>
                                        <button type="button" onClick={handleEditCancel}>Cancelar</button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <h3>{project.name}</h3>
                                    <p>{project.description || 'Sem descrição.'}</p>
                                    <div className="project-actions">
                                        <button onClick={() => handleEditStart(project)}>Editar</button>
                                        <button onClick={() => handleDeleteProject(project.id)}>Excluir</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default App;