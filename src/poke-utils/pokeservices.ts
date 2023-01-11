import { uuid } from 'uuidv4';
import * as fs from 'fs';

import axios from '../configs/axios';
import { PokemonIn } from '../interfaces/pokemon';
import PokemonTypesFile from '../data/pokemon-types.json';
import { sugestPokemonNatures } from './natures';
import { getDamageRelationByTypes } from './damage-relation';

export async function getPokemonGeneralInfo(pokemon: string) {
  try {
    const result = await axios.get(`pokemon/${pokemon}`);
    const pokemonResult = result.data;

    const name = pokemonResult.name;
    const stats = pokemonResult.stats.map(({ base_stat, effort, stat }) => ({
      base_stat: base_stat,
      stat: stat.name,
      effort: effort,
    }));
    const types = pokemonResult.types.map(({ type }) => type.name);
    const abilities = pokemonResult.abilities.map(({ ability, is_hidden }) => ({
      name: ability.name,
      is_hidden,
    }));
    const sugestedNatures = sugestPokemonNatures(stats);
    const damageRelation = getDamageRelationByTypes(types);
    const sprites = pokemonResult.sprites;

    const pokemonInfo: PokemonIn = {
      name,
      stats,
      types,
      abilities,
      sprites,
      sugested_nature: sugestedNatures,
      damage_relation: damageRelation,
    };

    return pokemonInfo;
  } catch (error) {
    console.log('[error]', error);
  }
}

export async function getAllStats() {
  try {
    const data = await axios.get('stat');
    console.log('[data]', data.data);
  } catch (error) {
    console.log('[error]', error);
  }
}

export async function getAllTypes() {
  try {
    const response = await axios.get('type');
    const pokemonTypes = response.data.results.map((data) => ({
      _id: uuid(),
      name: data.name,
    }));
    const dataStringfied = JSON.stringify({ types: pokemonTypes }, null, 2);

    fs.writeFileSync('./src/data/pokemon-types.json', dataStringfied);
    console.log(pokemonTypes);
  } catch (error) {
    console.log('[error]', error);
  }
}

export async function getAllDamageRelation() {
  const test = {};

  for (const type of PokemonTypesFile.types) {
    const typeDamageRelation = await getTypeDamageRelation(type.name);
    test[type._id] = typeDamageRelation;
  }

  const dataStringfied = JSON.stringify({ damage_relation: test }, null, 2);

  fs.writeFileSync('./src/data/damage-relations.json', dataStringfied);
}

async function getTypeDamageRelation(name: string) {
  try {
    const response = await axios.get(`type/${name}`);
    const damageRelationFormated = formatDamageRelation(
      response.data.damage_relations,
    );

    return damageRelationFormated;
  } catch (error) {
    console.log('[error]', error);
  }
}

function formatDamageRelation(damageRelation) {
  const data = { ...damageRelation };
  const keys = Object.keys(data);

  keys.forEach((key) => {
    data[key] = data[key].map((type) => ({
      _id: findTypeByName(type.name)._id,
    }));
  });

  return data;
}

function findTypeByName(name: string) {
  return PokemonTypesFile.types.find((type) => type.name === name);
}
