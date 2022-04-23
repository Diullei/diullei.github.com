import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";
import { Calendar } from "./Icons";
import {
  ColorDarkGray01,
  ColorGray01,
  ColorGray02,
} from "../shared/styleTokens";
import relativeTime from "dayjs/plugin/relativeTime";
import { useThemeContext } from "./ThemeProvider";

dayjs.extend(relativeTime);

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 6px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: ${({ isDark }: { isDark?: boolean }) =>
    isDark ? ColorDarkGray01 : ColorGray01};
`;

export const PostDate: React.FC<{ date: string }> = ({ date }) => {
  const { isDark } = useThemeContext();
  return (
    <StyledWrapper isDark={isDark}>
      <Calendar size={20} color={ColorGray02} />
      {dayjs(date).format("MMMM D, YYYY")} ({dayjs(date).fromNow()})
    </StyledWrapper>
  );
};
