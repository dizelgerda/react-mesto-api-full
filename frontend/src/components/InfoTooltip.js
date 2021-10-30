import successIcon from '../images/V.svg';
import failIcon from '../images/X.svg';

export default function InfoTooltip({ status, onClose }) {

  const handelClose = (e) => { if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__close-button')) onClose(); }

  return (
    <div className={`popup ${status && 'popup_opened'}`} onClick={handelClose}>
      {status && (
        <div className="popup__container popup__container_info" >
          <button className="popup__close-button" type="button"></button>
          <img className="popup__icon" src={status && status.success ? successIcon : failIcon} alt="Статус"></img>
          <p className="popup__massage">{status && status.massage}</p>
        </div>
      )}
    </div >
  );
}
