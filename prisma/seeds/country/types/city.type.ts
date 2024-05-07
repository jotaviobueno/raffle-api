export interface City {
  id: number;
  nome: string;
  microrregiao: Microrregiao;
}

interface Microrregiao {
  id: number;
  nome: string;
  mesorregiao: Mesorregiao;
}

interface Mesorregiao {
  id: number;
  nome: string;
  UF: Uf;
}

interface Uf {
  id: number;
  sigla: string;
  nome: string;
  regiao: Regiao;
}

interface Regiao {
  id: number;
  sigla: string;
  nome: string;
}
