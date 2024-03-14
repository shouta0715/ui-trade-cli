import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { throwHttpErrorFromStatus } from "@/client/libs/errors";
import { AsideUI } from "@/client/types";

async function getUIList({ limit, offset }: { limit: number; offset: number }) {
  const response = await fetch(`/api/ui?limit=${limit}&offset=${offset}`);

  if (!response.ok) throwHttpErrorFromStatus(response.status);

  const data = await response.json();

  return data as {
    items: AsideUI[];
    hasMore: boolean;
  };
}

export function useQueryUIList() {
  const { isPending, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ["ui-list"],
      queryFn: ({ pageParam }) => getUIList({ ...pageParam }),
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
    isPending: isPending || isFetchingNextPage,
    data: items,
    hasNextPage,
    fetchNextPage,
  };
}
