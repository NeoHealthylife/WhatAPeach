import { Card, CardBody, Text } from "@chakra-ui/react";
import ButtonTest from "./components/Button";
import CardComp from "./components/Card";
import SubHeading from "./components/Subheading";
import UiButton from "./components/UIComponents/UIButton";
import JoinOurTeam from "./pages/Login/ChakraLogin";

function App() {
  return (
    <div className="App">
      <CardComp
        imgSrc="https://sophiepeanut.com/wp-content/uploads/2017/01/get-spicy-featured.jpg"
        altImg="no se que es eso"
        textLabel1="Huevos"
        headingCard="Huevos con chorizo"
        bodyText="te vas a poner las botas con este delicioso y grasiento plato"
      />
      <SubHeading fontsize="lg" position="relative" barColor="blue.200" text="peach" />
      <JoinOurTeam />
      <UiButton>Example default</UiButton>
      <UiButton onClick={() => alert("pepe")} variant="primary">
        Example primary
      </UiButton>
      <UiButton variant="secondary">Example secondary</UiButton>
      <ButtonTest>prueba</ButtonTest>
      <Card>
        <CardBody>
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
