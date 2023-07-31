import { useEffect } from 'react';
import { pokemonWithPower$ } from './store';

function App() {
  useEffect(() => {
    pokemonWithPower$.subscribe(console.log);
  }, []);

  return (
    <>
      <h1>hello, world!</h1>
    </>
  );
}

export default App;
