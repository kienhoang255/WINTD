import classNames from "classnames/bind";
import style from "./accountMenu.module.scss";
import Button from "../../Button";
import { Link } from "react-router-dom";
import config from "../../../config";

const cx = classNames.bind(style);

const AccountMenu = () => {
  return (
    <div className={cx("content")}>
      <div className={cx("account")}>
        <span>
          <p>Tài khoản</p>
          <div>Hoàng Trung Kiên</div>
        </span>
        <Button variant="none" className={cx("btn__menu")}>
          Chuyển đổi tài khoản
        </Button>
        <Button variant="none" className={cx("btn__menu")}>
          Quản lý tài khoản
        </Button>
      </div>
      <div className={cx("setting")}>
        <Button variant="none" className={cx("btn__menu")}>
          Hồ sơ và hiển thị
        </Button>
        <Button variant="none" className={cx("btn__menu")}>
          Hoạt động
        </Button>
        <Button variant="none" className={cx("btn__menu")}>
          Thẻ
        </Button>
        <Button variant="none" className={cx("btn__menu")}>
          Cài đặt
        </Button>
        <Button variant="none" className={cx("btn__menu")}>
          Chủ đề
        </Button>
      </div>
      <div className={cx("help")}>
        <Button variant="none" className={cx("btn__menu")}>
          Trợ giúp
        </Button>
        <Button variant="none" className={cx("btn__menu")}>
          Phím tắt
        </Button>
      </div>
      <Link to={config.routes.logout.path} className={cx("logout")}>
        <Button variant="none" className={cx("btn__menu")}>
          Đăng xuất
        </Button>
      </Link>
    </div>
  );
};

export default AccountMenu;
