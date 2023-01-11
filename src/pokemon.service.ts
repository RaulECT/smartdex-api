import { Injectable } from '@nestjs/common';
import { PokemonIn } from './interfaces/pokemon';

import { getPokemonGeneralInfo } from './poke-utils/pokeservices';

@Injectable()
export class PokemonService {
  async findOne(pokemon: string): Promise<PokemonIn> {
    const pokemonData = await getPokemonGeneralInfo(pokemon);

    return pokemonData;
  }
}
