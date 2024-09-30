import { TAPE_FEEDBACK_URL, TAPE_X_HANDLE } from "@dragverse/constants";
import { EVENTS } from "@dragverse/generic";
import Link from "next/link";

import useSw from "@/hooks/useSw";

const TapeMenu = () => {
  const { addEventToQueue } = useSw();

  return (
    <div className="grid grid-cols-2 py-1 pl-1">
      <Link
        className="rounded-lg px-2.5 py-1.5"
        href={`${TAPE_FEEDBACK_URL}/feature-requests`}
        onClick={() => {
          addEventToQueue(EVENTS.SYSTEM.MORE_MENU.FEEDBACK);
        }}
        target="_blank"
      >
        Feedback
      </Link>
      <Link
        className="rounded-lg px-2.5 py-1.5"
        href={TAPE_FEEDBACK_URL}
        onClick={() => {
          addEventToQueue(EVENTS.SYSTEM.MORE_MENU.ROADMAP);
        }}
        target="_blank"
      >
        Roadmap
      </Link>
      <Link
        className="rounded-lg px-2.5 py-1.5"
        href={`https://x.com/${TAPE_X_HANDLE}`}
        onClick={() => {
          addEventToQueue(EVENTS.SYSTEM.MORE_MENU.X);
        }}
        target="_blank"
      >
        X (Twitter)
      </Link>
      <Link
        className="rounded-lg px-2.5 py-1.5"
        href={"/decentraland"}
        onClick={() => {
          addEventToQueue(EVENTS.SYSTEM.MORE_MENU.STATUS);
        }}
        target="_blank"
      >
        Decentraland
      </Link>
      <Link
        className="rounded-lg px-2.5 py-1.5"
        href={"/spatial"}
        onClick={() => {
          addEventToQueue(EVENTS.SYSTEM.MORE_MENU.STATUS);
        }}
        target="_blank"
      >
        Spatial
      </Link>
      <Link
        className="rounded-lg px-2.5 py-1.5"
        href={"/hyperfy"}
        onClick={() => {
          addEventToQueue(EVENTS.SYSTEM.MORE_MENU.STATUS);
        }}
        target="_blank"
      >
        Hyperfy
      </Link>
      <Link
        className="rounded-lg px-2.5 py-1.5"
        target="_blank"
        onClick={() => {
          addEventToQueue(EVENTS.SYSTEM.MORE_MENU.TERMS);
        }}
        href="/terms"
      >
        Terms
      </Link>
      <Link
        className="rounded-lg px-2.5 py-1.5"
        target="_blank"
        onClick={() => {
          addEventToQueue(EVENTS.SYSTEM.MORE_MENU.PRIVACY);
        }}
        href="/privacy"
      >
        Privacy
      </Link>
    </div>
  );
};

export default TapeMenu;
