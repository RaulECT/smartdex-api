import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

describe('PokemonController', () => {
  let pokemonController: PokemonController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [PokemonService],
    }).compile();

    pokemonController = app.get<PokemonController>(PokemonController);
  });

  describe('[Pokemon Controller]', () => {
    it('should return pokemon info', async () => {
      const pokemonInfo = await pokemonController.getPokemon('gallade');

      expect(pokemonInfo).not.toBeNull();
    });
  });
});
