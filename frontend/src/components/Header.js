import logo from '../images/logo.svg';
import closeIcon from '../images/Close-Icon-for-menu.svg'
import { Link, Route } from 'react-router-dom';


export default function Header(props) {

  return (
    <header className="header">
      <img className="logo header__logo" src={logo} alt='Логотип' />
      <Route exact path="/">
        <div className="header__menu">
          <p className="header__email">{props.email}</p>
          <button type="button" onClick={() => props.onClick(false)} className="header__link">Выйти</button>
        </div>
      </Route>
      <Route path="/sign-in">
        <Link to="/sign-up" className="header__link">Регистрация</Link>
      </Route>
      <Route path="/sign-up">
        <Link to="/sign-in" className="header__link">Войти</Link>
      </Route>
    </header>
  );
}

