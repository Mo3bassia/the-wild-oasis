import { HiOutlineMoon } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";
import { HiOutlineSun } from "react-icons/hi2";
import { useEffect } from "react";

export default function DarkModeToggle() {
  const { toggleDarkMode, darkMode } = useDarkMode();
  function handleToggle() {
    toggleDarkMode();
  }
  useEffect(() => {
    console.log(darkMode);
  }, [darkMode]);
  return (
    <ButtonIcon onClick={handleToggle}>
      {!darkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
}
