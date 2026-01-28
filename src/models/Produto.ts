import type { Categoria } from './Categoria'; 
import type { Usuario } from './Usuario';
 

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  ingredientes: string;
  calorias: number;
  descricao: string;
  foto?: string;
  categoria?: Categoria | null;
  usuario?: Usuario | null;
}