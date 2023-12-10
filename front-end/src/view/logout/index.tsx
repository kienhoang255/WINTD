import EntryLayout from "../../layout/EntryLayout";

import classNames from "classnames/bind";
import style from "./logout.module.scss";
import Button from "../../components/Button";

const cx = classNames.bind(style);

const Logout = () => {
  return (
    <EntryLayout>
      <div className={cx("content")}>
        <div className={cx("header")}>
          <h1>WINTO</h1>
          <p>Log out of your Atlassian account</p>
        </div>

        <div className={cx("account")}>
          <div className={cx("avatar")}></div>
          <div className={cx("gmail")}>
            <p>Hoàng Trung Kiên</p>
            <p>hoangtrungkien255@gmail.com</p>
          </div>
        </div>

        <div className={cx("logout")}>
          <Button>Log out</Button>
          <Button className={cx("logout__other")} variant="none">
            Log in to another account
          </Button>
        </div>

        <div className={cx("footer")}>KIENHOANG</div>
      </div>
    </EntryLayout>
  );
};

export default Logout;
