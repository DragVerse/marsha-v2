import useAppStore from "@/lib/store";
import { tw } from "@dragverse/browser";
import type { CollectModuleType } from "@dragverse/lens/custom-types";
import { Button } from "@dragverse/ui";
import type { FC } from "react";

type Props = {
  setCollectType: (data: CollectModuleType) => void;
};

const ChargeQuestion: FC<Props> = ({ setCollectType }) => {
  const uploadedMedia = useAppStore((state) => state.uploadedMedia);

  return (
    <div className="space-y-1">
      <span className="font-medium text-sm">Price</span>
      <div className="flex w-full flex-wrap gap-1.5 md:flex-nowrap">
        <div className="flex-1">
          <Button
            type="button"
            className={tw(
              !uploadedMedia.collectModule.isFeeCollect && "border-brand-500"
            )}
            variant="secondary"
            onClick={() =>
              setCollectType({
                isSimpleCollect: true,
                isMultiRecipientFeeCollect: false,
                isFeeCollect: false
              })
            }
          >
            Free
          </Button>
        </div>
        <div className="flex-1">
          <Button
            type="button"
            className={tw(
              uploadedMedia.collectModule.isFeeCollect && "border-brand-500"
            )}
            variant="secondary"
            onClick={() =>
              setCollectType({
                isSimpleCollect: false,
                isMultiRecipientFeeCollect: true,
                isFeeCollect: true
              })
            }
          >
            Set Price
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChargeQuestion;
