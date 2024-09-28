import { getShortHandTime } from "@/lib/formatTime";
import {
  getLennyPicture,
  getProfile,
  getProfilePicture,
  getPublicationData
} from "@dragverse/generic";
import type { MentionNotification } from "@dragverse/lens";
import { MentionOutline } from "@dragverse/ui";
import Link from "next/link";
import type { FC } from "react";
import HoverableProfile from "../Common/HoverableProfile";

type Props = {
  notification: MentionNotification;
};

const Mentioned: FC<Props> = ({ notification: { publication } }) => {
  const videoId =
    publication.__typename === "Comment" ? publication.root.id : publication.id;
  return (
    <div className="flex justify-between">
      <span className="flex space-x-4">
        <div className="p-1">
          <MentionOutline className="size-5" />
        </div>
        <div>
          <span className="-space-x-1.5 flex">
            <HoverableProfile profile={publication.by} key={publication.by?.id}>
              <img
                className="size-7 rounded-full border dark:border-gray-700/80"
                src={getProfilePicture(publication.by, "AVATAR")}
                draggable={false}
                alt={getProfile(publication.by)?.displayName}
                onError={({ currentTarget }) => {
                  currentTarget.src = getLennyPicture(publication.by?.id);
                }}
              />
            </HoverableProfile>
          </span>
          <div className="py-2">mentioned you</div>
          <Link
            href={`/watch/${videoId}`}
            className="line-clamp-2 font-medium text-dust"
          >
            {getPublicationData(publication.metadata)?.content}
          </Link>
        </div>
      </span>
      <span className="text-dust text-sm">
        {getShortHandTime(publication.createdAt)}
      </span>
    </div>
  );
};

export default Mentioned;
