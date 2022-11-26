import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { StyledLink } from "baseui/link";
import { styled } from "baseui";
import { History } from "history";
import { LOGIN_PATH } from "routes/constants";

interface PropsType {
  history: History;
}
const ImgUI = styled("img", {
  justifySelf: "center",
  alignSelf: "center",
  height: "80px",
  width: "300px",
  paddingBottom: "20px",
});
const FormUI = styled("form", {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "stretch",
  flex: "1",
  width: "100%",
});
const ContainerUI = styled("div", {
  paddingBottom: "20px",
});
const AccountRegister = ({ history }: PropsType) => {
  const [error, setError] = React.useState([] as any);
  const { handleSubmit, setValue } = useForm();

  const showError = () => {
    if (error?.length) {
      return error.map((e: { message: string }, i: number) => (
        <div key={i} color={"negative"}>
          {e?.message}
        </div>
      ));
    }
  };
  return (
    <Block
      position={"fixed"}
      maxWidth={"552px"}
      height={"auto"}
      overflow={"auto"}
      margin={"100px auto 0"}
      top={["10px", "20px", "50px"]}
      left={["10px", "20px", "25%"]}
      right={["10px", "20px", "25%"]}
    >
      <FormUI>
        <ImgUI
          src={
            "https://paybase-images.s3.amazonaws.com/paybase-images/paybaselogo.png"
          }
        />
        <h4>Crear una nueva cuenta</h4>
        <ContainerUI>{error?.length ? showError() : null}</ContainerUI>
        <ContainerUI>
          <Input
            required
            placeholder="email"
            name="email"
            type="email"
            onChange={(value) => setValue("email", value)}
          />
        </ContainerUI>
        <ContainerUI>
          <Input
            required
            type="password"
            placeholder="password"
            name="password"
            onChange={(value) => setValue("password", value)}
          />
        </ContainerUI>
        <ContainerUI>
          <StyledLink
            href={"#login"}
            onClick={() => history.push(`/${LOGIN_PATH}`)}
          >
            Iniciar sesión
          </StyledLink>
        </ContainerUI>
        <Button
          //isLoading={isLoading}
          type="submit"
        >
          Crear cuenta
        </Button>
      </FormUI>
    </Block>
  );
};
export default AccountRegister;
