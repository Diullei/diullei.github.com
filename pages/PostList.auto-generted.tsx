import type { NextPage } from "next";
import styled from "styled-components";
import { PostListItem } from "../components/PostListItem";
import { SectionTitle } from "../components/SectionTitle";

const StyledPostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const StyledSectionTitle = styled(SectionTitle)`
  margin-top: 80px;
`;

export const PostList: NextPage = () => {
  return (
    <>
      <StyledSectionTitle>Posts</StyledSectionTitle>
      <StyledPostList>
        <PostListItem
          title="Hello World!"
          date="2022-04-01 12"
          tags={["tag1", "tag2", "tag3"]}
        />
      </StyledPostList>
    </>
  );
};
