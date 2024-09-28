import { getPublicationData } from "@dragverse/generic";
import type { PrimaryPublication } from "@dragverse/lens";
import Link from "next/link";
import type { FC } from "react";

import PublicationOptions from "../Publication/PublicationOptions";
import ThumbnailImage from "../VideoCard/ThumbnailImage";

type Props = {
  audio: PrimaryPublication;
};

const AudioCard: FC<Props> = ({ audio }) => {
  return (
    <div className="dragverse-border group relative overflow-hidden rounded-medium">
      <Link href={`/listen/${audio.id}`}>
        <div className="aspect-[1/1]">
          <ThumbnailImage video={audio} />
        </div>
        <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-black px-4 py-2">
          <h1 className="line-clamp-2 break-all font-bold text-white">
            {getPublicationData(audio.metadata)?.title}
          </h1>
        </div>
        <div className="absolute top-2 right-2">
          <PublicationOptions publication={audio} />
        </div>
      </Link>
    </div>
  );
};

export default AudioCard;
