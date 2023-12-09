import EntryLayout from "../../../layout/EntryLayout";

import classNames from "classnames/bind";
import style from "./SendEmail.module.scss";
import Button from "../../../components/Button";
import { toast } from "react-toastify";
import config from "../../../config";

const cx = classNames.bind(style);

const SendEmail = () => {
  const handleOnClick = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <EntryLayout>
      <div className={cx("content")}>
        <div className={cx("header")}>
          <h1>WINTO</h1>
          <p>Check your inbox to log in</p>
        </div>

        <div className={cx("body")}>
          <img
            className={cx("body__img")}
            src={config.url.letterSendEmail}
            alt=""
          />
          <p>
            To complete setup and log in, click the verification link in the
            email we’ve sent to
          </p>
          <p className={cx("body__email")}>kienmuonhoc@gmail.com</p>
          <Button
            variant="none"
            className={cx("resend__email")}
            onClick={handleOnClick}
          >
            Resend verification email
          </Button>
        </div>

        <div className={cx("footer")}>KIENHOANG</div>
      </div>
    </EntryLayout>
  );
};

export default SendEmail;
