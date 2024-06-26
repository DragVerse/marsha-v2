import MirrorPublication from '@components/Common/MirrorPublication'
import PublicationOptions from '@components/Common/Publication/PublicationOptions'
import { getProfile } from '@dragverse/generic'
import type { MirrorablePublication } from '@dragverse/lens'
import { TriStateValue } from '@dragverse/lens'
import {
  CollectOutline,
  MirrorOutline,
  Modal,
  ThreeDotsOutline,
  TipOutline
} from '@dragverse/ui'
import type { FC } from 'react'
import { useState } from 'react'

import OpenActions from '../../Watch/OpenActions'
import TipForm from '../../Watch/TipForm'
import PublicationReaction from './PublicationReaction'

type Props = {
  publication: MirrorablePublication
}

const PublicationActions: FC<Props> = ({ publication }) => {
  const [showTip, setShowTip] = useState(false)
  return (
    <div className="mt-4 flex justify-end space-x-1">
      <div className="tape-border dark:bg-brand-600 flex items-center justify-end overflow-hidden rounded-full bg-gray-100">
        <PublicationReaction
          publication={publication}
          textSize="inherit"
          iconSize="base"
          className="dark:hover:bg-brand-250/50 flex items-center px-4 py-1 hover:bg-gray-200"
        />
        {publication.operations.canComment !== TriStateValue.No ? (
          <>
            <button
              onClick={() => setShowTip(true)}
              className="dark:hover:bg-brand-250/50 flex items-center space-x-1 px-4 py-1 hover:bg-gray-200"
            >
              <TipOutline className="size-4 flex-none" />
              <span>Tip</span>
            </button>
            <Modal
              show={showTip}
              setShow={setShowTip}
              title={`Tip ${getProfile(publication.by)?.displayName}`}
              description="Show appreciation with a comment and tip."
            >
              <TipForm video={publication} setShow={setShowTip} />
            </Modal>
          </>
        ) : null}
        <MirrorPublication video={publication}>
          <button className="dark:hover:bg-brand-250/50 flex items-center space-x-1 px-4 py-1 hover:bg-gray-200">
            <MirrorOutline className="size-4 flex-none" />
            <span>Mirror</span>
          </button>
        </MirrorPublication>
        <OpenActions publication={publication}>
          <div className="dark:hover:bg-brand-250/50 flex items-center space-x-1 px-4 py-1 hover:bg-gray-200">
            <CollectOutline className="size-4" />
            <span>Actions</span>
          </div>
        </OpenActions>
      </div>
      <PublicationOptions publication={publication}>
        <button className="tape-border bg-brand-600 hover:bg-brand-250 dark:bg-brand-600 dark:hover:bg-brand-250 flex items-center space-x-1 rounded-full p-2">
          <ThreeDotsOutline className="size-4" />
        </button>
      </PublicationOptions>
    </div>
  )
}

export default PublicationActions
