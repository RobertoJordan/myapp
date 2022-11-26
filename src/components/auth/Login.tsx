import {
  createTheme,
  lightThemePrimitives,
  ThemeProvider,
  useStyletron,
} from "baseui";
import { Button } from "baseui/button";
import { Spinner } from "baseui/spinner";
import { InputAuth, InputPassword, LinkStyle } from "common/Inputs";
import { expressions, passwordExp } from "helpers/generalHelpers";
import EyeClose from "icons/EyeClose";
import EyeOpen from "icons/EyeOpen";
import React from "react";
import { useForm } from "react-hook-form";
import "./index.css";

interface PropsType {
  setSignUpMode: (signUpMode: boolean) => void;
}

const Login = ({ setSignUpMode }: PropsType) => {
  const { handleSubmit } = useForm();
  const [css, $theme] = useStyletron();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [typePassword, setTypePassword] = React.useState({
    password: "password",
    passwordConfirm: "password",
  });
  const [btnDisabled, setBtnDisabled] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const placeholderInactiveColor = "#acb0b5";
  const placeholderErrorColor = "#ff6060";
  const btnInactiveColor = "#b2defc";
  const [errors, setErrors] = React.useState<any>({});

  const RemoveReadOnly = (key: string) => {
    const att = document.getElementById(key);
    att?.removeAttribute("readOnly");
    setErrors({ ...errors, [key]: false });
  };

  const onChange = (key: string, value: string) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  const onChangeTypePassword = (key: string, value: string) => {
    setTypePassword({
      ...typePassword,
      [key]: value,
    });
  };

  const onBlur = (key: string) => {
    if (key === "email") {
      setErrors({
        ...errors,
        email: expressions.email.test(user.email) ? false : true,
      });
    }
    if (key === "password") {
      setErrors({
        ...errors,
        password: user.password.length >= 1 ? false : true,
      });
    }
  };

  React.useEffect(() => {
    if (
      user.email.length >= 1 &&
      user.password.length >= 1 &&
      !errors?.email &&
      !errors?.password
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [user, errors]);

  const onSubmit = () => {
    setIsLoading(true);
    console.log(user);
  };

  const goToSignUp = () => {
    setSignUpMode(true);
    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
      <h2
        className={css({
          color: $theme.colors.primary,
          height: "50px",
          marginTop: "10px",
          marginBottom: "10px",
          fontFamily: "Poppins, sans-serif",
          fontSize: "2.2rem",
        })}
      >
        Sign in
      </h2>
      <div className="input-container">
        <div className="input-group">
          <InputAuth
            className={css({
              border: errors?.email ? "2px solid #ff6060" : "2px solid #dddfe2",
            })}
            id="email"
            readOnly
            onFocus={() => RemoveReadOnly("email")}
            onBlur={() => onBlur("email")}
            required
            name="email"
            type="email"
            value={user.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
          <label
            className={css({
              top: user.email.length >= 1 ? "0" : "25px",
              font:
                user.email.length >= 1
                  ? "12px Poppins, sans-serif"
                  : "16px Poppins, sans-serif",
              color: errors?.email
                ? placeholderErrorColor
                : placeholderInactiveColor,
            })}
          >
            Correo electrónico
          </label>
          {errors?.email ? <p>Introduzca un correo electrónico válido</p> : ""}
        </div>
        <div className="input-group">
          {typePassword.password === "password" ? (
            <span
              className={css({
                position: "absolute",
                right: "10px",
                top: "25px",
                transform: "translateY(-13px)",
                height: "25px",
                cursor: "pointer",
              })}
              onClick={() => onChangeTypePassword("password", "text")}
            >
              <EyeClose />
            </span>
          ) : (
            <span
              className={css({
                position: "absolute",
                right: "10px",
                top: "25px",
                transform: "translateY(-13px)",
                height: "25px",
                cursor: "pointer",
              })}
              onClick={() => onChangeTypePassword("password", "password")}
            >
              <EyeOpen />
            </span>
          )}
          <InputPassword
            className={css({
              border: errors?.password
                ? "2px solid #ff6060"
                : "2px solid #dddfe2",
            })}
            id="password"
            readOnly
            onFocus={() => RemoveReadOnly("password")}
            onBlur={() => onBlur("password")}
            required
            name="password"
            type={typePassword.password}
            value={user.password}
            onChange={(e) =>
              passwordExp(e.target.value) &&
              onChange("password", e.target.value)
            }
          />
          <label
            className={css({
              top: user.password.length >= 1 ? "0" : "25px",
              font:
                user.password.length >= 1
                  ? "12px Poppins, sans-serif"
                  : "16px Poppins, sans-serif",
              color: errors?.password
                ? placeholderErrorColor
                : placeholderInactiveColor,
            })}
          >
            Contraseña
          </label>
          {errors?.password ? <p>Este campo es obligatorio</p> : ""}
        </div>
        {/* {error ? <div className="messageError">
          <p>Correo electrónico o contraseña incorrectos</p>
        </div> : ""} */}
        <div
          className={css({
            marginBottom: "20px",
          })}
        >
          <LinkStyle>¿Olvidaste tu contraseña?</LinkStyle>
        </div>
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            paddingBottom: "10px",
          })}
        >
          <ThemeProvider
            theme={createTheme(lightThemePrimitives, {
              colors: {
                buttonPrimaryFill: btnDisabled
                  ? btnInactiveColor
                  : $theme.colors.primary,
                buttonPrimaryText: "#ffffff",
                buttonPrimaryHover: btnDisabled
                  ? btnInactiveColor
                  : $theme.colors.buttonPrimaryHover,
                buttonPrimaryActive: btnDisabled
                  ? btnInactiveColor
                  : $theme.colors.buttonPrimaryHover,
              },
            })}
          >
            <Button
              type="submit"
              className={css({
                cursor: btnDisabled ? "default" : "pointer",
              })}
              onClick={() => (btnDisabled ? "" : onSubmit)}
            >
              {isLoading ? (
                <Spinner $color={$theme.colors.primary700} $size="20" />
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </ThemeProvider>
        </div>
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            fontSize: "14px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "500",
          })}
        >
          <span>¿No tienes una cuenta?</span>
          <LinkStyle
            className={css({
              marginLeft: "5px",
            })}
            onClick={goToSignUp}
          >
            Regístrate
          </LinkStyle>
        </div>
      </div>
    </form>
  );
};

export default Login;
