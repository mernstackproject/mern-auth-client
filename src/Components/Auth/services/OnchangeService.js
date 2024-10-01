import { emailRegex, passwordRegex } from "./Regex";


export const onError = () => {};
export const handleChange = (e, formData, setFormData) => {
  let allFromData = { ...formData };
  const { name, value } = e.target;
  if (name === "name") {
    if (value === "") {
      allFromData["nameError"] = "Name is required";
    } else {
      allFromData["nameError"] = "";
    }
  }
  if (name === "email") {
    if (value === "") {
      allFromData["emailError"] = "Email is required";
    } else if (!emailRegex.test(value)) {
      allFromData["emailError"] = "Email is invalid";
    } else {
      allFromData["emailError"] = "";
    }
  }
  if (name === "password") {
    if (value === "") {
      allFromData["passwordError"] = "Password is required";
    } else if (!passwordRegex.test(value)) {
      allFromData["passwordError"] =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., @, $, !, %, etc.)";
    } else {
      allFromData["passwordError"] = "";
    }
  }
  setFormData({
    ...allFromData,
    [name]: value,
  });
};
// {here login onChange} //
export const handleChangeLogin = (e,loginForm, setLoginForm)=>{
  let allFromData = { ...loginForm };
  const { name, value } = e.target;
  if (name === "email") {
    
    if (value === "") {
      allFromData["emailError"] = "Email is required";
    } else if (!emailRegex.test(value)) {
      allFromData["emailError"] = "Email is invalid";
    } else {
      allFromData["emailError"] = "";
    }
  }
  if (name === "password") {
    if (value === "") {
      allFromData["passwordError"] = "Password is required";
    } else if (!passwordRegex.test(value)) {
      allFromData["passwordError"] =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., @, $, !, %, etc.)";
    } else {
      allFromData["passwordError"] = "";
    }
  }
  setLoginForm({
    ...allFromData,
    [name]: value,
  });
}