import { StatusOrdemServico } from "./status-ordens-servico";

export interface OrdemServicoRequest {
  clienteId: number;
  equipamentoId: number;
  descricao: string;
  dataAbertura: string;
  dataFechamento?: string;
  dataProximaManutencao?: string;
  status: StatusOrdemServico;
}