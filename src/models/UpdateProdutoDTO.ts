import type { CreateProdutoDTO } from "./CreateProdutoDTO";

export interface UpdateProdutoDTO extends CreateProdutoDTO {
  id: number;
}