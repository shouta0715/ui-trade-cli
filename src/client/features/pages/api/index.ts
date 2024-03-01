import { useSuspenseQuery } from "@tanstack/react-query";

async function getUIList({ limit, offset }: { limit: number; offset: number }) {
  const response = await fetch(`/api/ui-list?limit=${limit}&offset=${offset}`);
  const data = await response.json();

  return data;
}

export function useQueryUIList() {
  const { isPending, data } = useSuspenseQuery({
    queryKey: ["ui-list"],
    queryFn: () => getUIList({ limit: 10, offset: 0 }),
  });

  return {
    isPending,
    data,
  };
}
