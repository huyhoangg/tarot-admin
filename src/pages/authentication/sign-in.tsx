/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useContext, type FC, useState } from "react";
import { AuthContext } from "../../contexts/AdminAuthContext";
import axios from "axios";

const SignInPage: FC = function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const authContext = useContext(AuthContext);

  async function handleLoginSubmit(e: any) {
    e.preventDefault();
    try {
      const user = await axios.post("/v1/auth/loginAdmin", { email, password });
      authContext.setUserInfo(user.data);
      console.log("login successful");
    } catch (e: any) {
      setErrorMessage(e.response.data);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <div className="my-6 flex items-center gap-x-1 lg:my-0">
        <img
          alt="Flowbite logo"
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-12"
        />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          Flowbite
        </span>
      </div>
      <Card
        horizontal
        imgSrc="/images/authentication/login.jpg"
        imgAlt=""
        className="w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block"
      >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Sign in to admin platform
        </h1>
        <form>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">Your email</Label>
            <TextInput
              id="email"
              name="email"
              placeholder="name@company.com"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="password">Your password</Label>
            <TextInput
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <h2 className="text-red-500 mb-3">{errorMessage}</h2>

          <div className="mb-6">
            <Button
              type="submit"
              className="w-full lg:w-auto"
              onClick={handleLoginSubmit}
            >
              Login to your account
            </Button>
          </div>

        </form>
      </Card>
    </div>
  );
};

export default SignInPage;
