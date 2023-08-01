import { useObservableState } from 'observable-hooks';
import { Pokemon, usePokemon } from './store';

export function Deck() {
  const { deck$ } = usePokemon();
  const deck = useObservableState(deck$, []);
  return (
    <div>
      <h3>Deck</h3>
      <div>
        {deck.map((p: Pokemon) => (
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
}
