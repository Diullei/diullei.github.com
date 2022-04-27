import React, { useState } from "react";
import styled from "styled-components";
import { getId } from "../shared/utils";

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
  const [id, _] = useState(getId());
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
          id={`${id}mask0_4_19`}
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <rect width="24" height="24" fill={`url(#${id}pattern0)`} />
        </mask>
        <g mask={`url(#${id}mask0_4_19)`}>
          <rect width="24" height="24" fill="currentColor" />
        </g>
        <defs>
          <pattern
            id={`${id}pattern0`}
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref={`#${id}image0_4_19`} transform="scale(0.0104167)" />
          </pattern>
          <image
            id={`${id}image0_4_19`}
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

export const Github: React.FC<IconProps> = (props) => {
  const [id, _] = useState(getId());
  const size = props.size || BASE_ICON_SIZE;
  return (
    <BaseIcon {...{ ...props, size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id={`${id}mask0_4_52`}
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="28"
          height="28"
        >
          <rect width="28" height="28" fill={`url(#${id}pattern0)`} />
        </mask>
        <g mask={`url(#${id}mask0_4_52)`}>
          <rect width="28" height="28" fill="currentColor" />
        </g>
        <defs>
          <pattern
            id={`${id}pattern0`}
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref={`#${id}image0_4_52`} transform="scale(0.0104167)" />
          </pattern>
          <image
            id={`${id}image0_4_52`}
            width="96"
            height="96"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>
    </BaseIcon>
  );
};

export const StackOverflow: React.FC<IconProps> = (props) => {
  const [id, _] = useState(getId());
  const size = props.size || BASE_ICON_SIZE;
  return (
    <BaseIcon {...{ ...props, size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id={`${id}mask0_103_821`}
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="28"
          height="28"
        >
          <rect width="28" height="28" fill={`url(#${id}pattern0)`} />
        </mask>
        <g mask={`url(#${id}mask0_103_821)`}>
          <rect width="28" height="28" fill="currentColor" />
        </g>
        <defs>
          <pattern
            id={`${id}pattern0`}
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref={`#${id}image0_103_821`}
              transform="scale(0.0104167)"
            />
          </pattern>
          <image
            id={`${id}image0_103_821`}
            width="96"
            height="96"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAACeElEQVR4nO3dv2oUURzF8W8CghKsLPwHgWjYWqx8A9NoSjsFY2fjI4ha+AY2tiraqaDBxs7CXsHCSBBRKxEJbgonFqvYLHHvzpk92bvnA7/y3r05J1l2mDALERERERExa+Y63n8ZWAVWgEXgOLDQ8WuqbQGfgE1gHXgMvLeeaAQ94BHQADuVTfPnZ+vJ0hJbA7bxB9X1bAOXRZnJ3MIfzKTnpiQ5gUv4w3DNFUF+rfSAPv4gXNNn8IHD5uGQQ83aPGid4piWqfPTTuk0wMnS8OZLFwyxSvfXE9NgDjhfukhRwFnBHrVYKV2gKGBJsEctirNQFHBEsEctjpYuULx37wj2qElRpoq/gGghBZilgIiICJNcB+jlOmCapACzFGCWAsxSgFkKMEsBZinALAWYpQCzFBAREWGS+wF6uR8wTVKAWQowSwFmKcAsBZilALMUYJYCzFKAWQqIiIgwyf0AvdwPmCYpwExRwHfBHjNLUcAXwR61+FG6QFHAhmCPWnwuXaAo4IVgj1p8KF2gKOCZYI9arLte+Dn+h+a55xdwom2Q4zozwgFrn3utU2zpLv4QXPOTMR5ZqbYAvMUfhmMuCvKTWATe4Q9kknNDkpzQYeAV/mC6nj6DB5bvSfPAVeAb/qDU0zB4TrTkPb/rRw4fAM4BF4DTDJ4xur/j11TbAj7y7ytMnpCr/10pfsu/AqcmffBatA1/kz38/TDToE34GxivZmsxbvhvgGOG81ZnnPBfA4cch61RafgvgYOWk1aqJPynDD4qh9Co4d8H9pnOWLVRwr9D/iOkM/8L/zb50qFO7Rb+deO5Zsaw4BvgmvNQERERERERf/0G1HgJh5xsEFIAAAAASUVORK5CYII="
          />
        </defs>
      </svg>
    </BaseIcon>
  );
};

export const LinkedIn: React.FC<IconProps> = (props) => {
  const [id, _] = useState(getId());
  const size = props.size || BASE_ICON_SIZE;
  return (
    <BaseIcon {...{ ...props, size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id={`${id}mask0_4_56`}
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="28"
          height="28"
        >
          <rect width="28" height="28" fill={`url(#${id}pattern0)`} />
        </mask>
        <g mask={`url(#${id}mask0_4_56)`}>
          <rect width="28" height="28" fill="currentColor" />
        </g>
        <defs>
          <pattern
            id={`${id}pattern0`}
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref={`#${id}image0_4_56`} transform="scale(0.0104167)" />
          </pattern>
          <image
            id={`${id}image0_4_56`}
            width="96"
            height="96"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAADRUlEQVR4nO3dO2sVQRjG8X805iheOkkhiASskoiVYLBUBKM2XioLQYV8A0Hs7OM1WvoBRIyg4L2wsLBR0FIEBVGMjSYiamIsJoEj5uTMzF7e3dnnB1PtzuzsPDmbnT27e0BERERERERERMTfMHAReA3MAPOJl5mFfb0ADOUwftFawFVgDvtBsSpzwATQl3Esg7WAJxk6nlp5TMkhXCtgJ+permQa0QDDNPuw06nMAoOhg7kitAJwMrJe6lYCJ0IrxQzk7og6TbEntEJPxEamgXUR9ZpgGtgQUiEmgPmIOk0SNKY6lhtTAMYUgDEFYKzXYJvPgFvAG9yEbgA4CowY9KWWYmeKP3AD3clx3GzSekabtRQutmM+s8SzGdqvSglS1jzgA7AZ+NNlvbXAFLAmYhtVUcl5wHO6Dz7Ad9yXHY1RVgA+g79orrBeVFBZAWzzXK9FxCXdOisrgK3APo/1TgHrC+5L7cWeHXwGti/T7gHcqar1WUySZ0GLfgLXgdvAO9whZwg3P9gf2Z+qCdoHXY7OXyVPQ6UDBWBMARhTAMbKCuAT7p+TT+nmiGc77TdK/QYmgTFgB9APrMZdcxoAjgH3MuxfqWLOjT/m2P5hz3YuL6x/E3ch0Mco7o+ltHlA6oegc8Ah4L3n+ndx9z19KaxHOajLJyD4Jqk2ox79yOUTEKMuAWQ16dEXHYIKdL6MjSiAzp4Cb4veSBMC6MUd00/jrrj67vM88KCoTi2yuC2lTJuAO/x7Gfw+cBD45VH/RRGdapfyJ6AHuMH/30HsBc54tvEy1x4tIeUARoCdHZaN4TfrnsqvO0tLOYBdyyzrB7Z4tPE1p750lHIA/V2Wb/Ro41seHVlOygGsyrgc3K2ShUo5gFpQAMYUgDEFYEwBGFMAxhSAMQVgTAEYUwDGFIAxBWBMARhTAMb0gEb+9IBGnSgAYwrAmAIwpgCMKQBjCsBYTAAzufciHcH3EcUE4Pu4TxMFj01MAA8j6jRF4bezg3u5Rgov18u7RL2+PtZECTtUt3Ip04gG6sP9bIf1TlelPMLgd2T6cE+jN/lwNIv7yy998NsNAuPAK9z7860HpegyvbCv4zTs/XYiIiIiIiIiIpLNX2FVAcNCxrOBAAAAAElFTkSuQmCC"
          />
        </defs>
      </svg>
    </BaseIcon>
  );
};

export const Rss: React.FC<IconProps> = (props) => {
  const size = props.size || BASE_ICON_SIZE;
  return (
    <BaseIcon {...{ ...props, size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.21 23.3334C8.61464 23.3334 9.75333 22.1947 9.75333 20.79C9.75333 19.3854 8.61464 18.2467 7.21 18.2467C5.80536 18.2467 4.66667 19.3854 4.66667 20.79C4.66667 22.1947 5.80536 23.3334 7.21 23.3334Z"
          fill="currentColor"
        />
        <path
          d="M4.66667 5.18005V8.48172C12.8683 8.48172 19.5183 15.1317 19.5183 23.3334H22.82C22.82 13.3117 14.6883 5.18005 4.66667 5.18005ZM4.66667 11.7834V15.0851C9.21667 15.0851 12.915 18.7834 12.915 23.3334H16.2167C16.2167 16.9517 11.0483 11.7834 4.66667 11.7834Z"
          fill="currentColor"
        />
      </svg>
    </BaseIcon>
  );
};
