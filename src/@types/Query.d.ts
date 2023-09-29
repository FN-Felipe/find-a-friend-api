// interface QueryType {
//   age?: 'Filhote' | 'Adulto' | 'Idoso'
//   stature?: 'Pequenino' | 'Pequeno' | 'Médio' | 'Grande'
//   energy?: 'Baixo' | 'Médio' | 'Alto'
//   ambient?: 'Apartamento' | 'Casa' | 'Local Amplo' | 'Sítio'
// }

export interface QueryProps {
  age?: string
  stature?: string
  energy?: string
  ambient?: string
}
