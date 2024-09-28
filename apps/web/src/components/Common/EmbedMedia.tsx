import { useCopyToClipboard } from "@dragverse/browser";
import { TAPE_APP_NAME, TAPE_EMBED_URL } from "@dragverse/constants";
import { EVENTS } from "@dragverse/generic";
import { CodeOutline, CopyOutline, Modal, Tooltip } from "@dragverse/ui";
import type { FC } from "react";
import { useState } from "react";

import useSw from "@/hooks/useSw";

type Props = {
  publicationId: string;
};

const EmbedMedia: FC<Props> = ({ publicationId }) => {
  const [copy] = useCopyToClipboard();
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const { addEventToQueue } = useSw();

  const iframeCode = `<iframe width="560" height="315" src="${TAPE_EMBED_URL}/${publicationId}?autoplay=1&t=0&loop=0" title="${TAPE_APP_NAME} player" frameborder="0" allow="accelerometer; autoplay; clipboard-write;" allowfullscreen></iframe>`;

  const onCopyCode = () => {
    copy(iframeCode);
    addEventToQueue(EVENTS.EMBED_VIDEO.COPY);
  };

  const openModal = () => {
    setShowEmbedModal(true);
    addEventToQueue(EVENTS.EMBED_VIDEO.OPEN);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => openModal()}
        className="rounded-full bg-gray-200 p-3 dark:bg-brand-250/50"
      >
        <CodeOutline className="size-5" />
      </button>
      <Modal
        title="Embed Media"
        size="md"
        show={showEmbedModal}
        setShow={setShowEmbedModal}
      >
        <div className="flex flex-col space-y-3">
          <div className="w-full overflow-hidden rounded">
            <iframe
              sandbox="allow-scripts allow-same-origin"
              className="aspect-[16/9] w-full"
              src={`${TAPE_EMBED_URL}/${publicationId}`}
              title={`${TAPE_APP_NAME} player`}
              allow="accelerometer; autoplay; clipboard-write; gyroscope;"
              allowFullScreen
            />
          </div>
          <div className="dragverse-border relative rounded-lg p-4">
            <code className="select-all text-sm opacity-60">{iframeCode}</code>
            <Tooltip content="Copy Code" placement="top">
              <button
                type="button"
                className="absolute top-2 right-2 rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-900"
                onClick={() => onCopyCode()}
              >
                <CopyOutline className="size-4" />
              </button>
            </Tooltip>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EmbedMedia;
