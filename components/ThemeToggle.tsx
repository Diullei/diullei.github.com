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

interface ThemeToggleContextProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggleContext = createContext<ThemeToggleContextProps>({
  isDark: false,
  onToggle: () => {},
});

function useThemeToggleContext() {
  const context = useContext(ThemeToggleContext);
  if (!context) {
    throw new Error(
      "The ThemeToggle.On, ThemeToggle.Off and ThemeToggle.Button " +
        "components cannot be used outside a ThemeToggle component"
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
  display: block;
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

interface ThemeToggleProps {
  initialValue?: boolean;
  children: React.ReactElement[] | React.ReactElement;
  onToggle?: () => void;
}

const ThemeToggleComponent: React.FC<ThemeToggleProps> = ({
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
    <ThemeToggleContext.Provider value={value}>
      {children}
    </ThemeToggleContext.Provider>
  );
};

interface ToggleOnOffProps {
  children?: (React.ReactElement | string)[] | React.ReactElement | string;
}

const ThemeToggleOn: React.FC<ToggleOnOffProps> = ({ children }) => {
  const { isDark } = useThemeToggleContext();
  return isDark && children ? <>{children}</> : null;
};

const ThemeToggleOff: React.FC<ToggleOnOffProps> = ({ children }) => {
  const { isDark } = useThemeToggleContext();
  return !isDark && children ? <>{children}</> : null;
};

const ThemeToggleButton: React.FC = () => {
  const { isDark, onToggle } = useThemeToggleContext();
  return <Switch isDark={isDark} onToggle={onToggle} />;
};

type ThemeToggle = React.FC<ThemeToggleProps> & {
  On: React.FC<ToggleOnOffProps>;
  Off: React.FC<ToggleOnOffProps>;
  Button: React.FC;
};

export const ThemeToggle = ThemeToggleComponent as ThemeToggle;
ThemeToggle.On = ThemeToggleOn;
ThemeToggle.Off = ThemeToggleOff;
ThemeToggle.Button = ThemeToggleButton;
