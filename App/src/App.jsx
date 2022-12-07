import { Card, CardBody, Text } from "@chakra-ui/react";
import FaceButton from "./components/FacebookButton";
import GoogleButton from "./components/GoogleButton";
import UiButton from "./components/UIButton";
import UiInput from "./components/UIInput";
import { Header } from "./components/Header";
import SubHeading from "./components/Subheading";
import SimpleSidebar from "./components/NavBar";
function App() {
  return (
    <div className="App">
    <SimpleSidebar/>
      <SubHeading fontsize="3xl" position="relative" barColor="blue.200" text="peach" />
      <Header />
      <UiInput />
      <UiButton>Example default</UiButton>
      <UiButton onClick={() => alert("pepe")} variant="primary">
        Example primary
      </UiButton>
      <UiButton variant="secondary">Example secondary</UiButton>
      <FaceButton />
      <GoogleButton />
      <Card>
        <CardBody>
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
