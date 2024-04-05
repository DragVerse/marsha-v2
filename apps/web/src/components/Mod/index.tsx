import MetaTags from '@components/Common/MetaTags'
import { ADMIN_IDS } from '@dragverse/constants'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@dragverse/ui'
import useProfileStore from '@lib/store/idb/profile'
import { useState } from 'react'
import Custom404 from 'src/pages/404'

import Recents from './Recents'
import Signup from './Signup'

const Mod = () => {
  const { activeProfile } = useProfileStore()
  const [activeTab, setActiveTab] = useState('signup')

  if (!ADMIN_IDS.includes(activeProfile?.id)) {
    return <Custom404 />
  }

  return (
    <>
      <MetaTags title="Stats" />
      <div className="container mx-auto">
        <Tabs defaultValue={activeTab}>
          <TabsList>
            <TabsTrigger
              className="data-[state=active]:dark:bg-brand-250/50 rounded-t-lg border-black px-4 py-1.5 text-sm font-medium data-[state=active]:border-b data-[state=active]:bg-gray-100 dark:border-white"
              onClick={() => {
                setActiveTab('signup')
              }}
              value="signup"
            >
              Signup
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:dark:bg-brand-250/50 rounded-t-lg border-black px-4 py-1.5 text-sm font-medium data-[state=active]:border-b data-[state=active]:bg-gray-100 dark:border-white"
              onClick={() => {
                setActiveTab('videos')
              }}
              value="videos"
            >
              Videos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signup">
            <Signup />
          </TabsContent>
          <TabsContent value="videos">
            <Recents />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default Mod
