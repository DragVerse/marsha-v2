import {
  getLennyPicture,
  getProfile,
  getProfilePicture
} from "@dragverse/generic";
import type { PrimaryPublication } from "@dragverse/lens";
import { CollectOutline, MirrorOutline, Modal } from "@dragverse/ui";
import { type FC, useState } from "react";
import CollectorsList from "../Common/CollectorsList";
import HoverableProfile from "../Common/HoverableProfile";
import MirroredList from "../Common/MirroredList";

type Props = {
  video: PrimaryPublication;
};

const VideoMeta: FC<Props> = ({ video }) => {
  const [showCollectsModal, setShowCollectsModal] = useState(false);
  const [showMirrorsModal, setShowMirrorsModal] = useState(false);

  return (
    <div className="mt-2 flex flex-wrap items-center">
      <HoverableProfile
        profile={video.by}
        pfp={
          <img
            src={getProfilePicture(video.by, "AVATAR")}
            className="size-5 rounded-full"
            draggable={false}
            alt={getProfile(video.by)?.displayName}
            onError={({ currentTarget }) => {
              currentTarget.src = getLennyPicture(video.by?.id);
            }}
          />
        }
      />
      <span className="middot px-1" />
      <div className="flex items-center">
        <Modal
          size="sm"
          title="Collectors"
          show={showCollectsModal}
          setShow={(b) => setShowCollectsModal(b)}
        >
          <div className="no-scrollbar max-h-[70vh] overflow-y-auto">
            <CollectorsList videoId={video.id} />
          </div>
        </Modal>
        <Modal
          size="sm"
          title="Mirrors"
          show={showMirrorsModal}
          setShow={(b) => setShowMirrorsModal(b)}
        >
          <div className="no-scrollbar max-h-[70vh] overflow-y-auto">
            <MirroredList videoId={video.id} />
          </div>
        </Modal>
        <button
          type="button"
          onClick={() => setShowCollectsModal(true)}
          className="flex items-center space-x-1 outline-none"
        >
          <CollectOutline className="size-4" />
          <span>{video.stats?.countOpenActions} collects</span>
        </button>
        <span className="middot px-1" />
        <button
          type="button"
          onClick={() => setShowMirrorsModal(true)}
          className="flex items-center space-x-1 outline-none"
        >
          <MirrorOutline className="size-4" />
          <span>{video.stats?.mirrors} mirrors</span>
        </button>
      </div>
    </div>
  );
};

export default VideoMeta;
