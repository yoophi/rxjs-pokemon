import { useObservableState } from 'observable-hooks';
import { useEffect, useMemo, useState } from 'react';
import { PokemonProvider, usePokemon } from './store';

export const Search = () => {
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

const Deck = () => {
  const { deck$ } = usePokemon();
  const deck = useObservableState(deck$, []);
  return (
    <div>
      <h3>Deck</h3>
      <div>
        {deck.map((p) => (
          <div key={p.id}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
              alt={p.name}
            />
            <div>{p.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const { pokemon$ } = usePokemon();
  useEffect(() => {
    pokemon$.subscribe(console.log);
  }, []);

  return (
    <PokemonProvider>
      <div className='flex two demo'>
        <div>
          <Search />
        </div>
        <div>
          <Deck />
        </div>
      </div>
    </PokemonProvider>
  );
}

export default App;
