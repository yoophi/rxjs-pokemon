import { useEffect } from 'react';
import { PokemonProvider, usePokemon } from './store';
import { Search } from './Search';
import { Deck } from './Deck';

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
