import { useObservableState } from 'observable-hooks';
import { useMemo } from 'react';
import { BehaviorSubject, combineLatestWith, map } from 'rxjs';
import { Pokemon, usePokemon } from './store';

export function Search() {
  const { pokemon$, selected$ } = usePokemon();
  const search$ = useMemo(() => new BehaviorSubject(''), []);

  const [filteredPokemon] = useObservableState(
    () =>
      pokemon$.pipe(
        combineLatestWith(search$),
        map(([pokemon, search]) =>
          pokemon.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
          )
        )
      ),
    []
  );

  return (
    <div>
      <input
        type='text'
        value={search$.value}
        onChange={(e) => search$.next(e.target.value)}
      />
      <div>
        {filteredPokemon.map((p: Pokemon) => (
          <div key={p.name}>
            <label>
              <input
                type='checkbox'
                checked={p.selected}
                onChange={() => {
                  if (selected$.value.includes(p.id)) {
                    selected$.next(selected$.value.filter((id) => id !== p.id));
                  } else {
                    selected$.next([...selected$.value, p.id]);
                  }
                }}
              />
              <span className='checkable'>
                <strong>{p.name}</strong>- {p.power}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
