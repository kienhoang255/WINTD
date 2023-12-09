import classNames from "classnames/bind";
import style from "./input.module.scss";
import { MdError, MdGppGood, MdWarning } from "react-icons/md";

const cx = classNames.bind(style);

interface Props {
  placeholder?: string;
  type?: "text" | "email" | "password";
  autoComplete?: string;
  id?: string;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errMsg?: string;
  status?: keyof typeof Status;
}

enum Status {
  error = "error",
  warning = "warning",
  success = "success",
  "" = "",
}

const Input: React.FC<Props> = ({
  placeholder,
  type = "text",
  autoComplete,
  id,
  name,
  value,
  status = Status[""],
  errMsg,
  onChange,
}) => {
  return (
    <div className={cx("container")}>
      <div className={cx("content", status)}>
        <input
          id={id}
          name={name}
          value={value || ""}
          className={cx("input")}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={onChange}
        />
      </div>
      {status && (
        <div className={cx("validate-status", status)}>
          <span>
            {status == "error" ? (
              <MdError />
            ) : status == "warning" ? (
              <MdWarning />
            ) : (
              <MdGppGood />
            )}
          </span>
          <p>{errMsg ? errMsg : "ERROR"}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
