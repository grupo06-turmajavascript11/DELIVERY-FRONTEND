import type { Produto } from "./Produto";

export interface Categoria {
  id: number;
  descricao: string;
  produto?: Produto[] | null;
}