import styled from "styled-components";

const primaryColor = "#254f95";
const primary700Color = "#162f58";
const inactiveInpColor = "#dddfe2";
const inactiveIconColor = "#acb0b5";

export const InputText = styled.input`
  border: 2px solid ${inactiveInpColor};
  border-radius: 8px;
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-family: Poppins, sans-serif;
  padding: 14px;
  transition: 0.4s ease all;
  outline: none;
  &:focus {
    border-color: ${primaryColor};
  }
`;

export const InputAuth = styled.input`
  border-radius: 8px;
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-family: Poppins, sans-serif;
  padding: 14px;
  transition: 0.4s ease all;
  outline: none;
  &:focus {
    border-color: ${primaryColor};
  }
`;

export const InputPassword = styled.input`
  border-radius: 8px;
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-family: Poppins, sans-serif;
  padding-left: 14px;
  padding-top: 14px;
  padding-bottom: 14px;
  padding-right: 40px;
  transition: 0.4s ease all;
  outline: none;
  &:focus {
    border-color: ${primaryColor};
  }
`;

export const ButtonStyle = styled.div`
  width: 100%;
  height: 47px;
  border-radius: 8px;
  font-size: 16px;
  font-family: Poppins, sans-serif;
  font-weight: 500;
  background: ${primaryColor};
  border: none;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s ease all;
  &:hover {
    background: ${primary700Color};
    cursor: pointer;
  }
`;

export const LinkStyle = styled.span`
  font-size: 14px;
  font-family: Poppins, sans-serif;
  font-weight: 500;
  cursor: pointer;
  color: ${primaryColor};
  transition: 0.4s ease all;
  &:hover {
    color: ${primary700Color};
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const LinkSmallStyle = styled.span`
  font-size: 12px;
  font-family: Poppins, sans-serif;
  font-weight: 500;
  cursor: pointer;
  color: ${primaryColor};
  transition: 0.4s ease all;
  &:hover {
    color: ${primary700Color};
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const IconStyle = styled.div`
  fill: ${primaryColor};
`;

export const SvgStyle = styled.svg`
  fill: ${inactiveIconColor};
  transition: 0.4s ease all;
  &:hover {
    fill: ${primaryColor};
  }
`;
