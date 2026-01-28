import axios from 'axios';
import type { Categoria } from '../models/Categoria';
import type { CreateCategoriaDTO } from '../models/CreateCategoriaDTO';
import type { UpdateCategoriaDTO } from '../models/UpdateCategoriaDTO';
import type { Produto } from '../models/Produto';
import type { CreateProdutoDTO } from '../models/CreateProdutoDTO';
import type { UpdateProdutoDTO } from '../models/UpdateProdutoDTO';
import type { Usuario } from '../models/Usuario';

export const api = axios.create({
  baseURL: 'https://crud-as-task2.onrender.com'
});


// --- Serviço de Categorias ---
export const categoriaService = {
  // GET /categoria/all [cite: 49]
  getAll: () => api.get<Categoria[]>('/categoria/all'),

  // GET /categoria/:id [cite: 56]
  getById: (id: number) => api.get<Categoria>(`/categoria/${id}`),

  // GET /categoria/descricao/:descricao [cite: 79]
  getByDescricao: (descricao: string) => api.get<Categoria>(`/categoria/descricao/${descricao}`),

  // POST /categoria/cadastrar [cite: 43]
  create: (data: CreateCategoriaDTO) => api.post<Categoria>('/categoria/cadastrar', data),

  // PUT /categoria/atualizar [cite: 63]
  update: (data: UpdateCategoriaDTO) => api.put<Categoria>('/categoria/atualizar', data),

  // DELETE /categoria/:id [cite: 71]
  delete: (id: number) => api.delete(`/categoria/${id}`)
};

// --- Serviço de Alimentação (Produtos) ---
export const alimentacaoService = {
  // GET /alimentacao/all [cite: 48]
  getAll: () => api.get<Produto[]>('/alimentacao/all'),

  // GET /alimentacao/:id [cite: 55]
  getById: (id: number) => api.get<Produto>(`/alimentacao/${id}`),

  // GET /alimentacao/nome/:nome [cite: 78]
  getByNome: (nome: string) => api.get<Produto>(`/alimentacao/nome/${nome}`),

  // POST /alimentacao/cadastrar [cite: 42]
  create: (data: CreateProdutoDTO) => api.post<Produto>('/alimentacao/cadastrar', data),

  // PUT /alimentacao/atualizar [cite: 62]
  update: (data: UpdateProdutoDTO) => api.put<Produto>('/alimentacao/atualizar', data),

  // DELETE /alimentacao/:id [cite: 70]
  delete: (id: number) => api.delete(`/alimentacao/${id}`),

  // GET /alimentacao/recomendacao/:id (Funcionalidade Especial) [cite: 84]
  getRecomendacao: (id: number) => api.get<Produto[]>(`/alimentacao/recomendacao/${id}`)
};

// --- Serviço de Usuários (Opcional, caso precise no futuro) ---
export const usuarioService = {
  getAll: () => api.get<Usuario[]>('/usuarios/all'), // [cite: 50]
  getById: (id: number) => api.get<Usuario>(`/usuarios/${id}`), // [cite: 57]
  create: (data: Omit<Usuario, 'id'>) => api.post<Usuario>('/usuarios/cadastrar', data), // [cite: 44]
  update: (data: Usuario) => api.put<Usuario>('/usuarios/atualizar', data), // [cite: 64]
  delete: (id: number) => api.delete(`/usuarios/${id}`) // [cite: 72]
};