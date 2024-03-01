import React from "react";
import { useQueryUIList } from "@/client/features/pages/api";

export function Home() {
  const {} = useQueryUIList();

  return <div>index</div>;
}
