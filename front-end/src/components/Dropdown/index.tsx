import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import style from "./dropdown.module.scss";

import Button from "../Button";

const cx = classNames.bind(style);

interface Props {
  id: string;
  children: JSX.Element | string;
  rightIcon?: React.ReactNode;
  content?: React.ReactNode;
  spacing?: number | string;
}

const Dropdown: React.FC<Props> = ({
  children,
  rightIcon,
  id,
  content,
  spacing = 38,
}) => {
  const [onShow, setOnShow] = useState(false);
  const [pos, setPos] = useState<{ top?: number; left?: number }>(); //position of the dropdown
  const [width, setWidth] = useState<number | undefined>();

  const idDropdown = cx(id);
  const idContent = cx(`${id}--content`);

  //Get parent element
  useEffect(() => {
    const element = document.getElementById(idDropdown);
    if (element) {
      //Set position for the dropdown
      setPos({
        top: element.offsetTop + Number(spacing),
        left: element.offsetLeft,
      });
      setWidth(element.offsetWidth);
    }
  }, []);

  //Incase the dropdown is going outside the screen
  useEffect(() => {
    const element = document.getElementById(idContent);
    if (element && pos?.left && width) {
      if (window.innerWidth < pos?.left + element?.offsetWidth)
        setPos({
          top: pos.top,
          //The formula to make the dropdown in the same X direction
          left: pos.left - element.offsetWidth + width,
        });
    }
  }, [onShow]);

  const handleOnClick = () => {
    setOnShow(!onShow);
  };

  const handleOnClickOutSide = () => {
    setOnShow(false);
  };
  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <div onClick={handleOnClick} id={id}>
        {typeof children === "string" ? (
          <Button
            bgColor="transparent"
            borderColor="transparent"
            textColor="nav"
            rightIcon={rightIcon}
          >
            {children}
          </Button>
        ) : (
          <>{children}</>
        )}
      </div>

      {onShow && (
        <div className={cx("test")} onClick={handleOnClickOutSide}>
          <div
            id={idContent}
            className={cx("menu")}
            style={{ top: pos?.top, left: pos?.left }}
            onClick={handleStopPropagation}
          >
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default Dropdown;
