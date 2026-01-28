import type { Categoria } from "./Categoria";
import type { Usuario } from "./Usuario";

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  ingredientes: string;
  calorias: number;
  categoria?: Categoria;
  usuario?: Usuario;
}