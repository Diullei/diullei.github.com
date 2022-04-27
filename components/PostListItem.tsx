import React from "react";
import styled, { css } from "styled-components";
import {
  ColorBgDark,
  ColorBgWhite,
  ColorDarkFill,
  ColorDarkPrimary,
  ColorPrimary,
  Elevation02,
  Elevation03,
  ColorDarkGray03,
} from "../shared/styleTokens";
import { PostDate } from "./PostDate";
import { Tag } from "./Tag";
import { useThemeContext } from "./ThemeProvider";

const StyledTitle = styled.span`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
`;

const StyledSubSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ThemeLight = css`
  ${Elevation02}

  background-color: #fff;

  ${StyledTitle} {
    color: ${ColorPrimary};
  }

  :hover {
    ${StyledTitle} {
      color: ${ColorBgDark};
    }
    ${Elevation03}
  }
`;

const ThemeDark = css`
  ${Elevation02}

  background-color: ${ColorDarkFill};

  ${StyledTitle} {
    color: ${ColorDarkPrimary};
  }

  :hover {
    ${StyledTitle} {
      color: ${ColorBgWhite};
    }
    background-color: ${ColorDarkGray03};
    box-shadow: unset;
  }
`;

const setTheme = ({ isDark }: { isDark?: boolean }) => {
  if (isDark) {
    return ThemeDark;
  }
  return ThemeLight;
};

const StyledWrapper = styled.div`
  border-radius: 10px;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;

  ${setTheme}
`;

const StyledTagList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

interface PostListItemProps {
  title: string;
  date: string;
  tags: string[];
}

export const PostListItem: React.FC<PostListItemProps> = ({
  title,
  date,
  tags,
}) => {
  const { isDark } = useThemeContext();
  return (
    <StyledWrapper isDark={isDark}>
      <StyledTitle>{title}</StyledTitle>
      <StyledSubSection>
        <PostDate date={date} />
        <StyledTagList>
          {tags.map((tag) => (
            <Tag key={tag}>#{tag}</Tag>
          ))}
        </StyledTagList>
      </StyledSubSection>
    </StyledWrapper>
  );
};
