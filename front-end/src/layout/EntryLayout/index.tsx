import classNames from "classnames/bind";
import style from "./entrylayout.module.scss";
import config from "../../config";

const cx = classNames.bind(style);

interface Props {
  children: JSX.Element;
}

const EntryLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={cx("container")}>
      <img
        className={cx("bg-img1")}
        src={config.url.bgImg1EntryLayout}
        alt=""
      />
      <img
        className={cx("bg-img2")}
        src={config.url.bgImg2EntryLayout}
        alt=""
      />
      {children}
    </div>
  );
};

export default EntryLayout;
