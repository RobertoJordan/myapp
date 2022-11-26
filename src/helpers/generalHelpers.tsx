export const onlyText = (value: string) => {
  const regex = new RegExp(/^[a-zA-ZÀ-ÿ\s]{1,40}$/);
  if (value === "") return true;
  return regex.test(value);
};

export const passwordExp = (value: string) => {
  const regex = new RegExp(/^[0-9a-zA-Z_.+-?'¡¿!"#$%&/<>°|¬;:¨@]{0,30}$/);
  if (value === "") return true;
  return regex.test(value);
};

export const expressions = {
  userName: /^[a-zA-Z0-9\_\-]{4,30}$/, // Letras, numeros, guion y guion_bajo
  fullName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password:
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z_.+-?'¡¿!"#$%&/<>°|¬;:¨@]{6,}$/, // 6 a 20 digitos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  phone: /^\d{7,14}$/, // 7 a 14 numeros.
};
