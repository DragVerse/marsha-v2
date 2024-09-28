"use client";

import { getProfile, getPublication } from "@dragverse/generic";
import type { AnyPublication } from "@dragverse/lens";
import { useSuspenseQuery } from "@tanstack/react-query";
import { notFound, useParams } from "next/navigation";

import { publicationQuery } from "../queries";

export const Publication = () => {
  const { pubId, handle } = useParams<{ handle: string; pubId: string }>();

  const { data } = useSuspenseQuery(publicationQuery(pubId));

  if (!data.publication) {
    return notFound();
  }

  const publication = getPublication(data.publication as AnyPublication);
  const profile = getProfile(publication.by);

  if (profile.slug !== handle) {
    return notFound();
  }

  return <div>{publication.id}</div>;
};
