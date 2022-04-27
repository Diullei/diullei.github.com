import React from "react";
import styled from "styled-components";
import { BodyColor } from "../../components/BodyColor";
import { Greeting } from "../../components/Greeting";
import { ThemeProvider } from "../../components/ThemeProvider";

export default {
  title: "Components/Greeting",
  component: Greeting,
  parameters: {
    backgrounds: {
      default: "figma-bg",
      values: [{ name: "figma-bg", value: "#E5E5E5" }],
    },
  },
};

const StyledWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

export const greeting = () => (
  <ThemeProvider>
    <BodyColor />
    <ThemeProvider.ToggleButton />
    <StyledWrapper>
      <Greeting />
    </StyledWrapper>
  </ThemeProvider>
);
