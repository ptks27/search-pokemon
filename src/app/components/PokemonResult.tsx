import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

export const GET_POKEMON = gql`
  query Pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      name
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        name
      }
    }
  }
`;

type Attack = {
  name: string;
  type: string;
  damage: number;
};

type Pokemon = {
  id: string;
  name: string;
  attacks: {
    fast: Attack[];
    special: Attack[];
  };
  evolutions?: { id: string; name: string }[];
};

const PokemonResult = ({ id, name }: { id?: string; name?: string }) => {
  const shouldSkip = !id && !name;

  const { data, loading, error } = useQuery<{ pokemon: Pokemon }>(GET_POKEMON, {
    variables: { id, name },
    skip: shouldSkip,
  });

  if (loading) return <p>Loading...</p>;
  if (error || !data?.pokemon) return <p>Pokémon not found</p>;

  const { pokemon } = data;

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold">{pokemon.name}</h2>

      <div className="mb-2">
        <h3 className="font-semibold">Attacks</h3>
        <strong>Fast:</strong>
        <ul>
          {pokemon.attacks.fast.map((atk, idx) => (
            <li key={idx}>
              {atk.name} - {atk.type} - {atk.damage}
            </li>
          ))}
        </ul>
        <strong>Special:</strong>
        <ul>
          {pokemon.attacks.special.map((atk, idx) => (
            <li key={idx}>
              {atk.name} - {atk.type} - {atk.damage}
            </li>
          ))}
        </ul>
      </div>

      {pokemon.evolutions && pokemon.evolutions.length > 0 && (
        <div>
          <h3 className="font-semibold">Evolutions</h3>
          <ul>
            {pokemon.evolutions.map((evo) => (
              <li key={evo.id}>
                <Link
                  href={`/?name=${encodeURIComponent(evo.name)}`}
                  className="text-blue-600 hover:underline"
                >
                  {evo.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonResult;
