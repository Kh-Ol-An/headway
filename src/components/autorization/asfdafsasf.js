import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signupOperation } from '../../redux/session/sessionOperations';
import { closeModal } from '../../redux/ModalRegistration/ModalRegistrationActions';
import { getErrorMessageRegistration } from '../../redux/sessionLogin/sessionLoginSelectors';
import s from './ModalRegistration.module.css';
import logo from '../../assets/images/login-page-logo@1X.png';
import { ReactComponent as OpenEye } from '../../assets/svg/openEye.svg';
import { ReactComponent as CloseEye } from '../../assets/svg/closeEye.svg';
import IconsAvatar from '../IconAvatar/IconAvatar';

class ModalRegistration extends Component {
  static propTypes = {
    onSignUp: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
  };

  static defaultProps = {
    errorMessage: '',
  };

  state = {
    name: '',
    age: '',
    email: '',
    password: '',
    rePassword: '',
    showPassword: 'password',
    errorRePassword: '',
    avatar: 'https://go-to-goal.goit.co.ua/image/avatar_008.png',
    formErrors: { name: '', age: '', email: '', password: '' },
    formValid: false,
    nameValid: false,
    ageValid: false,
    emailValid: false,
    passwordValid: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateField(name, value));
  };

  handleSubmitForm = e => {
    e.preventDefault();

    const { name, age, email, password, rePassword, avatar } = this.state;
    const { onSignUp } = this.props;
    if (password === rePassword) {
      onSignUp({
        name,
        email,
        password,
        age,
        avatar,
        isChild: true,
      });
    } else {
      this.setState({
        errorRePassword: 'Паролі не співпадають!!!',
      });
    }
  };

  validateField = (fieldName, value) => {
    const {
      formErrors,
      nameValid,
      ageValid,
      emailValid,
      passwordValid,
    } = this.state;
    const fieldValidationErrors = formErrors;
    let fieldNameValid = nameValid;
    let fieldAgeValid = ageValid;
    let fieldEmailValid = emailValid;
    let fieldPasswordValid = passwordValid;
    switch (fieldName) {
      case 'name':
        fieldNameValid =
          // eslint-disable-next-line no-useless-escape
          /^[a-zA-Zа-яА-Я\s]+[a-zA-Zа-яА-ЯёЁ'іІїЇ]{1,16}$/.test(value);
        fieldValidationErrors.name = fieldNameValid
          ? ''
          : "Вибач, але нам потрiбне iм'я вiд 2 до 12 символiв, яке мiстить тiльки лiтери...";
        break;

      case 'age':
        fieldAgeValid =
          // eslint-disable-next-line no-useless-escape
          /^\d+$/.test(value) && value >= 3 && value <= 99;
        fieldValidationErrors.age = fieldAgeValid
          ? ''
          : `Вибач, але тобi має бути вiд 3 до 99 рокiв :)`;
        break;

      case 'email':
        fieldEmailValid =
          // eslint-disable-next-line no-useless-escape
          /^([a-zA-Z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/.test(value);
        fieldValidationErrors.email = fieldEmailValid
          ? ''
          : 'Нажаль, таких email адрес не iснує...';
        break;

      case 'password':
        fieldPasswordValid = value.length >= 6 && value.length <= 12;
        fieldValidationErrors.password = fieldPasswordValid
          ? ''
          : 'Вибач, але нам потрiбен пароль вiд 6 до 12 символiв...';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        nameValid: fieldNameValid,
        ageValid: fieldAgeValid,
        emailValid: fieldEmailValid,
        passwordValid: fieldPasswordValid,
      },
      this.validateForm,
    );
  };

  validateForm = () => {
    const { nameValid, ageValid, emailValid, passwordValid } = this.state;
    this.setState({
      formValid: nameValid && ageValid && emailValid && passwordValid,
    });
  };

  handleCloseModal = () => {
    // eslint-disable-next-line no-shadow
    const { closeModal } = this.props;

    closeModal();
  };

  changeUserPic = avatar => {
    return this.setState({ avatar });
  };

  onShowPassword = () => {
    this.setState(prevState => ({
      showPassword: prevState.showPassword === 'password' ? 'text' : 'password',
    }));
  };

  render() {
    const {
      name,
      age,
      email,
      password,
      showPassword,
      rePassword,
      errorRePassword,
      formErrors,
      formValid,
      nameValid,
      ageValid,
      emailValid,
      passwordValid,
    } = this.state;
    const { errorMessage } = this.props;
    const windowWidth = document.documentElement.clientWidth;

    return (
      <div className={s.reg_container}>
        {windowWidth < 900 && (
          <img src={logo} alt="logo" width="104" className={s.logo} />
        )}
        <h1 className={s.title_h1}>Реєстрація</h1>
        <div className={s.form_container}>
          <form className={s.form} onSubmit={this.handleSubmitForm}>
            <h2 className={s.title_h2}>Дитина</h2>
            <div className={s.box_input}>
              {/* name */}
              <div className={s.current_input_box}>
                <input
                  maxLength="12"
                  required
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  placeholder="Вкажи своє iм'я..."
                  autoFocus
                />
                <div className={s.error_name}>
                  {!formValid && !nameValid && <i>{formErrors.name}</i>}
                </div>
              </div>

              {/* age */}
              <div className={s.current_input_box}>
                <input
                  required
                  type="number"
                  name="age"
                  value={age}
                  onChange={this.handleChange}
                  placeholder="Вкажи свій вік..."
                />
                <div className={s.error_age}>
                  {!formValid && !ageValid && <i>{formErrors.age}</i>}
                </div>
              </div>

              {/* email */}
              <div className={s.current_input_box}>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  placeholder="Введи свiй email/логiн..."
                />
                <div className={s.error}>
                  {!formValid && !emailValid && <i>{formErrors.email}</i>}
                </div>
              </div>

              {/* password */}
              <div className={s.current_input_box}>
                <div className={s.box_showPassword}>
                  <input
                    required
                    type={showPassword}
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    placeholder="Введи свiй пароль..."
                  />
                  <button
                    type="button"
                    onClick={this.onShowPassword}
                    className={s.btn_eye}
                  >
                    {showPassword === 'text' ? (
                      <CloseEye className={s.eye} />
                    ) : (
                      <OpenEye className={s.eye} />
                    )}
                  </button>
                </div>
                <div className={s.error}>
                  {!formValid && !passwordValid && <i>{formErrors.password}</i>}
                </div>
              </div>

              {/* rePassword */}
              <div className={s.current_input_box}>
                <div className={s.box_showPassword}>
                  <input
                    required
                    type={showPassword}
                    name="rePassword"
                    value={rePassword}
                    onChange={this.handleChange}
                    placeholder="Підтверди пароль..."
                  />
                  <button
                    type="button"
                    onClick={this.onShowPassword}
                    className={s.btn_eye}
                  >
                    {showPassword === 'text' ? (
                      <CloseEye className={s.eye} />
                    ) : (
                      <OpenEye className={s.eye} />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={s.error}>
              <i>{errorRePassword || ''}</i>
              {errorMessage && (
                <i>
                  Вибач, але у нас виникли деякi труднощi. Спробуй пiзнiше...
                </i>
              )}
            </div>

            {windowWidth < 900 && (
              <IconsAvatar
                className={s.user_image_component}
                changeAvatar={this.changeUserPic}
              />
            )}

            <div className={s.box_btn}>
              <button type="button" onClick={this.handleCloseModal}>
                Назад
              </button>
              <button type="submit" disabled={!formValid}>
                Зареєструватися
              </button>
            </div>
          </form>

          {windowWidth >= 900 && (
            <IconsAvatar
              className={s.user_image_component}
              changeAvatar={this.changeUserPic}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  errorMessage: getErrorMessageRegistration(store),
});

const mapDispatchToProps = {
  onSignUp: signupOperation,
  closeModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalRegistration);
