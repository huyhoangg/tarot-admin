import type { FC } from "react";
import { Button, DarkThemeToggle, Navbar } from "flowbite-react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AdminAuthContext";
import { useNavigate } from "react-router-dom";


const ExampleNavbar: FC = function () {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("context may be null");
  }

  const { userInfo, setUserInfo } = auth;

  const navigate = useNavigate();

  async function handleLogOut(e:any) {
    e.preventDefault();
    try {
      await axios.post("/v1/auth/logout");
      setUserInfo(null);
      console.log("logout successful");
      navigate("/login")
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <Navbar fluid>
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navbar.Brand href="/">
              <img alt="" src="/images/logo.svg" className="mr-3 h-6 sm:h-8" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                Flowbite
              </span>
            </Navbar.Brand>
          </div>
          <div className="flex items-center gap-3">
            <h2>hi, {userInfo && userInfo.username}</h2>
            <Button color="primary" onClick={handleLogOut}>
              Log out
            </Button>
            <DarkThemeToggle />
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default ExampleNavbar;
