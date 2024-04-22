import { Button } from '@dragverse/ui'
import { Dialog } from '@headlessui/react'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import React from 'react'

interface ReminderPasswordPopupProps {
  onClose: () => void
  onConfirm?: () => void // Make sure this line is present and correct
}

function ReminderPasswordPopup({ onClose }: ReminderPasswordPopupProps) {
  // Use the usePrivy hook to get access to the logout and disconnect functions
  const { logout } = usePrivy()
  const { wallets } = useWallets()

  const handleLogout = async () => {
    try {
      // Call disconnect on the first wallet if it exists
      await wallets[0]?.disconnect()
      // Logout from Privy authentication
      await logout()
      onClose() // Close the dialog after successful logout
      window.location.reload() // Optionally reload the page or redirect
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="bg-brand-850 fixed inset-0 bg-opacity-30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-brand-150 mx-auto max-w-sm rounded p-6 text-center">
          <Dialog.Title className="text-brand-200 text-lg font-medium leading-6">
            Don't Forget Your Password
          </Dialog.Title>
          <Dialog.Description className="text-brand-100 mt-2 text-sm">
            If you signed up using email, phone, or social media, don't forget
            your password for next time.
          </Dialog.Description>
          <Button
            onClick={handleLogout}
            className="bg-brand-600 hover:bg-brand-700 focus:ring-brand-500 mt-4 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-opacity-50"
          >
            Understood
          </Button>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default ReminderPasswordPopup
