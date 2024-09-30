"use client";

import { getPublication } from "@dragverse/generic";
import type { AnyPublication } from "@dragverse/lens";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { TapeLink } from "@/components/shared/link";
import { Virtualized } from "@/components/shared/virtualized";

import { publicationsQuery } from "./queries";

export const Feed = () => {
  const { data, fetchNextPage, isLoading, hasNextPage } =
    useSuspenseInfiniteQuery(publicationsQuery);

  const allPublications = data?.pages.flatMap(
    (page) => page.publications.items
  ) as AnyPublication[];

  return (
    <div className="w-full">
      {isLoading && <div>Loading...</div>}
      <div className="divide-y divide-gray-400">
        <Virtualized
          restoreScroll
          data={allPublications}
          endReached={fetchNextPage}
          hasNextPage={hasNextPage}
          itemContent={(_index, anyPublication) => {
            const publication = getPublication(anyPublication);
            return (
              <div className="p-5">
                <TapeLink href={`/watch/${publication.id}`}>
                  {publication.metadata.content}
                </TapeLink>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};