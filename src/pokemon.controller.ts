import { Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonIn } from './interfaces/pokemon';

@Controller('pokemon')
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  @Get(':pokemon')
  getPokemon(@Param('pokemon') pokemon: string): Promise<PokemonIn> {
    return this.pokemonService.findOne(pokemon);
  }
}
