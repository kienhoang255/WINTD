import EntryLayout from "../../layout/EntryLayout";

import Button from "../../components/Button";

import Input from "../../components/Input";
import { useState } from "react";
import { isEmail } from "./../../util/index";
import config from "../../config";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import style from "./signup.module.scss";
const cx = classNames.bind(style);

const SignUp = () => {
  const [sendEmail, setSendEmail] = useState(false);
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
      setSendEmail(!sendEmail);
      console.log(fakeSendEmail());
      // const test = fakeSendEmail();
      // setSendEmail(test ? true : false);
    }
  };

  const fakeSendEmail = () => {
    setTimeout(() => {
      setSendEmail(false);
      return true;
    }, 3000);
  };

  return (
    <EntryLayout>
      <div className={cx("content")}>
        <div className={cx("header")}>
          <h1>WINTO</h1>
          <p>Sign up to continue</p>
        </div>
        <form className={cx("login")} onSubmit={handleSubmitEmail}>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={loginData?.email}
            status=""
            errMsg="Please enter your email"
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <p className={cx("legal-message")}>
            By signing up, I accept the Atlassian
            <a href="#">Cloud Terms of Service and</a>
            acknowledge the <a href="#">Privacy Policy</a>.
          </p>

          <Button type="submit" loading={sendEmail}>
            Sign up
          </Button>
        </form>
        <div className={cx("login-by-order-socials")}>
          <p className={cx("")}>Or continue with:</p>

          {socialLogin.map((e, i) => (
            <Button className={cx("button__socials")} key={i} leftIcon={e.img}>
              {e.name}
            </Button>
          ))}
          <div className={cx("register")}>
            <Link to={config.routes.login.path}>
              Already have an Atlassian account? Log in
            </Link>
          </div>
        </div>
        <div className={cx("footer")}>KIENHOANG</div>
      </div>
    </EntryLayout>
  );
};

export default SignUp;
