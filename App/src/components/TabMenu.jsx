import { CardList } from "./CardList"
import React, { useCallback, useState } from "react";

export const TabMenu = () => {
  const [recipes, setRecipes] = useState([]);
  
  useEffect(() => {
    API.get("/users").then((res) => setRecipes(res.data.data.recipes));
  }, []);



  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab fontSize="bg" bg="primary">Workout</Tab>
        <Tab color="soft-primary">Recipes</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <CardList item={favWorkouts}/>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
