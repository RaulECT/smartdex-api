interface PokemonAbilitiesIn {
  name: string,
  is_hidden: boolean
}

export interface PokemonStatIn {
  base_stat: number,
  stat: string,
  effort: number
}

export interface PokemonIn {
  name: string,
  stats: [PokemonStatIn],
  types: [string],
  abilities: [PokemonAbilitiesIn],
  sugested_nature?: string[],
  damage_relation?: DamageRelationFormattedIn[]
}

type DamageIn = {
  _id: string
}

export type DamageRelationIn = {
  double_damage_from: DamageIn[],
  double_damage_to: DamageIn[],
  half_damage_from: DamageIn[],
  half_damage_to: DamageIn[],
  no_damage_from: DamageIn[],
  no_damage_to: DamageIn[]
}

export type DamageRelationFormattedIn = {
  double_damage_from: string[],
  double_damage_to: string[],
  half_damage_from: string[],
  half_damage_to: string[],
  no_damage_from: string[],
  no_damage_to: string[]
}
