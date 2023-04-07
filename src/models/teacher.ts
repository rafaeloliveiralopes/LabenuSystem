export enum SPECIALITY {
    REACT = 1,
    REDUX = 2,
    CSS = 3,
    TESTES = 4,
    TYPESCRIPT = 5,
    POO = 6,
    BACKEND = 7
}

export type Teacher = {
    id: number,
    nome: string,
    email: string,
    data_nasc: string,
    especialidades: SPECIALITY[],
    turma_id: number
}