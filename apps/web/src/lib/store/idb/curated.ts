import { LocalIDBStore } from '@dragverse/lens/custom-types'
import createIdbStorage from '@lib/createIdbStorage'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  curatedProfiles: string[]
  setCuratedProfiles: (curatedProfiles: string[]) => void
}

const useCuratedProfiles = create(
  persist<State>(
    (set) => ({
      curatedProfiles: [],
      setCuratedProfiles: (curatedProfiles) => set({ curatedProfiles })
    }),
    {
      name: LocalIDBStore.ALLOWED_TOKENS_STORE,
      storage: createIdbStorage()
    }
  )
)

export default useCuratedProfiles
