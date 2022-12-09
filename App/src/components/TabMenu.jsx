import { Tabs, TabList, TabPanels, Tab, TabPanel, Button } from "@chakra-ui/react";

import React, { useCallback, useState } from "react";

export const TabMenu = () => {
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab fontSize="bg" bg="primary">Workout</Tab>
        <Tab color="soft-primary">Recipes</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Button as="a" variant="secondary" href="/workouts"></Button>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
