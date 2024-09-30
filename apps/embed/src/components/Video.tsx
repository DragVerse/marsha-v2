"use client";

import { Tower } from "@/tower";
import { tw, useAverageColor } from "@dragverse/browser";
import { LENSTUBE_BYTES_APP_ID } from "@dragverse/constants";
import {
  EVENTS,
  getPublicationMediaUrl,
  getShouldUploadVideo,
  getThumbnailUrl,
  imageCdn,
  sanitizeDStorageUrl
} from "@dragverse/generic";
import type { PrimaryPublication } from "@dragverse/lens/generated";
import { PlayOutline, VideoPlayer } from "@dragverse/ui";
import { useSearchParams } from "next/navigation";
import { type FC, useEffect, useState } from "react";
import TopOverlay from "./TopOverlay";

type Props = {
  video: PrimaryPublication;
};

const Video: FC<Props> = ({ video }) => {
  const [playerRef, setPlayerRef] = useState<HTMLMediaElement>();
  const searchParams = useSearchParams();
  const autoplay = searchParams.get("autoplay");
  const loop = searchParams.get("loop");
  const t = searchParams.get("t") ?? "0";

  const isAutoPlay = Boolean(autoplay) && autoplay === "1";
  const isLoop = Boolean(loop) && loop === "1";
  const currentTime = Number(t);

  const [clicked, setClicked] = useState(isAutoPlay || currentTime !== 0);

  const isBytesVideo = video.publishedOn?.id === LENSTUBE_BYTES_APP_ID;
  const thumbnailUrl = imageCdn(
    sanitizeDStorageUrl(getThumbnailUrl(video.metadata, true)),
    isBytesVideo ? "THUMBNAIL_V" : "THUMBNAIL"
  );
  const { color: backgroundColor } = useAverageColor(
    thumbnailUrl,
    isBytesVideo
  );

  useEffect(() => {
    Tower.track(EVENTS.EMBED_VIDEO.LOADED);
  }, []);

  const refCallback = (ref: HTMLMediaElement) => {
    if (!ref) {
      return null;
    }
    setPlayerRef(ref);
  };

  useEffect(() => {
    if (playerRef && clicked) {
      playerRef.autoplay = true;
      playerRef?.play().catch(() => {});
    }
  }, [playerRef, clicked, isAutoPlay]);

  const onClickOverlay = () => {
    setClicked(true);
  };

  return (
    <div className="group relative h-screen w-screen overflow-x-hidden">
      {clicked ? (
        <VideoPlayer
          pid={video.id}
          refCallback={refCallback}
          url={getPublicationMediaUrl(video.metadata)}
          posterUrl={thumbnailUrl}
          currentTime={currentTime}
          options={{
            autoPlay: isAutoPlay,
            muted: isAutoPlay,
            loop: isLoop,
            loadingSpinner: true,
            isCurrentlyShown: true,
            maxHeight: true
          }}
          shouldUpload={getShouldUploadVideo(video)}
        />
      ) : (
        <div className="flex h-full w-full justify-center">
          <img
            src={thumbnailUrl}
            className={tw(
              "w-full bg-gray-100 object-center dark:bg-brand-250",
              isBytesVideo ? "object-contain" : "object-cover"
            )}
            style={{
              backgroundColor: backgroundColor && `${backgroundColor}95`
            }}
            alt="thumbnail"
            draggable={false}
          />
          <div
            className="absolute grid h-full w-full place-items-center"
            onClick={onClickOverlay}
            onKeyDown={onClickOverlay}
          >
            <button
              type="button"
              className="rounded-full bg-brand-400 p-3 shadow-2xl xl:p-5"
            >
              <PlayOutline className="size-6 pl-0.5 text-white" />
            </button>
          </div>
        </div>
      )}
      <TopOverlay playerRef={playerRef} video={video} />
    </div>
  );
};

export default Video;
