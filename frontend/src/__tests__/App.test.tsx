// frontend/src/__tests__/App.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';


global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ projects: [] }),
  })
) as any;

describe('App', () => {
  it('should render the main heading', async () => {
    render(<App />);


    await waitFor(() => {
      expect(screen.getByText('Gerenciador de Projetos')).toBeInTheDocument();
    });
  });

  it('should display "Nenhum projeto encontrado." if there are no projects', async () => {
    render(<App />);

 
    await waitFor(() => {
        expect(screen.getByText('Nenhum projeto encontrado.')).toBeInTheDocument();
    });
  });
});