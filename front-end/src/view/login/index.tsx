import classNames from "classnames/bind";
import style from "./login.module.scss";

import Button from "../../components/Button";

import { BsDot } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import Input from "../../components/Input";
import { useState } from "react";
import { isEmail } from "./../../util/index";
import config from "../../config";
import { Link } from "react-router-dom";
import EntryLayout from "../../layout/EntryLayout";

const cx = classNames.bind(style);

const Login = () => {
  const [emailStatus, setEmailStatus] = useState(false);
  const [loginData, setLoginData] = useState<{
    email?: string;
    password?: string;
  }>();
  const socialLogin = [
    {
      img: config.url.GoogleIcon,
      name: "Google",
    },
    {
      img: config.url.MicrosoftIcon,
      name: "Microsoft",
    },
    {
      img: config.url.AppleIcon,
      name: "Apple",
    },
    {
      img: config.url.SlackIcon,
      name: "Stack",
    },
  ];

  const handleSubmitEmail: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const form = new FormData(formElement);
    const passForm = Object.fromEntries(form.entries());

    if (isEmail(passForm.email)) {
      setEmailStatus(!emailStatus);
    }
  };

  return (
    <EntryLayout>
      <div className={cx("content")}>
        <div className={cx("header")}>
          <h1>WINTO</h1>
          <p>Login to continue</p>
        </div>
        <form className={cx("login")} onSubmit={handleSubmitEmail}>
          {emailStatus ? (
            <div className={cx("login-email")}>
              <p>{loginData?.email}</p>
              <MdModeEdit
                style={{
                  height: "24px",
                  width: "24px",
                  color: "rgb(66, 82, 110)",
                }}
                onClick={() => setEmailStatus(false)}
              />
            </div>
          ) : (
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginData?.email}
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          )}

          {emailStatus && (
            <Input
              type="password"
              placeholder="Enter password"
              autoComplete="new-password"
              value={loginData?.password}
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          )}
          <Button type="submit">Continue</Button>
        </form>
        <div className={cx("login-by-order-socials")}>
          <p className={cx("")}>Or continue with:</p>

          {socialLogin.map((e, i) => (
            <Button className={cx("button__socials")} key={i} leftIcon={e.img}>
              {e.name}
            </Button>
          ))}
          <div className={cx("register")}>
            <Link to="#">Can't log in?</Link>
            <a>
              <BsDot />
            </a>
            <Link to={config.routes.signup.path}>Create an account</Link>
          </div>
        </div>
        <div className={cx("footer")}>KIENHOANG</div>
      </div>
    </EntryLayout>
  );
};

export default Login;
