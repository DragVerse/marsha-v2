import { videoPlayerTheme } from "@dragverse/browser";
import { IPFS_GATEWAY_URL, IRYS_GATEWAY_URL } from "@dragverse/constants";
import type { AspectRatio } from "@livepeer/react";
import { Player } from "@livepeer/react";
import type { FC } from "react";
import { memo } from "react";

export interface PlayerProps {
  playerRef?: (ref: HTMLMediaElement) => void;
  posterUrl?: string;
  url?: string;
  ratio?: AspectRatio;
  showControls?: boolean;
  address?: string;
  options: {
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    maxHeight?: boolean;
    loadingSpinner: boolean;
    isCurrentlyShown?: boolean;
  };
  shouldUpload?: boolean;
  playbackId?: string;
  streamId?: string;
}

const PlayerInstance: FC<PlayerProps> = ({
  ratio,
  url,
  posterUrl,
  playerRef,
  options,
  address,
  showControls,
  shouldUpload,
  playbackId
}) => {
  return (
    <Player
      theme={videoPlayerTheme}
      src={
        url?.includes(IPFS_GATEWAY_URL)
          ? url.replace(`${IPFS_GATEWAY_URL}/`, "ar://")
          : url
      }
      poster={posterUrl}
      showTitle={false}
      objectFit="contain"
      aspectRatio={ratio}
      showPipButton
      viewerId={address}
      mediaElementRef={playerRef}
      loop={options.loop ?? true}
      showUploadingIndicator={false}
      muted={options?.muted ?? false}
      controls={{ defaultVolume: 1 }}
      autoPlay={options.autoPlay ?? false}
      showLoadingSpinner={options.loadingSpinner}
      _isCurrentlyShown={options.isCurrentlyShown ?? true}
      autoUrlUpload={
        shouldUpload
          ? {
              fallback: true,
              ipfsGateway: IPFS_GATEWAY_URL,
              arweaveGateway: IRYS_GATEWAY_URL
            }
          : undefined
      }
      playbackId={playbackId}
      refetchPlaybackInfoInterval={1000 * 60 * 60 * 24 * 7} // to disable hls refetching every second
    >
      {!showControls ? <></> : null}
    </Player>
  );
};

export default memo(PlayerInstance);
