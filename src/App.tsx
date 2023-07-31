import { useEffect, useMemo, useState } from 'react';
import { Pokemon, pokemonWithPower$ } from './store';

export const Search = () => {
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    pokemonWithPower$.subscribe(setPokemon);
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
            <strong>{p.name}</strong>- {p.power}
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  useEffect(() => {
    pokemonWithPower$.subscribe(console.log);
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
