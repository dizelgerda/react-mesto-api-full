import React from 'react';
import {
  isEmail,
  minLength,
  notSpaces
} from './FormValidator';

const inputsErrors = {
  email: { isEmail: null },
  password: {
    minLength: null,
    notSpaces: null
  }
};
const isValid = {
  email: false,
  password: false
};
let isDisabled = true;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handlerChange = this.handlerChange.bind(this);

    this.validators = {
      email: { isEmail },
      password: {
        minLength: (value) => minLength(value, 9),
        notSpaces
      }
    };
  }

  checkValid(name, value) {
    Object.keys(this.validators[name]).forEach(key => inputsErrors[name][key] = this.validators[name][key](value));

    isValid.email = !Object.values(inputsErrors.email).some(i => (i === false) || (i === null));
    isValid.password = !Object.values(inputsErrors.password).some(i => (i === false) || (i === null));
    isDisabled = !(isValid.email && isValid.password);
  }

  handlerChange({ target }) {
    let { name, value } = target;
    value = value.trim();

    this.setState({ [name]: value })
    this.checkValid(name, value)
  }

  handlerSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;
    this.props.onSubmit({ email, password });
  }

  render() {
    return (
      <section className="login">
        <form className="login__form" onSubmit={e => this.handlerSubmit(e)} >
          <h2 className="login__form-title">Вход</h2>
          <input
            name="email"
            type="email"
            className="login__field"
            placeholder="Email"
            autoComplete='off'
            onChange={this.handlerChange}
          >
          </input>
          <span className="login__error">{
            function () {
              const { isEmail } = inputsErrors.email;
              switch (false) {
                case isEmail:
                  return 'Email введён некорректно'
                  break;
              }
            }()
          }</span>
          <input
            name="password"
            type="password"
            className="login__field"
            placeholder="Пароль"
            autoComplete='off'
            onChange={this.handlerChange}
          >
          </input>
          <span className="login__error">{
            function () {
              const { minLength, notSpaces } = inputsErrors.password;
              switch (false) {
                case minLength:
                  return 'Пароль должен быть длиннее 9 символов'
                  break;
                case notSpaces:
                  return 'В пароле не должно быть пробелов'
                  break
              }
            }()
          }</span>
          <button
            type='submit'
            disabled={isDisabled}
            className="login__button-submit"
          >
            Войти
          </button>
        </form>
      </section>
    );
  }
}
