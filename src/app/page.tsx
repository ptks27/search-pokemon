import { Suspense } from "react";
import SearchPage from "./SearchPage";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}
