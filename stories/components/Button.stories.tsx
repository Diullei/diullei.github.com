import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "../../components/ThemeProvider";
import { Button } from "../../components/Button";

export default {
  title: "Components/Button",
  component: Button,
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

export const TagComponent = () => (
  <ThemeProvider>
    <ThemeProvider.ToggleButton />
    <StyledWrapper>
      <Button isPrimary={true}>Click me!</Button>
      <Button>Me too!</Button>
    </StyledWrapper>
  </ThemeProvider>
);
