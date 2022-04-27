import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "../../components/ThemeProvider";
import { PostDate } from "../../components/PostDate";
import { BodyColor } from "../../components/BodyColor";

export default {
  title: "Components/Post Date",
  component: PostDate,
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

export const postDate = () => (
  <ThemeProvider>
    <BodyColor />
    <ThemeProvider.ToggleButton />
    <StyledWrapper>
      <PostDate date="2021-04-23T18:25:43.511Z" />
    </StyledWrapper>
  </ThemeProvider>
);
