import React from "react";
import styled from "styled-components";
import { PostListItem } from "../../components/PostListItem";
import { ThemeProvider } from "../../components/ThemeProvider";

export default {
  title: "Components/PostListItem",
  component: PostListItem,
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
      <PostListItem />
    </StyledWrapper>
  </ThemeProvider>
);
