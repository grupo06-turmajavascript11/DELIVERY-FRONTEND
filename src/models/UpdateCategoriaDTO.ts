import type { CreateCategoriaDTO } from "./CreateCategoriaDTO";

export interface UpdateCategoriaDTO extends CreateCategoriaDTO {
  id: number;
}