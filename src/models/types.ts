export enum CLASS_TYPE {
  INTEGRAL = "integral",
  NOTURNO = "noturno",
};

export type Class = {
  id: number,
  nome: string,
  data_inicio: string,
  data_fim: string,
  modulo: number,
  tipo: CLASS_TYPE
};
