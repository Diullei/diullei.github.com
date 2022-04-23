import React from "react";
import { ThemeToggle } from "../../components/ThemeToggle";

export default {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
};

export const ThemeToggleComponent = () => (
  <>
    <ThemeToggle initialValue={true}>
      <ThemeToggle.On>On</ThemeToggle.On>
      <ThemeToggle.Off>Off</ThemeToggle.Off>
      <ThemeToggle.Button />
    </ThemeToggle>
  </>
);
