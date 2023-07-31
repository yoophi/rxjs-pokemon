import { BehaviorSubject, combineLatest, combineLatestWith, map } from 'rxjs';

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
  selected?: boolean;
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

export const selected$ = new BehaviorSubject<number[]>([]);

export const pokemon$ = pokemonWithPower$.pipe(
  combineLatestWith(selected$),
  map(([pokemon, selected]) =>
    pokemon.map((p) => ({ ...p, selected: selected.includes(p.id) }))
  )
);

fetch('/pokemon-simplified.json')
  .then((res) => res.json())
  .then((data) => rawPokemon$.next(data));
