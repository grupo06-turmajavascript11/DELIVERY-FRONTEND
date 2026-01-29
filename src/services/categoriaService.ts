import axios from 'axios';
import type { Categoria } from '../models/Categoria';

export const buscarCategorias = async (): Promise<Categoria[]> => {
  const response = await axios.get('/categorias');
  return response.data;
};

export const buscarCategoriaPorId = async (id: number): Promise<Categoria> => {
  const response = await axios.get(`/categorias/${id}`);
  return response.data;
};

export const criarCategoria = async (categoria: Categoria) => {
  return await axios.post('/categorias', categoria);
};

export const atualizarCategoria = async (id: number, categoria: Categoria) => {
  return await axios.put(`/categorias/${id}`, categoria);
};

export const deletarCategoria = async (id: number) => {
  return await axios.delete(`/categorias/${id}`);
};
