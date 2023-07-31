import { useEffect, useState } from 'react';
import { pokemonWithPower$ } from './store';

import React from 'react';

export const Search = () => {
  const [search, setSearch] = useState('');
  return (
    <div>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

function App() {
  useEffect(() => {
    pokemonWithPower$.subscribe(console.log);
  }, []);

  return (
    <>
      <Search />
    </>
  );
}

export default App;
