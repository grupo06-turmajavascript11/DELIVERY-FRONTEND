import type { Categoria } from './Categoria'; 
import type { Empresa } from './Empresa';
 

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  ingredientes: string;
  calorias: number;
  descricao: string;
  foto?: string;
  categoria?: Categoria | null;
  empresa?: Empresa | null;
}