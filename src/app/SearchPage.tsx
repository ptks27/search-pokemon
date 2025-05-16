"use client";

import { ApolloProvider } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import client from "./lib/apolloClient";
import SearchInput from "./components/SearchInput";
import PokemonResult from "./components/PokemonResult";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";

  return (
    <ApolloProvider client={client}>
      <main className="max-w-2xl mx-auto mt-10">
        <SearchInput />
        {name && <PokemonResult name={name} />}
      </main>
    </ApolloProvider>
  );
}
