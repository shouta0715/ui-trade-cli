import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { throwHttpErrorFromStatus } from "@/client/libs/errors";
import { UISchema } from "@/schema";

async function getUIList({ limit, offset }: { limit: number; offset: number }) {
  const response = await fetch(`/api/ui?limit=${limit}&offset=${offset}`);

  if (!response.ok) throwHttpErrorFromStatus(response.status);

  const data = await response.json();

  return data as {
    items: Pick<UISchema, "title"> & { slug: string }[];
    hasMore: boolean;
  };
}

export function useQueryUIList() {
  const [query, setQuery] = useState({
    limit: 10,
    offset: 0,
  });

  const { isPending, data } = useSuspenseInfiniteQuery({
    queryKey: ["ui-list"],
    queryFn: () => getUIList({ ...query }),
    initialPageParam: { limit: 10, offset: 0 },
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (!lastPage.hasMore) return undefined;

      return {
        limit: 10,
        offset: lastPageParam.offset + 10,
      };
    },
  });

  const items = useMemo(() => {
    if (!data.pages) return [];

    return data.pages.flatMap((page) => page.items);
  }, [data.pages]);

  return {
    isPending,
    data: items,
    setQuery,
    query,
  };
}
