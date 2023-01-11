import Modal from '@mui/material/Modal';

import s from "./ModalWindow.module.scss";

const ModalWindow = ({isOpen, closeModal, isFormSendSuccess, data}) => {
    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
        >
            <div className={s.modal}>
                {isFormSendSuccess
                    ? <div className={s.messageSuccess}>Форма успешно отправлена!</div>
                    : <div className={s.messageError}>Форма не отправлена, произошла ошибка( </div>
                }
                {isFormSendSuccess ?
                    <div className={s.data}>
                        <div>Имя - {data.name}</div>
                        <div>Телефон - +{data.tel}</div>
                        <div> Сообщение - {data.message}</div>
                    </div>
                    : ''
                }
            </div>
        </Modal>
    )
}

export default ModalWindow;
