import React from "react";
import styled from "styled-components";
import {
  ColorDatkGray05,
  ColorGrapy05,
  ColorSecondary,
  ColorYellow,
} from "../shared/styleTokens";
import { useThemeContext } from "./ThemeProvider";

interface TagProps {
  children: string;
  onClick?: () => void;
}

interface StyledWrapperProps {
  isDarkTheme: boolean;
}

const setBaseColor = ({ isDarkTheme }: StyledWrapperProps) => {
  if (isDarkTheme) {
    return ColorDatkGray05;
  }
  return ColorGrapy05;
};

const setColor = ({ isDarkTheme }: StyledWrapperProps) => {
  if (isDarkTheme) {
    return ColorYellow;
  }
  return ColorSecondary;
};

const setBorderColor = ({ isDarkTheme }: StyledWrapperProps) => {
  if (isDarkTheme) {
    return ColorYellow;
  }
  return ColorSecondary;
};

const StyledWrapper = styled.div<StyledWrapperProps>`
  display: inline-block;
  padding: 5px;
  background-color: ${setBaseColor};
  color: ${setColor};
  border: 1px solid ${setBaseColor};
  border-radius: 5px;
  user-select: none;

  :hover {
    cursor: pointer;
    border: 1px solid ${setBorderColor};
  }
`;

export const Tag: React.FC<TagProps> = ({ children, onClick }) => {
  const { isDark } = useThemeContext();
  return (
    <StyledWrapper isDarkTheme={isDark} className="tag" onClick={onClick}>
      {children}
    </StyledWrapper>
  );
};
