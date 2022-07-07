import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Grid, Card, Text } from "@nextui-org/react";

const Dashboard = ({ login }) => {
  const { isLoading, error, data, refetch } = useQuery(
    "repoDataDashboard",
    () =>
      fetch(`https://server.duinocoin.com/users/${login}`).then((res) =>
        res.json()
      ),
    { refetchInterval: 5000 }
  );

  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <Grid.Container gap={2} justify="center">
          <Grid xs={10}>
            <Card>
              <Card.Header>User info</Card.Header>
              <Card.Body>
                <Text css={{ textAlign: "center" }}>
                  Welcome back {data.result.balance.username}
                </Text>
                <Text css={{ textAlign: "center" }}>
                  Your balance {data.result.balance.balance}
                </Text>
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={10}>
            <Card>
              <Card.Header>Transactions</Card.Header>
              <Card.Body css={{ textAlign: "center" }}>
                {data.result.transactions.map((transaction) => {
                  return (
                    <Text css={{ paddingTop: "$3" }} key={transaction.id}>
                      from {transaction.sender} to {transaction.recipient}{" "}
                      {transaction.amount} DUCO
                    </Text>
                  );
                })}
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={10}>
            <Card>
              <Card.Header>Miners</Card.Header>
              <Card.Body>
                {data.result.miners.map((miner) => {
                  return (
                    <Text css={{ textAlign: "center" }} key={miner.threadid}>
                      {miner.accepted}/{miner.rejected} platform:{" "}
                      {miner.identifier} {miner.hashrate} h/s
                    </Text>
                  );
                })}
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
      )}
    </>
  );
};

export default Dashboard;
