export interface RelatorioBemEstar {
  id: number;
  data: string;
  nivelEnergia: number;
  quantidadePausas: number;
  nivelEstresse: number;
  descricao: string;
}

export interface RelatorioProdutividade {
  id: number;
  data: string;
  horasTrabalhadas: number;
  qntdDiasPresenciais: number;
  qntdDiasRemotos: number;
  descricao: string;
}
