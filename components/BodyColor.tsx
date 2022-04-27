import React from "react";
import { useBodyThemeColor } from "../shared/useBodyThemeColor";
import { useThemeContext } from "./ThemeProvider";

export const BodyColor: React.FC = () => {
  const { isDark } = useThemeContext();
  useBodyThemeColor(isDark);
  return <></>;
};
