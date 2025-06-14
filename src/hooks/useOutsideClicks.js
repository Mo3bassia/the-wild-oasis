import { useEffect } from "react";

function useOutsideClicks(ref, callback, listenCapturing = true) {
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      const isMenuItemClick = event.target.closest("[data-menu-item]");
      if (!isMenuItemClick) {
        callback();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, listenCapturing);
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
        listenCapturing
      );
    };
  }, [ref, callback, listenCapturing]);
  return ref;
}
export { useOutsideClicks };
