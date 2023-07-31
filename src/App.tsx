import { useEffect, useMemo, useState } from 'react';
import { Pokemon, selected$, pokemon$ } from './store';

export const Search = () => {
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const sub = pokemon$.subscribe(setPokemon);
    return () => sub.unsubscribe();
  }, []);

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
        {filteredPokemon.map((p) => (
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
};

function App() {
  useEffect(() => {
    pokemon$.subscribe(console.log);
  }, []);

  return (
    <>
      <div className='flex two demo'>
        <div>
          <Search />
        </div>
        <div>
          <span>2</span>
        </div>
      </div>
    </>
  );
}

export default App;
