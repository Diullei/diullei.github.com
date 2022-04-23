import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "../../components/ThemeProvider";
import { PostDate } from "../../components/PostDate";

export default {
  title: "Components/PostDate",
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

export const PostDateComponent = () => (
  <ThemeProvider>
    <ThemeProvider.ToggleButton />
    <StyledWrapper>
      <PostDate date="2021-04-23T18:25:43.511Z" />
    </StyledWrapper>
  </ThemeProvider>
);
