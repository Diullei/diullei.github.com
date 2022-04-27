import React from "react";
import styled from "styled-components";
import { BodyColor } from "../../components/BodyColor";
import { SectionTitle } from "../../components/SectionTitle";
import { ThemeProvider } from "../../components/ThemeProvider";

export default {
  title: "Components/Section Title",
  component: SectionTitle,
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

export const sectionTitle = () => (
  <ThemeProvider>
    <BodyColor />
    <ThemeProvider.ToggleButton />
    <StyledWrapper>
      <SectionTitle>This is a title</SectionTitle>
    </StyledWrapper>
  </ThemeProvider>
);
