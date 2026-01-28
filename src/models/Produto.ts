import type { Categoria } from './Categoria'; 
import type { Empresa } from './Empresa'; // Importando a empresa
 

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  foto?: string;
  categoria?: Categoria | null; // Relacionamento com Categoria (Tema)
  empresa?: Empresa | null;     // Relacionamento com Empresa (Usuario)
}