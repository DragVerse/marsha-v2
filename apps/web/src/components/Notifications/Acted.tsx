import {
  getLennyPicture,
  getProfile,
  getProfilePicture,
  getPublication,
  getPublicationData
} from "@dragverse/generic";
import type {
  ActedNotification,
  OpenActionProfileActed
} from "@dragverse/lens";
import { CollectOutline } from "@dragverse/ui";
import Link from "next/link";
import type { FC } from "react";
import HoverableProfile from "../Common/HoverableProfile";

type Props = {
  notification: ActedNotification;
};

const Acted: FC<Props> = ({ notification: { publication, actions } }) => {
  const targetPublication = getPublication(publication);

  return (
    <span className="flex space-x-4">
      <div className="p-1">
        <CollectOutline className="size-5" />
      </div>
      <div>
        <span className="-space-x-1.5 flex">
          {actions.slice(0, 30).map(({ by }: OpenActionProfileActed) => (
            <HoverableProfile profile={by} key={by?.id}>
              <img
                className="size-7 rounded-full border dark:border-gray-700/80"
                src={getProfilePicture(by, "AVATAR")}
                draggable={false}
                alt={getProfile(by)?.slug}
                onError={({ currentTarget }) => {
                  currentTarget.src = getLennyPicture(by?.id);
                }}
              />
            </HoverableProfile>
          ))}
        </span>
        <div className="py-2">acted on your publication</div>
        <Link
          href={`/watch/${publication.id}`}
          className="line-clamp-2 font-medium text-dust"
        >
          {getPublicationData(targetPublication.metadata)?.content}
        </Link>
      </div>
    </span>
  );
};

export default Acted;
