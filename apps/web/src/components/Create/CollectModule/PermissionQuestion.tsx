import { tw } from "@dragverse/browser";
import type { CollectModuleType } from "@dragverse/lens/custom-types";
import { Button } from "@dragverse/ui";
import type { FC } from "react";

import useAppStore from "@/lib/store";

type Props = {
  setCollectType: (data: CollectModuleType) => void;
};

const PermissionQuestion: FC<Props> = ({ setCollectType }) => {
  const uploadedMedia = useAppStore((state) => state.uploadedMedia);

  return (
    <div className="space-y-1">
      <span className="font-medium text-sm">Who can collect?</span>
      <div className="flex flex-wrap gap-1.5 md:flex-nowrap">
        <div className="flex-1">
          <Button
            type="button"
            className={tw(
              !uploadedMedia.collectModule.followerOnlyCollect &&
                !uploadedMedia.collectModule.isRevertCollect &&
                "border-brand-500"
            )}
            variant="secondary"
            onClick={() =>
              setCollectType({
                isSimpleCollect: true,
                isRevertCollect: false,
                followerOnlyCollect: false
              })
            }
          >
            Anyone
          </Button>
        </div>
        <div className="flex-1">
          <Button
            type="button"
            className={tw(
              uploadedMedia.collectModule.followerOnlyCollect &&
                !uploadedMedia.collectModule.isRevertCollect &&
                "border-brand-500"
            )}
            variant="secondary"
            onClick={() =>
              setCollectType({
                isSimpleCollect: true,
                followerOnlyCollect: true,
                isRevertCollect: false
              })
            }
          >
            Only Followers
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PermissionQuestion;
