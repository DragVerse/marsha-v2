import { tw } from "@dragverse/browser";
import { TAPE_LOGO } from "@dragverse/constants";

type Props = {
  text?: string;
  withImage?: boolean;
  isCenter?: boolean;
  className?: string;
};

export const NoDataFound = ({
  text = "Zero trace!",
  withImage = false,
  isCenter = false,
  className = ""
}: Props) => {
  return (
    <div
      className={tw(
        "flex flex-col space-y-6 rounded-lg p-6 text-white",
        className,
        {
          "items-center justify-center": isCenter
        }
      )}
    >
      {withImage && (
        <img
          src={`${TAPE_LOGO}`}
          height={70}
          width={70}
          alt="zero trace!"
          draggable={false}
        />
      )}
      <div
        className={tw("font-medium text-sm", {
          "text-center": isCenter
        })}
      >
        {text}
      </div>
    </div>
  );
};
