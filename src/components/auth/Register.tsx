import {
  createTheme,
  lightThemePrimitives,
  ThemeProvider,
  useStyletron,
} from "baseui";
import { Button } from "baseui/button";
import {
  InputAuth,
  InputPassword,
  LinkSmallStyle,
  LinkStyle,
} from "common/Inputs";
import EyeClose from "icons/EyeClose";
import EyeOpen from "icons/EyeOpen";
import React from "react";
import "./index.css";
import { Checkbox, LABEL_PLACEMENT, STYLE_TYPE } from "baseui/checkbox";
import { expressions, onlyText, passwordExp } from "helpers/generalHelpers";
import { useForm } from "react-hook-form";
import { Spinner } from "baseui/spinner";

interface PropsType {
  setSignUpMode: (signUpMode: boolean) => void;
}

const Register = ({ setSignUpMode }: PropsType) => {
  const { handleSubmit } = useForm();
  const [css, $theme] = useStyletron();
  const [user, setUser] = React.useState({
    fullName: "",
    email: "",
    password: "",
    passwordConfirm: "",
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
  const [checked, setChecked] = React.useState(false);
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
    if (key === "fullName") {
      setErrors({
        ...errors,
        fullName: expressions.fullName.test(user.fullName) ? false : true,
      });
    }
    if (key === "email") {
      setErrors({
        ...errors,
        email: expressions.email.test(user.email) ? false : true,
      });
    }
    if (key === "password") {
      setErrors({
        ...errors,
        password: expressions.password.test(user.password) ? false : true,
        passwordConfirm: user.password !== user.passwordConfirm,
      });
    }
    if (key === "passwordConfirm") {
      setErrors({
        ...errors,
        passwordConfirm: user.password !== user.passwordConfirm,
      });
    }
  };

  React.useEffect(() => {
    if (
      !errors?.fullName &&
      !errors?.email &&
      !errors?.password &&
      !errors?.passwordConfirm &&
      checked
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [errors, checked]);

  const onSubmit = () => {
    setIsLoading(true);
    console.log(user);
  };

  const goToSignIn = () => {
    setSignUpMode(false);
    setUser({
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });
    setChecked(false);
  };

  return (
    <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
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
        Sign up
      </h2>
      <div className="input-container">
        <div className="input-group">
          <InputAuth
            className={css({
              border: errors?.fullName
                ? "2px solid #ff6060"
                : "2px solid #dddfe2",
            })}
            id="fullName"
            readOnly
            onFocus={() => RemoveReadOnly("fullName")}
            onBlur={() => onBlur("fullName")}
            required
            name="fullName"
            type="text"
            value={user.fullName}
            onChange={(e) =>
              onlyText(e.target.value) && onChange("fullName", e.target.value)
            }
          />
          <label
            className={css({
              top: user.fullName.length >= 1 ? "0" : "25px",
              font:
                user.fullName.length >= 1
                  ? "12px Poppins, sans-serif"
                  : "16px Poppins, sans-serif",
              color: errors?.fullName
                ? placeholderErrorColor
                : placeholderInactiveColor,
            })}
          >
            Nombre completo
          </label>
          {errors?.fullName ? <p>Este campo es obligatorio</p> : ""}
        </div>
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
          {errors?.password ? (
            <p>
              La contraseña debe contener al menos 6 caracteres, una letra
              mayúscula, una minúscula y un número
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="input-group">
          {typePassword.passwordConfirm === "password" ? (
            <span
              className={css({
                position: "absolute",
                right: "10px",
                top: "25px",
                transform: "translateY(-13px)",
                height: "25px",
                cursor: "pointer",
              })}
              onClick={() => onChangeTypePassword("passwordConfirm", "text")}
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
              onClick={() =>
                onChangeTypePassword("passwordConfirm", "password")
              }
            >
              <EyeOpen />
            </span>
          )}
          <InputPassword
            className={css({
              border: errors?.passwordConfirm
                ? "2px solid #ff6060"
                : "2px solid #dddfe2",
            })}
            id="passwordConfirm"
            readOnly
            onFocus={() => RemoveReadOnly("passwordConfirm")}
            onBlur={() => onBlur("passwordConfirm")}
            required
            name="passwordConfirm"
            type={typePassword.passwordConfirm}
            value={user.passwordConfirm}
            onChange={(e) =>
              passwordExp(e.target.value) &&
              onChange("passwordConfirm", e.target.value)
            }
          />
          <label
            className={css({
              top: user.passwordConfirm.length >= 1 ? "0" : "25px",
              font:
                user.passwordConfirm.length >= 1
                  ? "12px Poppins, sans-serif"
                  : "16px Poppins, sans-serif",
              color: errors?.passwordConfirm
                ? placeholderErrorColor
                : placeholderInactiveColor,
            })}
          >
            Confirmar contraseña
          </label>
          {errors?.passwordConfirm ? (
            <p>Las contraseñas no coinciden. Inténtalo de nuevo</p>
          ) : (
            ""
          )}
        </div>
        <div
          className={css({
            display: "flex",
            flexDirection: "row",
            marginBottom: "20px",
          })}
        >
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              paddingRight: "10px",
            })}
          >
            <Checkbox
              required
              checkmarkType={STYLE_TYPE.toggle}
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              labelPlacement={LABEL_PLACEMENT.right}
            ></Checkbox>
          </div>
          <div
            className={css({
              display: "block",
              fontSize: "12px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "500",
            })}
          >
            Al registrarte, aceptas nuestros
            <LinkSmallStyle
              className={css({
                marginLeft: "3px",
              })}
            >
              Términos de servicios
            </LinkSmallStyle>
            {" y"}
            <LinkSmallStyle
              className={css({
                marginLeft: "3px",
              })}
            >
              Política de privacidad.
            </LinkSmallStyle>
          </div>
        </div>
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            paddingBottom: "15px",
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
                "Registrarte"
              )}
            </Button>
          </ThemeProvider>
        </div>
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
            fontSize: "14px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "500",
          })}
        >
          <span>¿Ya tienes una cuenta?</span>
          <LinkStyle
            className={css({
              marginLeft: "5px",
            })}
            onClick={goToSignIn}
          >
            Iniciar sesión
          </LinkStyle>
        </div>
      </div>
    </form>
  );
};

export default Register;
