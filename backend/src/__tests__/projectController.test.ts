// backend/src/__tests__/projectController.test.ts
import { Request, Response } from 'express';
import db from '../db';
import projectController from '../controllers/projectController';


jest.mock('../db', () => ({
  all: jest.fn(),
}));

describe('projectController', () => {
  it('should return all projects', () => {

    const mockProjects = [{ id: 1, name: 'Projeto Teste' }];
    

    (db.all as jest.Mock).mockImplementationOnce((sql, params, callback) => {
      callback(null, mockProjects);
    });

    const mockRequest = {} as Request;
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn(() => mockResponse),
    } as unknown as Response;

    projectController.getAllProjects(mockRequest, mockResponse);

   
    expect(mockResponse.json).toHaveBeenCalledWith({ projects: mockProjects });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });
});