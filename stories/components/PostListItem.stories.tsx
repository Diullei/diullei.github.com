import React from "react";
import styled from "styled-components";
import { BodyColor } from "../../components/BodyColor";
import { PostListItem } from "../../components/PostListItem";
import { ThemeProvider } from "../../components/ThemeProvider";

export default {
  title: "Components/Post List Item",
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

export const postListItem = () => (
  <ThemeProvider>
    <BodyColor />
    <ThemeProvider.ToggleButton />
    <StyledWrapper>
      <PostListItem
        title={"Everything you need to know about React 18"}
        date="2020-05-01T12:43:00Z"
        tags={["javascript", "react", "typescript"]}
      />
    </StyledWrapper>
  </ThemeProvider>
);
