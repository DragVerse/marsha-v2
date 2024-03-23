import { tw } from '@dragverse/browser'
import * as Dialog from '@radix-ui/react-dialog'
import type { FC, ReactNode } from 'react'

import { TimesOutline } from './icons'

type Props = {
  title: ReactNode | string
  description?: ReactNode | string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  show: boolean
  setShow: (show: boolean) => void
  locked?: boolean
}

export const Modal: FC<Props> = ({
  children,
  title,
  description,
  show,
  setShow,
  locked,
  size = 'md'
}) => {
  const sizeClasses = {
    'max-w-[450px]': size === 'sm',
    'max-w-[550px]': size === 'md',
    'max-w-[650px]': size === 'lg'
  }
  return (
    <Dialog.Root open={show} onOpenChange={setShow}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-gray-500 bg-opacity-30 backdrop-blur" />
        <Dialog.Content
          onPointerDownOutside={(e) => (locked ? e.preventDefault() : null)}
          className={tw(
            sizeClasses,
            'tape-border dark:bg-brand-850 fixed left-[50%] top-[50%] z-10 max-h-[85vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] space-y-4 rounded-xl bg-white p-5 focus:outline-none'
          )}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-lg font-semibold">
                {title}
              </Dialog.Title>
              {!locked && (
                <button className="flex" onClick={() => setShow(false)}>
                  <span className="dark:hover:bg-brand-250 cursor-pointer rounded p-1.5 hover:bg-gray-100">
                    <TimesOutline outlined={false} className="size-3" />
                  </span>
                </button>
              )}
            </div>
            {description && (
              <Dialog.Description className="leading-normal">
                {description}
              </Dialog.Description>
            )}
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
