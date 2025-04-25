export interface AccountInfo {
    number: string;
    pushname: string;
    platform: string;
  }

export interface Empresa {
    id: number;
    nome: string;
    endereco: string;
    instagram: string;
  }
 export   interface Corretor {
    id: number;
    nome: string;
    contato: string;
    email: string;
  }

export interface Contact {
    id: number;
    number: string;
    name: string;
    createdAt: string;
  }

export interface Message {
    id: string;
    from: string;
    to: string;
    direction: string;
    body: string;
    createdAt: string;
}