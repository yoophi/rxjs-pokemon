import { useEffect } from 'react';
import { rawPokemon$ } from './store';

function App() {
  useEffect(() => {
    rawPokemon$.subscribe(console.log);
  }, []);

  return (
    <>
      <h1>hello, world!</h1>
    </>
  );
}

export default App;
