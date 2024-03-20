export interface Country {
  id: Id;
  nome: string;
  'regiao-intermediaria': RegiaoIntermediaria;
  'sub-regiao': SubRegiao;
}

interface Id {
  M49: number;
  'ISO-ALPHA-2': string;
  'ISO-ALPHA-3': string;
}

interface RegiaoIntermediaria {
  id: Id2;
  nome: string;
}

interface Id2 {
  M49: number;
}

interface SubRegiao {
  id: Id3;
  nome: string;
  regiao: Regiao;
}

interface Id3 {
  M49: number;
}

interface Regiao {
  id: Id4;
  nome: string;
}

interface Id4 {
  M49: number;
}
