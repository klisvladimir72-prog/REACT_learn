import { useRef } from "react";

export const FocusableInput = () => {
  const ref = useRef();

  const handleButtonClick = () => {
    ref.current.focus();
  };

  return (
    <div>
      <input type="text" ref={ref} />

      <button onClick={handleButtonClick}>Установить курсор в поле</button>
    </div>
  );
};
