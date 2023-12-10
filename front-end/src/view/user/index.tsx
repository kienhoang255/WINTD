import classNames from "classnames/bind";
import style from "./user.module.scss";
import UserLayout from "../../layout/UserLayout";

const cx = classNames.bind(style);

const User = () => {
  return (
    <UserLayout>
      <div className={cx("container")}>
        {/* <Dropdown id={} rightIcon={<MdKeyboardArrowDown />}>User</Dropdown> */}
      </div>
    </UserLayout>
  );
};

export default User;
