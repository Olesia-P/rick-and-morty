import { useEffect, useRef } from "react";

const useClickOutsideClose = (
  setOpeningState: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpeningState(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setOpeningState]);

  return ref;
};

export default useClickOutsideClose;
