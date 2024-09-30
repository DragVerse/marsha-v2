import { ADMIN_IDS } from "@dragverse/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@dragverse/ui";
import { useState } from "react";
import Custom404 from "src/pages/404";

import useProfileStore from "@/lib/store/idb/profile";
import MetaTags from "../Common/MetaTags";
import Recents from "./Recents";
import Signup from "./Signup";

const Mod = () => {
  const { activeProfile } = useProfileStore();
  const [activeTab, setActiveTab] = useState("signup");

  if (!ADMIN_IDS.includes(activeProfile?.id)) {
    return <Custom404 />;
  }

  return (
    <>
      <MetaTags title="Stats" />
      <div className="container mx-auto">
        <Tabs defaultValue={activeTab}>
          <TabsList>
            <TabsTrigger
              className="rounded-t-lg border-black px-4 py-1.5 font-medium text-sm data-[state=active]:border-b data-[state=active]:bg-gray-100 dark:border-white data-[state=active]:dark:bg-gray-800"
              onClick={() => {
                setActiveTab("signup");
              }}
              value="signup"
            >
              Signup
            </TabsTrigger>
            <TabsTrigger
              className="rounded-t-lg border-black px-4 py-1.5 font-medium text-sm data-[state=active]:border-b data-[state=active]:bg-gray-100 dark:border-white data-[state=active]:dark:bg-gray-800"
              onClick={() => {
                setActiveTab("videos");
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
  );
};

export default Mod;
