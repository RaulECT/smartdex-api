import { v4 } from 'uuid';
import * as fs from 'fs';

import axios from '../configs/axios';
import { ExternalNaturesI } from '../interfaces/req-params';
import { PokemonStatIn } from '../interfaces/pokemon';
import { sort, compareByStats } from '../utils/sort';
import PokemonNatures from '../data/pokemon-natures.json';

export async function getAllNatures() {
  const natures: ExternalNaturesI[] = await fetchNatures();
  const naturesData = natures.map((nat) => ({
    _id: v4(),
    name: nat.name,
    increased_stat: nat.increased_stat,
    decreased_stat: nat.decreased_stat,
  }));
  const dataStringfied = JSON.stringify({ natures: naturesData }, null, 2);

  fs.writeFileSync('./src/data/pokemon-natures.json', dataStringfied);
  console.table(naturesData);
}

async function fetchNatures(
  url = 'https://pokeapi.co/api/v2/nature',
  memoNatures = [],
) {
  try {
    const { data } = await axios.get(url);
    const newNatures = [...memoNatures, ...data.results];
    const naturesUpdated = newNatures.map(async (nature) => {
      const statsNature = await fetchNatureStats(nature.url);
      return { ...nature, ...statsNature };
    });
    const memoNaturesUpdated = await Promise.all(naturesUpdated);

    if (!data.next) {
      return memoNaturesUpdated;
    }

    return fetchNatures(data.next, memoNaturesUpdated);
  } catch (error) {
    console.log('[error]', error);
    return memoNatures;
  }
}

async function fetchNatureStats(natureUtl: string) {
  try {
    const { data } = await axios.get(natureUtl);

    return {
      decreased_stat: data.decreased_stat?.name || null,
      increased_stat: data.increased_stat?.name || null,
    };
  } catch (error) {
    console.log('[error]', error);
    return {};
  }
}

export function sugestPokemonNatures(pokemonStats: PokemonStatIn[]): string[] {
  const pokemonStatsSorted: PokemonStatIn[] = sort(
    pokemonStats,
    compareByStats,
  );
  const statsCombination = [
    {
      decreased_stat: pokemonStatsSorted[0].stat,
      increased_stat: pokemonStatsSorted[5].stat,
    },
    {
      decreased_stat: pokemonStatsSorted[0].stat,
      increased_stat: pokemonStatsSorted[4].stat,
    },
  ];
  const natureSugested = statsCombination.map((combination) => {
    const nature = PokemonNatures.natures.find(
      (nature) =>
        nature.decreased_stat === combination.decreased_stat &&
        nature.increased_stat === combination.increased_stat,
    );
    return nature.name;
  });

  return natureSugested;
}
