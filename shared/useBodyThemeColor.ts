import { useEffect } from "react";
import { ColorBgDark, ColorBgWhite } from "./styleTokens";

function setBgColor(color: string) {
  document.body.style.setProperty("background-color", color, "important");
}

export function useBodyThemeColor(isDark: boolean) {
  useEffect(() => {
    const currentColor = document.body.style.backgroundColor;
    setBgColor(isDark ? ColorBgDark : ColorBgWhite);
    return () => {
      console.log("unmount");
      setBgColor(currentColor);
    };
  });
}
