export interface EquipamentoResponse {
  id: number;
  tipo: string;
  capacidade?: number;
  modelo?: string;
  marca?: string;
  clienteId: number;

  // opcional (se backend já retornar)
  clienteNome?: string;
}