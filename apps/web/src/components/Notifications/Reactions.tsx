import {
  getLennyPicture,
  getProfile,
  getProfilePicture,
  getPublicationData
} from "@dragverse/generic";
import type {
  ProfileReactedResult,
  ReactionNotification
} from "@dragverse/lens";
import { HeartOutline } from "@dragverse/ui";
import Link from "next/link";
import type { FC } from "react";
import HoverableProfile from "../Common/HoverableProfile";

type Props = {
  notification: ReactionNotification;
};

const Reactions: FC<Props> = ({ notification: { publication, reactions } }) => {
  return (
    <span className="flex space-x-5">
      <div className="p-1">
        <HeartOutline className="size-5" />
      </div>
      <div>
        <span className="-space-x-1.5 flex">
          {reactions.slice(0, 30).map(({ profile }: ProfileReactedResult) => (
            <HoverableProfile profile={profile} key={profile?.id}>
              <img
                className="size-7 rounded-full border dark:border-gray-700/80"
                src={getProfilePicture(profile, "AVATAR")}
                onError={({ currentTarget }) => {
                  currentTarget.src = getLennyPicture(profile?.id);
                }}
                alt={getProfile(profile)?.displayName}
                draggable={false}
              />
            </HoverableProfile>
          ))}
        </span>
        <div className="py-2">reacted to your publication</div>
        <Link
          href={`/watch/${publication.id}`}
          className="line-clamp-2 font-medium text-dust"
        >
          {getPublicationData(publication.metadata)?.title}
        </Link>
      </div>
    </span>
  );
};

export default Reactions;
