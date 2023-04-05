export enum CLASS_TYPE {
  FULL_TIME = "full-time",
  NIGHT_CLASS = "night-class",
}

export type Class = {
  id: number;
  nome: string;
  data_inicio: string;
  data_fim: string;
  modulo: number;
  tipo: CLASS_TYPE;
};
