import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import styled from "styled-components";
import {
  ColorDarkPrimary,
  ColorDatkGray05,
  ColorPrimary,
} from "../shared/styleTokens";
import { Moon, Sun } from "./Icons";

interface ThemeContextProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  isDark: false,
  onToggle: () => {},
});

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "You are using a componnent that cannot be used outside a ThemeProvider component"
    );
  }
  return context;
}

function useEffectAfterMount(callback: () => void, dependencies: any[]) {
  const justMounted = useRef(true);
  useEffect(() => {
    if (justMounted.current) {
      justMounted.current = false;
      return;
    }
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

const StyledLabel = styled.label`
  display: inline-block;
`;

const StyledInput = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
`;

interface StyledSwitchButtonProps {
  isDark?: boolean;
}

const setBackgroundColor = ({ isDark }: StyledSwitchButtonProps) =>
  isDark ? ColorDarkPrimary : ColorPrimary;

const setFlexDirection = ({ isDark }: StyledSwitchButtonProps) =>
  isDark ? "row-reverse" : "row";

const StyledSwitchButton = styled.div<StyledSwitchButtonProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: ${setBackgroundColor};
  width: 62px;
  height: 30px;
  padding: 3px 4px;
  border-radius: 32px;
  flex-direction: ${setFlexDirection};
  transition: all 0.4s ease;
`;

interface StyledSwitchCircleProps {
  isDark?: boolean;
}

const setSwitchCircleColor = ({ isDark }: StyledSwitchCircleProps) =>
  isDark ? ColorDatkGray05 : "#ffffff";

const StyledSwitchCircle = styled.div<StyledSwitchCircleProps>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${setSwitchCircleColor};
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    padding 0.3s ease, margin 0.3s ease;
`;

interface SwitchProps {
  ariaLabel?: string;
  isDark?: boolean;
  onToggle?: () => void;
}

const Switch: React.FC<SwitchProps> = ({ ariaLabel, isDark, onToggle }) => {
  return (
    <StyledLabel>
      <StyledInput
        type="checkbox"
        aria-label={ariaLabel ?? "ThemeToggle"}
        checked={isDark}
        onClick={onToggle}
      />
      <StyledSwitchButton isDark={isDark}>
        <StyledSwitchCircle isDark={isDark} />
        {isDark ? <Moon color={ColorDatkGray05} /> : <Sun color={"#ffffff"} />}
      </StyledSwitchButton>
    </StyledLabel>
  );
};

interface ThemeProviderProps {
  initialValue?: boolean;
  children: React.ReactElement[] | React.ReactElement;
  onToggle?: () => void;
}

const ThemeProviderComponent: React.FC<ThemeProviderProps> = ({
  initialValue = false,
  onToggle,
  children,
}) => {
  const [isDark, setIsDark] = React.useState(initialValue);

  const toggleTheme = useCallback(() => setIsDark((isDark) => !isDark), []);
  const value = useMemo(
    () => ({ isDark, onToggle: toggleTheme }),
    [isDark, toggleTheme]
  );

  useEffectAfterMount(() => {
    if (onToggle) {
      onToggle();
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

interface ToggleOnOffProps {
  children?: (React.ReactElement | string)[] | React.ReactElement | string;
}

const ThemeProviderDark: React.FC<ToggleOnOffProps> = ({ children }) => {
  const { isDark } = useThemeContext();
  return isDark && children ? <>{children}</> : null;
};

const ThemeProviderLight: React.FC<ToggleOnOffProps> = ({ children }) => {
  const { isDark } = useThemeContext();
  return !isDark && children ? <>{children}</> : null;
};

const ThemePtoviderToggleButton: React.FC = () => {
  const { isDark, onToggle } = useThemeContext();
  return <Switch isDark={isDark} onToggle={onToggle} />;
};

type ThemeProvider = React.FC<ThemeProviderProps> & {
  Dark: React.FC<ToggleOnOffProps>;
  Light: React.FC<ToggleOnOffProps>;
  ToggleButton: React.FC;
};

export const ThemeProvider = ThemeProviderComponent as ThemeProvider;
ThemeProvider.Dark = ThemeProviderDark;
ThemeProvider.Light = ThemeProviderLight;
ThemeProvider.ToggleButton = ThemePtoviderToggleButton;
