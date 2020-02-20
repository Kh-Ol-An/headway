import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as OpenEye } from "../../assets/openEye.svg";
import { ReactComponent as CloseEye } from "../../assets/closeEye.svg";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    showPassword: "password",
    errorLogin: "",
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

    const { email, password } = this.state;

    if (password === localStorage.getItem(email)) {
      this.props.history.replace("/chat");
    } else {
      this.setState({
        errorLogin: "Пользователь с такими данными не зарегистрирован."
      });
    }

    this.reset();
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

  reset = () => {
    this.setState({
      email: "",
      password: "",
      showPassword: "password",
      formErrors: { email: "", password: "" },
      emailValid: false,
      passwordValid: false,
      formValid: false
    });
  };

  render() {
    const {
      email,
      password,
      showPassword,
      errorLogin,
      formErrors,
      emailValid,
      passwordValid,
      formValid
    } = this.state;
    return (
      <>
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
          <div>
            <input
              type={showPassword}
              name="password"
              value={password}
              onChange={this.handleChange}
              required
              placeholder="Введите свой пароль..."
            />
            <button type="button" onClick={this.onShowPassword}>
              {showPassword === "text" ? <CloseEye /> : <OpenEye />}
            </button>
          </div>
          <button type="submit" disabled={!formValid}>
            Войдите
          </button>
          <span>или</span>
          <Link to="/signup">Зарегистрируйтесь</Link>
        </form>

        {!formValid && !emailValid && <i>{formErrors.email}</i>}
        {!formValid && !passwordValid && <i>{formErrors.password}</i>}
        <i>{errorLogin || ""}</i>
      </>
    );
  }
}
