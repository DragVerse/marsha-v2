import {
  BONSAI_TOKEN_ADDRESS,
  CREATOR_VIDEO_CATEGORIES,
  IS_MAINNET,
  POLYGON_RPC_URLS
} from "@dragverse/constants";
import { logger } from "@dragverse/generic";
import type { UploadedMedia } from "@dragverse/lens/custom-types";
import { WebUploader } from "@irys/web-upload";
import { WebMatic } from "@irys/web-upload-ethereum";
import { ViemV2Adapter } from "@irys/web-upload-ethereum-viem-v2";
import type BaseWebIrys from "@irys/web-upload/esm/base";
import { MetadataLicenseType } from "@lens-protocol/metadata";
import { http, type WalletClient, createPublicClient, fallback } from "viem";
import { polygon, polygonAmoy } from "viem/chains";
import { create } from "zustand";

export const UPLOADED_VIDEO_IRYS_DEFAULTS = {
  balance: "0",
  estimatedPrice: "0",
  deposit: null,
  instance: null,
  depositing: false,
  showDeposit: false
};

export const UPLOADED_VIDEO_FORM_DEFAULTS: UploadedMedia = {
  type: "VIDEO",
  stream: null,
  preview: "",
  mediaType: "",
  file: null,
  title: "",
  description: "",
  thumbnail: "",
  thumbnailType: "",
  thumbnailBlobUrl: "",
  dUrl: "",
  percent: 0,
  isSensitiveContent: false,
  isUploadToIpfs: false,
  loading: false,
  uploadingThumbnail: false,
  buttonText: "Post Now",
  durationInSeconds: 0,
  mediaCategory: CREATOR_VIDEO_CATEGORIES[0] || {
    name: "Drag Race",
    tag: "drag-race"
  },
  mediaLicense: MetadataLicenseType.CC_BY,
  isByteVideo: false,
  collectModule: {
    followerOnlyCollect: false,
    amount: { currency: BONSAI_TOKEN_ADDRESS, value: "" },
    referralFee: 0,
    timeLimitEnabled: false,
    timeLimit: "1",
    isFeeCollect: false,
    isRevertCollect: true,
    isMultiRecipientFeeCollect: false,
    collectLimit: "0",
    collectLimitEnabled: false,
    multiRecipients: []
  },
  referenceModule: {
    followerOnlyReferenceModule: false,
    degreesOfSeparationReferenceModule: null
  },
  unknownOpenAction: null,
  hasOpenActions: false
};

type IrysDataState = {
  instance: BaseWebIrys | null;
  balance: string;
  estimatedPrice: string;
  deposit: string | null;
  depositing: boolean;
  showDeposit: boolean;
};

interface AppState {
  uploadedMedia: UploadedMedia;
  irysData: IrysDataState;
  videoWatchTime: number;
  activeTagFilter: string;
  setUploadedMedia: (mediaProps: Partial<UploadedMedia>) => void;
  setActiveTagFilter: (activeTagFilter: string) => void;
  setVideoWatchTime: (videoWatchTime: number) => void;
  setIrysData: (irysProps: Partial<IrysDataState>) => void;
  getIrysInstance: (client: WalletClient) => Promise<BaseWebIrys | null>;
}

const useAppStore = create<AppState>((set) => ({
  videoWatchTime: 0,
  activeTagFilter: "all",
  irysData: UPLOADED_VIDEO_IRYS_DEFAULTS,
  uploadedMedia: UPLOADED_VIDEO_FORM_DEFAULTS,
  setActiveTagFilter: (activeTagFilter) => set({ activeTagFilter }),
  setVideoWatchTime: (videoWatchTime) => set({ videoWatchTime }),
  setIrysData: (props) =>
    set((state) => ({ irysData: { ...state.irysData, ...props } })),
  setUploadedMedia: (mediaProps) =>
    set((state) => ({
      uploadedMedia: { ...state.uploadedMedia, ...mediaProps }
    })),
  getIrysInstance: async (client: WalletClient) => {
    try {
      const publicClient = createPublicClient({
        chain: IS_MAINNET ? polygon : polygonAmoy,
        transport: fallback(POLYGON_RPC_URLS.map((rpc) => http(rpc)))
      });
      const irysUploader = await WebUploader(WebMatic).withAdapter(
        ViemV2Adapter(client, { publicClient })
      );

      await irysUploader.ready();
      return irysUploader;
    } catch (error) {
      logger.error("[Error Init Irys]", error);
      return null;
    }
  }
}));

export default useAppStore;
