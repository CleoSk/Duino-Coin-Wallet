import { Card, Container, Input, Spacer, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Dashboard from "./Dashboard";

function App() {
  const [login, setLogin] = useState("");
  const { isLoading, error, data, refetch } = useQuery("repoData", () =>
    fetch(`https://server.duinocoin.com/users/${login}`).then((res) =>
      res.json()
    )
  );

  return (
    <Container
      fluid
      style={{ height: "100vh", alignItems: "center", display: "flex" }}
    >
      {isLoading ? (
        <div></div>
      ) : !data.success ? (
        <Card>
          <Card.Body>
            <Spacer y={1} />
            <Input
              clearable
              bordered
              labelPlaceholder="Login"
              initialValue="revox"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <Spacer y={1.5} />
            <Button onClick={refetch}>Login</Button>
          </Card.Body>
        </Card>
      ) : (
        <Dashboard login={login} />
      )}
    </Container>
  );
}

export default App;
