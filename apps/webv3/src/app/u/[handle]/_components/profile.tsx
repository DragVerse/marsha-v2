"use client";

import { LENS_NAMESPACE_PREFIX } from "@dragverse/constants";
import type { Profile as ProfileType } from "@dragverse/lens/gql";
import { useSuspenseQuery } from "@tanstack/react-query";
import { notFound, useParams } from "next/navigation";

import { profileQuery } from "../queries";

export const Profile = () => {
  const { handle } = useParams<{ handle: string }>();

  const { data } = useSuspenseQuery(
    profileQuery(`${LENS_NAMESPACE_PREFIX}${handle}`)
  );

  if (!data.profile) {
    return notFound();
  }
  const profile = data.profile as ProfileType;

  return <div>{profile.handle?.fullHandle}</div>;
};
