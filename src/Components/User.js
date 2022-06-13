import "../styles/UserStyle.css";
import { useSelector } from "react-redux";
import { Paper } from "@material-ui/core";

const User = () => {
  const name = useSelector((state) => state.updater.name);
  const phone = useSelector((state) => state.updater.phone);

  return (
    <Paper className="userContainer">
      <div className="userName">
        <div className="lable">User name:</div>
        <div>{name}</div>
      </div>
      <div className="phoneNumber">
        <div className="lable">Phone Number: </div>
        <div>{phone}</div>
      </div>
    </Paper>
  );
};

export default User;
