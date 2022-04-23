import React from "react";
import styled, { css } from "styled-components";
import {
  ColorSecondary,
  ColorGray01,
  ColorGray04,
  ColorYellow,
  ColorDarkGray01,
  ColorDarkGray04,
  ColorDarkPrimary,
  Elevation02,
} from "../shared/styleTokens";
import { useThemeContext } from "./ThemeProvider";

const PrimaryType = css`
  background-color: ${ColorSecondary};
  border: 1px solid ${ColorSecondary};
  color: #fff;

  :hover {
    ${Elevation02}
  }
`;

const SecondaryType = css`
  background-color: ${ColorGray04};
  border: 1px solid ${ColorGray04};
  color: ${ColorGray01};

  :hover {
    border: 1px solid ${ColorSecondary};
    color: ${ColorSecondary};
    ${Elevation02}
  }
`;

const DarkPrimaryType = css`
  background-color: ${ColorYellow};
  border: 1px solid ${ColorYellow};
  color: #fff;

  :hover {
    ${Elevation02}
  }
`;

const DarkSecondaryType = css`
  background-color: ${ColorDarkGray04};
  border: 1px solid ${ColorDarkGray04};
  color: ${ColorDarkPrimary};

  :hover {
    border: 1px solid ${ColorDarkGray01};
    ${Elevation02}
  }
`;

const setButtonType = ({
  isPrimary,
  isDark,
}: {
  isPrimary?: boolean;
  isDark?: boolean;
}) => {
  if (isPrimary) {
    return isDark ? DarkPrimaryType : PrimaryType;
  } else {
    return isDark ? DarkSecondaryType : SecondaryType;
  }
};

const StyledButton = styled.button`
  border: 0;
  padding: 8px 16px;
  border-radius: 5px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  outline: none;
  cursor: pointer;
  width: ${({ width }) => width};

  ${setButtonType}
`;

interface ButtonProps {
  isPrimary?: boolean;
  isDark?: boolean;
  children: string;
  width?: string | number;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  isPrimary,
  children,
  width = "auto",
  onClick,
}) => {
  const { isDark } = useThemeContext();
  return (
    <StyledButton
      isPrimary={isPrimary}
      isDark={isDark}
      onClick={onClick}
      width={width}
    >
      {children}
    </StyledButton>
  );
};
