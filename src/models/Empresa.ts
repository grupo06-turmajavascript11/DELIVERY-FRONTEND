import type { Produto } from './Produto';

export interface Empresa {
  id: number;
  nome: string;
  cnpj?: string; // Opcional
  foto?: string;
  produto?: Produto[] | null; // Uma empresa tem vários produtos
}