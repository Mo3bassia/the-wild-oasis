import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles.js";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";
import Heading from "./ui/Heading.jsx";
import Row from "./ui/Row.jsx";

const MainApp = styled.div``;

export default function App() {
  return (
    <>
      <GlobalStyles />
      <MainApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">The wild oasis</Heading>
            <Row type="horizontal">
              <Heading as="h3">Check in and out</Heading>
              <Button
                variation="danger"
                size="small"
                onClick={() => alert("Check in")}
              >
                Check in
              </Button>
              <Button size="large" onClick={() => alert("Check out")}>
                Check out
              </Button>
            </Row>
          </Row>
          <Row>
            <Heading as="h2">Form</Heading>
            <div>
              <Input placeholder="Number of guests" />
              <Input placeholder="Number of guests" />
            </div>
          </Row>
        </Row>
      </MainApp>
    </>
  );
}
