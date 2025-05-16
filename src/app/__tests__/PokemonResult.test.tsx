/// <reference types="jest" />

import { render, screen, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import PokemonResult, { GET_POKEMON } from "../components/PokemonResult";

const mocks = [
  {
    request: {
      query: GET_POKEMON,
      variables: { name: "Pikachu" },
    },
    result: {
      data: {
        pokemon: {
          id: "025",
          name: "Pikachu",
          attacks: {
            fast: [{ name: "Quick Attack", type: "Normal", damage: 10 }],
            special: [{ name: "Thunderbolt", type: "Electric", damage: 55 }],
          },
          evolutions: [{ id: "026", name: "Raichu" }],
        },
      },
    },
  },
];

const bulbasaurMock = {
  request: {
    query: GET_POKEMON,
    variables: { name: "Bulbasaur" },
  },
  result: {
    data: {
      pokemon: {
        id: "001",
        name: "Bulbasaur",
        attacks: {
          fast: [{ name: "Tackle", type: "Normal", damage: 12 }],
          special: [{ name: "Vine Whip", type: "Grass", damage: 45 }],
        },
        evolutions: [{ id: "002", name: "Ivysaur" }],
      },
    },
  },
};

const charmanderMock = {
  request: {
    query: GET_POKEMON,
    variables: { name: "Charmander" },
  },
  result: {
    data: {
      pokemon: {
        id: "004",
        name: "Charmander",
        attacks: {
          fast: [{ name: "Scratch", type: "Normal", damage: 10 }],
          special: [{ name: "Flamethrower", type: "Fire", damage: 60 }],
        },
        evolutions: [{ id: "005", name: "Charmeleon" }],
      },
    },
  },
};

const squirtleMock = {
  request: {
    query: GET_POKEMON,
    variables: { name: "Squirtle" },
  },
  result: {
    data: {
      pokemon: {
        id: "007",
        name: "Squirtle",
        attacks: {
          fast: [{ name: "Bubble", type: "Water", damage: 12 }],
          special: [{ name: "Aqua Tail", type: "Water", damage: 45 }],
        },
        evolutions: [{ id: "008", name: "Wartortle" }],
      },
    },
  },
};
  

describe("Pokemon types", () => {
  it("Bulbasaur should have Grass type", async () => {
    render(
      <MockedProvider mocks={[bulbasaurMock]} addTypename={false}>
        <PokemonResult name="Bulbasaur" />
      </MockedProvider>
    );

    expect(await screen.findByText("Bulbasaur")).toBeInTheDocument();
    expect(screen.getByText(/Vine Whip - Grass - 45/i)).toBeInTheDocument();
  });

  it("Charmander should have Fire type", async () => {
    render(
      <MockedProvider mocks={[charmanderMock]} addTypename={false}>
        <PokemonResult name="Charmander" />
      </MockedProvider>
    );

    expect(await screen.findByText("Charmander")).toBeInTheDocument();
    expect(screen.getByText(/Flamethrower - Fire - 60/i)).toBeInTheDocument();
  });

  it("Squirtle should have Water type", async () => {
    render(
      <MockedProvider mocks={[squirtleMock]} addTypename={false}>
        <PokemonResult name="Squirtle" />
      </MockedProvider>
    );

    expect(await screen.findByText("Squirtle")).toBeInTheDocument();
    expect(screen.getByText(/Aqua Tail - Water - 45/i)).toBeInTheDocument();
  });
});
  

describe("PokemonResult", () => {
  it("renders loading state initially", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PokemonResult name="Pikachu" />
      </MockedProvider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders Pikachu's data after loading", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PokemonResult name="Pikachu" />
      </MockedProvider>
    );

    await act(async () => {
      expect(await screen.findByText("Pikachu")).toBeInTheDocument();
      expect(
        screen.getByText(/Quick Attack - Normal - 10/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Thunderbolt - Electric - 55/i)
      ).toBeInTheDocument();
      expect(screen.getByText("Raichu")).toBeInTheDocument();
    });
  });

  it("shows not found if no data", async () => {
    const noDataMocks = [
      {
        request: {
          query: GET_POKEMON,
          variables: { name: "Unknown" },
        },
        result: {
          data: {
            pokemon: null,
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={noDataMocks} addTypename={false}>
        <PokemonResult name="Unknown" />
      </MockedProvider>
    );

    const notFoundText = await screen.findByText("Pokémon not found");
    expect(notFoundText).toBeInTheDocument();
  });
});
