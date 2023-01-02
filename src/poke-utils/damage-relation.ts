import DamageRelations from "../data/damage-relations.json";
import PokemonTypes from "../data/pokemon-types.json";
import { DamageRelationIn, DamageRelationFormattedIn } from "../interfaces/pokemon";

export function getDamageRelationByTypes(types: string[]) {
  const dataDamageRelation = types.map(type => {
    const typeData = PokemonTypes.types.find(t => t.name === type);
    const damageRelation = DamageRelations.damage_relation[typeData._id];
    return damageRelation;
  })
  return formatDamageRelation(dataDamageRelation);
};

function formatDamageRelation(damageRelation: DamageRelationIn[]): DamageRelationFormattedIn[] {
  const format: DamageRelationFormattedIn[] = damageRelation.map((dmg) => {
    const doubleDamageFrom = dmg.double_damage_from.map(d => PokemonTypes.types.find(t => t._id === d._id).name)
    const doubleDamageTo = dmg.double_damage_to.map(d => PokemonTypes.types.find(t => t._id === d._id).name)
    const halfDamageFrom = dmg.half_damage_from.map(d => PokemonTypes.types.find(t => t._id === d._id).name)
    const halfDamageTo = dmg.half_damage_to.map(d => PokemonTypes.types.find(t => t._id === d._id).name)
    const noDamageFrom = dmg.no_damage_from.map(d => PokemonTypes.types.find(t => t._id === d._id).name)
    const noDamageTo = dmg.no_damage_to.map(d => PokemonTypes.types.find(t => t._id === d._id).name)

    return {
      double_damage_from: doubleDamageFrom,
      double_damage_to: doubleDamageTo,
      half_damage_from: halfDamageFrom,
      half_damage_to: halfDamageTo,
      no_damage_from: noDamageFrom,
      no_damage_to: noDamageTo,
    }
  });

  return format;
}
