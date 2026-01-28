export interface CreateProdutoDTO {
  nome: string;
  preco: number;
  ingredientes: string;
  calorias: number;
  categoria: { id: number };
  usuario: { id: number };
}