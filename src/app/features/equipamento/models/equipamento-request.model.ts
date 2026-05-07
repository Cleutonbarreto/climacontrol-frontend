export interface EquipamentoRequest {
  tipo: string;
  capacidade?: number;
  modelo?: string;
  marca?: string;
  clienteId: number;
}