import fs from "fs";
import path from "path";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

function parseMarkdown(markdown) {
  const header = markdown.match(/^\s*--\s*$([\s\S]*?)^\s*--\s*$/m);
  if (!header) {
    throw new Error("Invalid markdown header");
  }

  const headerLines = header[1]
    .trim()
    .split("\n")
    .map((x) => x.trim());

  const headerObj = headerLines.reduce((acc, line) => {
    const [key, value] = line.split(":");
    if (key === "tags") {
      return { ...acc, tags: value.split(",").map((tag) => tag.trim()) };
    }
    return { ...acc, [key.trim()]: value.trim() };
  }, {});

  const content = md.render(
    markdown.replace(/^\s*--\s*$([\s\S]*?)^\s*--\s*$/m, "")
  );
  return { ...headerObj, content };
}

const posts = [];
const postsDir = "./_posts";
fs.readdirSync(postsDir).forEach((file) => {
  const filePath = path.join(postsDir, file);
  const markdown = fs.readFileSync(filePath, "utf8");
  const post = parseMarkdown(markdown);
  posts.push(post);
});

const postListComponentStr = `import type { NextPage } from "next";
import styled from "styled-components";
import { PostListItem } from "../components/PostListItem";
import { SectionTitle } from "../components/SectionTitle";

const StyledPostList = styled.div\`
  display: flex;
  flex-direction: column;
  gap: 25px;
\`;

const StyledSectionTitle = styled(SectionTitle)\`
  margin-top: 80px;
\`;

export const PostList: NextPage = () => {
  return (
    <>
      <StyledSectionTitle>Posts</StyledSectionTitle>
      <StyledPostList>
        ${posts
          .map(
            (post) => `
        <PostListItem
          title=${JSON.stringify(post.title)}
          date=${JSON.stringify(post.date)}
          tags={${JSON.stringify(post.tags)}}
        />`
          )
          .join("\n")}
      </StyledPostList>
    </>
  );
}
`;

const postListComponentPath = "./pages/PostLis.auto-generted.tsx";
fs.writeFileSync(postListComponentPath, postListComponentStr);
