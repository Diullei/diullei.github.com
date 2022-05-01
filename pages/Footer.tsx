import styled, { css } from "styled-components";
import { Github, LinkedIn, Rss, StackOverflow } from "../components/Icons";
import { useThemeContext } from "../components/ThemeProvider";
import {
  ColorDarkGray01,
  ColorDarkGreen,
  ColorDarkPrimary,
  ColorGray01,
  ColorPrimary,
  ColorYellow,
} from "../shared/styleTokens";

const StyledPoweredBy = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;

  a {
    font-weight: 600;
  }
`;

const StyledFooterIcons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const PoweredByThemeLight = css`
  ${StyledPoweredBy} {
    color: ${ColorPrimary};

    a {
      color: ${ColorDarkGreen};
    }
  }
`;

const PoweredByThemeDark = css`
  ${StyledPoweredBy} {
    color: ${ColorDarkPrimary};

    a {
      color: ${ColorYellow};
    }
  }
`;

const setPoweredByTheme = ({ isDark }: { isDark: boolean }) => {
  if (isDark) {
    return PoweredByThemeDark;
  }
  return PoweredByThemeLight;
};

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
  ${setPoweredByTheme}
`;

export const Footer: React.FC = () => {
  const { isDark } = useThemeContext();
  return (
    <StyledFooter isDark={isDark}>
      <StyledPoweredBy>
        Powered by <a href="https://nextjs.org">Next.js</a> and{" "}
        <a href="https://pages.github.com/">Github pages</a>
      </StyledPoweredBy>
      <StyledFooterIcons>
        <Github color={isDark ? ColorDarkGray01 : ColorGray01} />
        <StackOverflow color={isDark ? ColorDarkGray01 : ColorGray01} />
        <LinkedIn color={isDark ? ColorDarkGray01 : ColorGray01} />
        <Rss color={isDark ? ColorDarkGray01 : ColorGray01} />
      </StyledFooterIcons>
    </StyledFooter>
  );
};
