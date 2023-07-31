import { BehaviorSubject, map } from 'rxjs';

export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
  power?: number;
}

const rawPokemon$ = new BehaviorSubject<Pokemon[]>([]);

export const pokemonWithPower$ = rawPokemon$.pipe(
  map((pokemon) =>
    pokemon.map((p) => ({
      ...p,
      power:
        p.hp +
        p.attack +
        p.defense +
        p.special_attack +
        p.special_defense +
        p.speed,
    }))
  )
);

fetch('/pokemon-simplified.json')
  .then((res) => res.json())
  .then((data) => rawPokemon$.next(data));
