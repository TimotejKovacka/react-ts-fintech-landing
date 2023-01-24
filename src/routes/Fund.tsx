import React from "react";
import { Container, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";

const fakeData = [];

export async function loader({ params }: any) {
  return { title: "FintechX MiX 10 Gold" };
}

const Fund = () => {
  const fund = useLoaderData() as { title: string };
  return (
    <Container maxWidth="xl">
      <Typography variant="h1">{fund.title}</Typography>
    </Container>
  );
};

export default Fund;
