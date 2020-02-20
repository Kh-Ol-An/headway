import React, { Component } from "react";
import { ReactComponent as OpenEye } from "../../assets/openEye.svg";
import { ReactComponent as CloseEye } from "../../assets/closeEye.svg";
import s from "./Signup.module.css";

export default class Signup extends Component {
  state = {
    email: "",
    password: "",
    rePassword: "",
    showPassword: "password",
    errorRePassword: "",
    formErrors: { email: "", password: "" },
    emailValid: false,
    passwordValid: false,
    formValid: false
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateField(name, value));
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password, rePassword } = this.state;
    if (password === rePassword) {
      localStorage.setItem(email, password);
      this.props.history.replace("/chat");
    } else {
      this.setState({
        errorRePassword: "Пароли не совпадают!!!"
      });
    }
  };

  onShowPassword = () => {
    this.setState(prevState => ({
      showPassword: prevState.showPassword === "password" ? "text" : "password"
    }));
  };

  validateField = (fieldName, value) => {
    const { formErrors, emailValid, passwordValid } = this.state;
    const fieldValidationErrors = formErrors;
    let fieldEmailValid = emailValid;
    let fieldPasswordValid = passwordValid;
    switch (fieldName) {
      case "email":
        fieldEmailValid =
          // eslint-disable-next-line no-useless-escape
          /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/.test(value);
        fieldValidationErrors.email = fieldEmailValid
          ? ""
          : "К сожалению, таких email адресов не существует...";
        break;
      case "password":
        fieldPasswordValid = value.length >= 6 && value.length <= 12;
        fieldValidationErrors.password = fieldPasswordValid
          ? ""
          : "Извини, но нам нужен пароль от 6 до 12 символов...";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: fieldEmailValid,
        passwordValid: fieldPasswordValid
      },
      this.validateForm
    );
  };

  validateForm = () => {
    const { emailValid, passwordValid } = this.state;
    this.setState({
      formValid: emailValid && passwordValid
    });
  };

  render() {
    const {
      email,
      password,
      showPassword,
      rePassword,
      errorRePassword,
      formErrors,
      emailValid,
      passwordValid,
      formValid
    } = this.state;
    return (
      <div className={s.signup}>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            required
            placeholder="Введите свой email..."
            autoFocus
          />
          <div className={s.passwordWrap}>
            <input
              type={showPassword}
              name="password"
              value={password}
              onChange={this.handleChange}
              required
              placeholder="Введите свой пароль..."
            />
            <button
              className={s.btnEye}
              type="button"
              onClick={this.onShowPassword}
            >
              {showPassword === "text" ? (
                <CloseEye className={s.eye} />
              ) : (
                <OpenEye className={s.eye} />
              )}
            </button>
          </div>
          <div className={s.passwordWrap}>
            <input
              type={showPassword}
              name="rePassword"
              value={rePassword}
              onChange={this.handleChange}
              required
              placeholder="Повтори пароль..."
            />
            <button
              className={s.btnEye}
              type="button"
              onClick={this.onShowPassword}
            >
              {showPassword === "text" ? (
                <CloseEye className={s.eye} />
              ) : (
                <OpenEye className={s.eye} />
              )}
            </button>
          </div>
          <button className={s.btnSignup} type="submit" disabled={!formValid}>
            Зарегистрируйтесь
          </button>
        </form>

        {!formValid && !emailValid && <i>{formErrors.email}</i>}
        {!formValid && !passwordValid && <i>{formErrors.password}</i>}
        <i>{errorRePassword || ""}</i>
      </div>
    );
  }
}
