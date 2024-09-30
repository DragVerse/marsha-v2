import {
  getProfile,
  getProfilePicture,
  getPublicationData
} from "@dragverse/generic";
import type { PrimaryPublication } from "@dragverse/lens";
import type { FC } from "react";
import HoverableProfile from "../Common/HoverableProfile";
import InterweaveContent from "../Common/InterweaveContent";
import PublicationActions from "../Common/Publication/PublicationActions";
import PublicationComments from "../Common/Publication/PublicationComments";

type Props = {
  audio: PrimaryPublication;
};

const Details: FC<Props> = ({ audio }) => {
  const metadata = getPublicationData(audio.metadata);

  return (
    <div className="px-4 py-10 lg:px-0">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="col-span-8">
          <h1 className="font-bold laptop:text-2xl text-xl">Artist</h1>
          <div className="mt-2 inline-block">
            <HoverableProfile
              profile={audio.by}
              pfp={
                <img
                  src={getProfilePicture(audio.by, "AVATAR")}
                  className="size-7 rounded-full"
                  draggable={false}
                  alt={getProfile(audio.by)?.displayName}
                />
              }
            />
          </div>
          {metadata?.content && (
            <div className="mt-6">
              <h1 className="font-bold laptop:text-2xl text-xl">Description</h1>
              <div className="mt-2">
                <InterweaveContent content={metadata?.content} />
              </div>
            </div>
          )}
        </div>
        <div className="col-span-4">
          <PublicationActions publication={audio} />
        </div>
      </div>
      <div className="mt-6">
        <PublicationComments publication={audio} />
      </div>
    </div>
  );
};

export default Details;
