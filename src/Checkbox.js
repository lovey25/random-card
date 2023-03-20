import { useState } from "react";

export const Checkbox = ({ value, count, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <div>
        <label>
          <input
            id={value}
            type={"checkbox"}
            checked={isChecked}
            onChange={onChange}
            onClick={(e) => {
              setIsChecked((prev) => !prev);
            }}
          />
          {value} ({count})
        </label>
      </div>
    </>
  );
};
