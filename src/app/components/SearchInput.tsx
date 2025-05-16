"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");

  useEffect(() => {
    const name = searchParams.get("name");
    if (name) {
      setValue(name);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    const params = new URLSearchParams();
    params.set("name", value.trim());
    router.push(`/?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search Pokémon by name"
        className="border px-2 py-1 mr-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-1 rounded"
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;
