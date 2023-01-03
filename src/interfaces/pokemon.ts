interface PokemonAbilitiesIn {
  name: string;
  is_hidden: boolean;
}

export interface PokemonStatIn {
  base_stat: number;
  stat: string;
  effort: number;
}

type PokemonSpritesIn = {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
};

export interface PokemonIn {
  name: string;
  stats: [PokemonStatIn];
  types: [string];
  abilities: [PokemonAbilitiesIn];
  sugested_nature?: string[];
  damage_relation?: DamageRelationFormattedIn[];
  sprites: PokemonSpritesIn;
}

type DamageIn = {
  _id: string;
};

export type DamageRelationIn = {
  double_damage_from: DamageIn[];
  double_damage_to: DamageIn[];
  half_damage_from: DamageIn[];
  half_damage_to: DamageIn[];
  no_damage_from: DamageIn[];
  no_damage_to: DamageIn[];
};

export type DamageRelationFormattedIn = {
  double_damage_from: string[];
  double_damage_to: string[];
  half_damage_from: string[];
  half_damage_to: string[];
  no_damage_from: string[];
  no_damage_to: string[];
};
