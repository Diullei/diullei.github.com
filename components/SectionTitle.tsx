import React from "react";
import styled, { css } from "styled-components";
import {
  ColorDarkGreen,
  ColorDarkPrimary,
  ColorPrimary,
  ColorYellow,
} from "../shared/styleTokens";
import { useThemeContext } from "./ThemeProvider";

const StyledUnderline = styled.div`
  width: 61px;
  height: 4px;
`;

const ThemeLight = css`
  color: ${ColorPrimary};
  ${StyledUnderline} {
    background-color: ${ColorDarkGreen};
  }
`;

const ThemeDark = css`
  color: ${ColorDarkPrimary};
  ${StyledUnderline} {
    background-color: ${ColorYellow};
  }
`;

const setTheme = ({ isDark }: { isDark?: boolean }) => {
  if (isDark) {
    return ThemeDark;
  }
  return ThemeLight;
};

const StyledWrapper = styled.h2`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  display: flex;
  flex-direction: column;

  ${setTheme}
`;

interface SectionTitleProps {
  children: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  const { isDark } = useThemeContext();
  return (
    <StyledWrapper isDark={isDark}>
      {children}
      <StyledUnderline />
    </StyledWrapper>
  );
};
