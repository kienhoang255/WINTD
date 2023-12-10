import React from "react";

import classNames from "classnames/bind";
import style from "./userLayout.module.scss";
import Dropdown from "../../components/Dropdown";
import { MdKeyboardArrowDown } from "react-icons/md";
import Button from "../../components/Button";
import AccountMenu from "../../components/DropdownContent/AccountMenu";

const cx = classNames.bind(style);

interface Props {
  children: JSX.Element;
}

const UserLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={cx("container")}>
      <div className={cx("nav")}>
        <div className={cx("left")}>
          <Dropdown id="1">
            <Button
              className={cx("button__dropdown")}
              rightIcon={<MdKeyboardArrowDown />}
            >
              Các không gian làm việc
            </Button>
          </Dropdown>
          <Dropdown id="2">
            <Button
              className={cx("button__dropdown")}
              rightIcon={<MdKeyboardArrowDown />}
            >
              Gần đây
            </Button>
          </Dropdown>
          <Dropdown id="3">
            <Button
              className={cx("button__dropdown")}
              rightIcon={<MdKeyboardArrowDown />}
            >
              Đã đánh dấu sao
            </Button>
          </Dropdown>
          <Dropdown id="4">
            <Button
              className={cx("button__dropdown")}
              rightIcon={<MdKeyboardArrowDown />}
            >
              Mẫu
            </Button>
          </Dropdown>
        </div>
        <div className={cx("right")}>
          <p>Tìm kiếm</p>
          <Dropdown id="5" content={<AccountMenu />}>
            <Button className={cx("button__dropdown")} variant="circle">
              KH
            </Button>
          </Dropdown>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default UserLayout;
