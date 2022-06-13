import "../styles/UserStyle.css";
import { useSelector } from "react-redux";

const User = () => {
  const name = useSelector((state) => state.updater.name);
  const phone = useSelector((state) => state.updater.phone);

  return (
    <div className="userContainer">
      <div className="line">
        <div className="lable">User name:</div>
        <div className="data">{name}</div>
      </div>
      <div className="line">
        <div className="lable">Phone Number: </div>
        <div className="data">{phone}</div>
      </div>
    </div>
  );
};

export default User;
