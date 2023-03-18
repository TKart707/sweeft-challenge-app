import GlobalStyles from "./components/GlobalStyles";
import Users from "./pages/Users";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import UserDetails from "./pages/UserDetails";

function App() {
  return (
    <Container>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </Container>
  );
}

export default App;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
