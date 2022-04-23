import React from "react";
import styled from "styled-components";

const BASE_ICON_SIZE = 24;

interface StyledWrapperProps {
  size?: string | number;
  color?: string;
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.color};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

interface IconProps {
  size?: string | number;
  color?: string;
  className?: string;
}

interface BaseIconProps extends IconProps {
  size?: string | number;
  color?: string;
  className?: string;
  children: React.ReactElement;
}

const BaseIcon: React.FC<BaseIconProps> = ({
  color = "#000000",
  className,
  size,
  children,
}) => {
  return (
    <StyledWrapper color={color} size={size} className={className}>
      {children}
    </StyledWrapper>
  );
};

export const Sun: React.FC<IconProps> = (props) => {
  const size = props.size || BASE_ICON_SIZE;
  return (
    <BaseIcon {...{ ...props, size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M6.76 4.84005L4.96 3.05005L3.55 4.46005L5.34 6.25005L6.76 4.84005ZM4 10.5H1V12.5H4V10.5ZM13 0.550049H11V3.50005H13V0.550049ZM20.45 4.46005L19.04 3.05005L17.25 4.84005L18.66 6.25005L20.45 4.46005ZM17.24 18.16L19.03 19.96L20.44 18.55L18.64 16.76L17.24 18.16ZM20 10.5V12.5H23V10.5H20ZM12 5.50005C8.69 5.50005 6 8.19005 6 11.5C6 14.81 8.69 17.5 12 17.5C15.31 17.5 18 14.81 18 11.5C18 8.19005 15.31 5.50005 12 5.50005ZM11 22.45H13V19.5H11V22.45ZM3.55 18.54L4.96 19.95L6.75 18.15L5.34 16.74L3.55 18.54Z"
        />
      </svg>
    </BaseIcon>
  );
};

export const Moon: React.FC<IconProps> = (props) => {
  const size = props.size || BASE_ICON_SIZE;
  return (
    <BaseIcon {...{ ...props, size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_34_2427"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <rect width="24" height="24" fill="url(#pattern0)" />
        </mask>
        <g mask="url(#mask0_34_2427)">
          <rect width="24" height="24" fill="currentColor" />
        </g>
        <defs>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image0_34_2427" transform="scale(0.0104167)" />
          </pattern>
          <image
            id="image0_34_2427"
            width="96"
            height="96"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAFbUlEQVR4nO2dz29UVRTHPxZjoU4NItjWHw22UXEhElwYYowLE8EfmxoDJhI2SlwWE3+UP0FJ3LEQdSEkVuPChYk/Fm5MCBqN8UeM2NZCMYqoxRqwZbTTurgzSQ3OO/fN+76Z+3j3k7zVae937rkz97173znnQiQSiUQikUgkEikbl3X6AwgZALYCm4GbgSGgD1gP9ALd9b+rAXPA78Bp4CQwAXwFfAH80tZPXWAqwAjwMjAFLIuuqXqbI8CVbetNQegCdgDjwDw6pze75oG36ppdbehfsFSAfcA0+Ts96ZfxdP2zlIYeYAw3X3fK8Suvv4Bnc+1xQOwCTtF5py8DS7hp78ZcexwIg8CHdN7pjWsGuD/XHgfEHuBPOu/0xnUEuCrXHgdCN/AKmm/rm8B+3GPkHbj1wRXAPcCCZzsXgCdz7XFA9AHHaH1uPgqM4hZfzRjG/0b+K7BN2L+gGQYmSe/4WeBA/f8tenCrXJ92f/Bs85JgE/AT6Rx/Fje99KbQec2z7e9w01UpGCad8xeBg8C6lDqPerY/BVyfpUNFoo90084Erc3J/fjN+2co0bTTTbob7mFaX/q/7dH+AiW64YL/o2YNt+/SKts9dZ7IoFE49uDnlCpu7m6Vy4FvPXSOZNAoHIP4rXCrwIMZtfZ66JwC1mbUKRQ+ezs1sn3zwd1jZjy0tmfUKRS78Jt6ssz5DZ7y0HlDoFMYevDbUj4s0FqFe2RN0pmnJFvKDcawnT+B5i3Twx5aLwh0CkMvbs8mySGL6J7D3zW0zuMiJErDPuxv5EGR1gDwj6H1kkirEHRhv0A/S/q9nWaMGlo1SrTdAC6Mw/r2Py/U+9jQek+oVQjGSXbILOm2lJPYgLuXJOk9JtIqBBXsoKkXhXq7Da3zuMfh0jBCskOW0M7Hrxp67wi15OQRbrfDsB/DvfpTcbdhL938bwXKjgq11uJ+UUl6Q0K94BnAfvpJil5Iy72GVvCh5uopaKthn8G9jlRxm2H/TKiVC+oB2GzYPxXr3WLYvxHryVEPgOWQL8V61vyu/LXlgnoANhr242K96wz7tFhPjnoA+g37CbHeBsN+WqwnRz0A1xj2M2I9673uH2K94LGij9eI9apt1pOjTlNdMtpcVf8bFcuGPfg03FJn/oWAegCqhr3bsKflb8Me/BSkHoBzhl0dDDVv2INPKVUPwKxh7xPrzRn2q8V6ctQDYG1+3STW+82wB59woR6Ak4Z9k1jvZ8Me/Fa0egAmDPsWsZ611aDc+s4F9QB8bdjvEutZA367WC944guZAIivJFOQx0r4I8O+U6g1B3xv/M19Qj05eQzAB4Z9G9qwlKOGPWvGTeHwCcw6INR73NAqXWAWuIIZSU5RhiauJ4YmXoRPcO5+oZ4VnPu+UKsQhBieHvTTUB60M0Gjn5igcREV7FoN7UxROkfJUpSgvUl6D3loKcPiC0E701S7cIuyJJ154AaBVqFoZ6K2T5mCUiVqN/ApVbAIPJJRJ5YqaMIgbt/GckwVeCCjVizW0YRYriYAQivYtDeDRiFJW7LsdWLJMjkhFu1TR2sET9qylTVaK1u507P9SUpUtrJBq4Vbx0g3LfkWbj2OnfBxyTFMa+e/xNLFQvqAT0g/CMv8t3h3kuOGcFF0Pm2Wqnh3g9XAIVobhJXXj7hCIY3y9VtwoTJriOXrvdhNPMCh42wkHmESBPEQnwDoAZ4jnGOsFoBncu1xoFRwTzon6Jzzp3HvuVXhNIWkC7ddPY47VC1vp8ejDBOo4F7gHMItoFROn8Tt2rblMM/g82hT0A/cicsJuBW3MLsWl72/8jjbC7hfz/8dZ/s5biEWiUQikUgkEolEIrnxL1i9lVCuZ9mYAAAAAElFTkSuQmCC"
          />
        </defs>
      </svg>
    </BaseIcon>
  );
};

export const Calendar: React.FC<IconProps> = (props) => {
  const size = props.size || BASE_ICON_SIZE;
  return (
    <BaseIcon {...{ ...props, size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.6667 2.50004H15.8333V0.833374H14.1667V2.50004H5.83333V0.833374H4.16666V2.50004H3.33333C2.41666 2.50004 1.66666 3.25004 1.66666 4.16671V17.5C1.66666 18.4167 2.41666 19.1667 3.33333 19.1667H16.6667C17.5833 19.1667 18.3333 18.4167 18.3333 17.5V4.16671C18.3333 3.25004 17.5833 2.50004 16.6667 2.50004ZM16.6667 17.5H3.33333V6.66671H16.6667V17.5Z"
          fill="currentColor"
        />
      </svg>
    </BaseIcon>
  );
};
