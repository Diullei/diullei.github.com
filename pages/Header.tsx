import styled, { css } from "styled-components";
import { ThemeProvider, useThemeContext } from "../components/ThemeProvider";
import { ColorDarkPrimary, ColorPrimary } from "../shared/styleTokens";

const StyledTitle = styled.h1`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
`;

const HeaderThemeLight = css`
  ${StyledTitle} {
    color: ${ColorPrimary};
  }
`;

const HeaderThemeDark = css`
  ${StyledTitle} {
    color: ${ColorDarkPrimary};
  }
`;

const setHeaderTheme = ({ isDark }: { isDark: boolean }) => {
  if (isDark) {
    return HeaderThemeDark;
  }
  return HeaderThemeLight;
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  ${setHeaderTheme}
`;

export const Header: React.FC = () => {
  const { isDark } = useThemeContext();
  return (
    <StyledHeader isDark={isDark}>
      <StyledTitle>Diullei&apos;s Blog</StyledTitle>
      <ThemeProvider.ToggleButton />
    </StyledHeader>
  );
};
