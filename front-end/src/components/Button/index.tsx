import React, { MouseEventHandler } from "react";
import classNames from "classnames/bind";
import style from "./button.module.scss";
import colorStyle from "../../assets/styles/colorMixins.module.scss";

const cx = classNames.bind({ ...style, ...colorStyle });

enum Variants {
  default = "default",
  outline = "outline",
  none = "none",
}

interface Props {
  children: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  underline?: boolean;
  variant?: keyof typeof Variants;
  leftIcon?: string;
  rightIcon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<Props> = ({
  children,
  bgColor,
  textColor,
  borderColor,
  underline = false,
  leftIcon,
  rightIcon,
  type,
  loading = false,
  variant = Variants.default,
  className,
  onClick,
}) => {
  const classes = cx(
    "button",
    `bg__color--${bgColor}`,
    `text__color--${textColor}`,
    `border__color--${borderColor}`,
    `variant-${variant}`,
    { underline: underline, [String(className)]: className }
  );

  return (
    <button type={type} className={classes} onClick={onClick}>
      {leftIcon && (
        <img className={cx("icon", "leftIcon")} src={leftIcon} alt="" />
      )}
      {loading ? <span className={cx("loader")}></span> : children}
      {!rightIcon ? (
        <></>
      ) : typeof rightIcon === "string" ? (
        <img className={cx("icon", "rightIcon")} src={leftIcon} alt="" />
      ) : (
        <span className={cx("icon", "rightIcon")}>{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;
