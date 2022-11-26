import { useStyletron } from "baseui";
import React from "react";
import "./index.css";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const [css] = useStyletron();
  const [signUpMode, setSignUpMode] = React.useState(false);

  return (
    <div>
      <div className={`${"container"}${signUpMode ? " sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <Login setSignUpMode={setSignUpMode} />
            <Register setSignUpMode={setSignUpMode} />
          </div>
        </div>
        <div
          className={`${"container1"}${signUpMode ? " sign-up-mode" : ""}`}
        ></div>
        <div
          className={`${"container2"}${signUpMode ? " sign-up-mode" : ""}`}
        ></div>
        <div
          className={`${"container3"}${signUpMode ? " sign-up-mode" : ""}`}
        ></div>
        <div
          className={`${"container4"}${signUpMode ? " sign-up-mode" : ""}`}
        ></div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h1
                className={css({
                  color: "#ffff",
                  fontFamily: "cursive",
                  fontSize: "60px",
                })}
              >
                LOGOTIPO
              </h1>
            </div>
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h1
                className={css({
                  color: "#ffff",
                  fontFamily: "cursive",
                  fontSize: "60px",
                })}
              >
                LOGOTIPO
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>FOOTER</h1>
      </div>
    </div>
  );
};
export default Auth;
