import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "../../components/ThemeProvider";

export default {
  title: "Components/ThemeProvider",
  component: ThemeProvider,
  parameters: {
    backgrounds: {
      default: "figma-bg",
      values: [{ name: "figma-bg", value: "#E5E5E5" }],
    },
  },
};

const StyledWrapper = styled.div`
  margin-top: 20px;
`;

export const ThemeProviderComponent = () => (
  <>
    <ThemeProvider initialValue={true}>
      <ThemeProvider.Dark>On</ThemeProvider.Dark>
      <ThemeProvider.Light>Off</ThemeProvider.Light>
      <StyledWrapper>
        <ThemeProvider.ToggleButton />
      </StyledWrapper>
    </ThemeProvider>
  </>
);
