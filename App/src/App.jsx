import { Card, CardBody, Text } from "@chakra-ui/react";
import FaceButton from "./components/FacebookButton";
import GoogleButton from "./components/GoogleButton";
import UiButton from "./components/UIButton";
import UiInput from "./components/UIInput";

function App() {
  return (
    <div className="App">
      <FaceButton />
      <GoogleButton />
      <UiInput />
      <UiButton>Example default</UiButton>
      <UiButton onClick={() => alert("pepe")} variant="primary">
        Example primary
      </UiButton>
      <UiButton variant="secondary">Example secondary</UiButton>

      <Card>
        <CardBody>
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
