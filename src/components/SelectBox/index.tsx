import React, { useState, useCallback, useEffect } from "react";
import "./selectBox.scss";
import { eOMDBType } from "../../network";
import { IoChevronDown } from "react-icons/io5";

type SelectBoxProps = {
  options: eOMDBType[];
  value: eOMDBType;
  onChange: (selectedType: eOMDBType) => void;
};

export const SelectBox = (props: SelectBoxProps) => {
  const { options, onChange, value } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = useCallback(
    (type: eOMDBType) => {
      onChange(type);
      setIsOpen(false);
    },
    [onChange]
  );

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest(".customSelectBox")) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick, isOpen]);

  return (
    <div className="customSelectBox">
      <label
        className={`customSelectBox__label ${
          isOpen || value !== eOMDBType.ALL ? "float" : ""
        }`}
      >
        Select Type
      </label>
      <button
        className={`customSelectBox__button ${
          isOpen ? "customSelectBoxOpen" : ""
        }`}
        onClick={toggleDropdown}
      >
        <span>
          {value === eOMDBType.ALL
            ? ""
            : value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
        <IoChevronDown
          className={`customSelectBox__icon ${isOpen ? "rotate" : ""}`}
          size={"14px"}
        />
      </button>
      {isOpen && (
        <div className="customSelectBox__dropdown">
          {options.map((type) => (
            <p
              key={type}
              className="customSelectBox__option"
              onClick={() => handleOptionClick(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
