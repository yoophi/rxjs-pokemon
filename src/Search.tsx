import { useObservableState } from 'observable-hooks';
import { useMemo, useState } from 'react';
import { Pokemon, usePokemon } from './store';

export function Search() {
  const [search, setSearch] = useState('');
  const { pokemon$, selected$ } = usePokemon();
  const pokemon = useObservableState(pokemon$, []);

  const filteredPokemon = useMemo(() => {
    return pokemon.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [pokemon, search]);

  return (
    <div>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
