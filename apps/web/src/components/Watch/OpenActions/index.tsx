import { getPublication } from "@dragverse/generic";
import isOpenActionAllowed from "@dragverse/generic/functions/isOpenActionAllowed";
import type { AnyPublication, OpenActionModule } from "@dragverse/lens";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  CollectOutline,
  Modal
} from "@dragverse/ui";
import { type FC, type ReactNode, useState } from "react";
import CollectPublication from "./Collect";
import UnknownOpenAction from "./Unknown";

type Props = {
  publication: AnyPublication;
  text?: string;
  children?: ReactNode;
};

const OpenActions: FC<Props> = ({ publication, text, children }) => {
  const [showActionModal, setShowActionModal] = useState(false);
  const targetPublication = getPublication(publication);
  const openActions = targetPublication.openActionModules;
  const hasOpenActions = (targetPublication.openActionModules?.length || 0) > 0;

  const renderAction = (action: OpenActionModule) => {
    switch (action.__typename) {
      case "SimpleCollectOpenActionSettings":
      case "MultirecipientFeeCollectOpenActionSettings":
      case "LegacySimpleCollectModuleSettings":
      case "LegacyMultirecipientFeeCollectModuleSettings":
        return (
          <AccordionItem
            value="item-1"
            className="group rounded-small border dark:border-gray-700"
          >
            <AccordionTrigger className="w-full rounded-small bg-brand-50/50 px-4 py-3 text-left dark:bg-brand-950/30">
              <h6 className="font-bold">Collect publication</h6>
            </AccordionTrigger>
            <AccordionContent className="p-3">
              <CollectPublication
                publication={targetPublication}
                action={action}
              />
            </AccordionContent>
          </AccordionItem>
        );
      case "UnknownOpenActionModuleSettings":
        return (
          <UnknownOpenAction
            action={action}
            publicationId={targetPublication.id}
          />
        );
      default:
        break;
    }
  };

  const canAct =
    hasOpenActions && isOpenActionAllowed(targetPublication.openActionModules);

  if (!canAct) {
    return null;
  }

  return (
    <>
      {children ? (
        <button type="button" onClick={() => setShowActionModal(true)}>
          {children}
        </button>
      ) : (
        <Button
          onClick={() => setShowActionModal(true)}
          icon={<CollectOutline className="size-4" />}
        >
          {text}
        </Button>
      )}
      <Modal
        title={
          <div className="flex items-center space-x-1.5">
            <CollectOutline className="size-4" />
            <span>Open Actions</span>
          </div>
        }
        show={showActionModal}
        setShow={setShowActionModal}
      >
        <div className="no-scrollbar max-h-[70vh] overflow-y-auto">
          <Accordion
            type="single"
            className="w-full space-y-2"
            defaultValue="item-1"
            collapsible
          >
            {openActions?.map((action) => {
              return <div key={action.type}>{renderAction(action)}</div>;
            })}
          </Accordion>
        </div>
      </Modal>
    </>
  );
};

export default OpenActions;
