import React from "react";
import { useQueryUIList } from "@/client/features/pages/api";

export function Home() {
  const { data } = useQueryUIList();

  return <div>index</div>;
}
