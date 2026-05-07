import { StatusOrdemServico } from "./status-ordens-servico";


export interface OrdemServicoResponse {
  id: number;

  clienteId: number;
  clienteNome?: string;

  equipamentoId: number;
  equipamentoDescricao?: string;

  descricao: string;

  dataAbertura: string;
  dataFechamento?: string;
  dataProximaManutencao?: string;

  status: StatusOrdemServico;
}