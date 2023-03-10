import {forwardRef, useState} from "react";
import {IMaskInput} from "react-imask";
import {Alert, FormControl, Input, InputLabel, TextField} from "@mui/material";

import Header from "./components/Header/Header";
import Button from "./components/Button/Button";
import ModalWindow from "./components/Modal/ModalWindow";

import s from './App.module.scss';


const PhoneInput = forwardRef((props, ref) => {
    const {onChange, ...other} = props;
    return (
        <IMaskInput
            {...other}
            mask="+0 (000) 000-00-00"
            unmask={true}
            inputRef={ref}
            onAccept={(value) => onChange({target: {name: props.name, value}})}
            overwrite
        />
    );
});

const isValide = (data) => {
    const validator = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    return !(data.name.length === 0 ||
        data.message.length === 0 ||
        validator.test(data.name) ||
        validator.test(data.message));
}


function App() {
    const [state, setState] = useState({
        tel: '',
        name: '',
        message: '',
    });
    const [isOpenModal, setOpenModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);
    const [isDataSending, setIsDataSending] = useState(false);
    const [isValidInput, setIsValidInput] = useState(true);

    const handleChangeInput = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleButtonClick = () => {
        if (isValide(state)) {
            setIsDataSending(true);
            setTimeout(() => {
                setIsDataSending(false);
                setOpenModal(true);
                console.log(state);
            }, 400)
        } else {
            setIsValidInput(false)
        }
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    return (
        <>
            <Header/>
            <div className={s.form}>
                <FormControl className={s.input}>
                    <InputLabel htmlFor="telInput">?????????????? ?????????? ????????????????</InputLabel>
                    <Input
                        value={state.tel}
                        onChange={handleChangeInput}
                        name="tel"
                        placeholder={"+7 (999) 999-99-99"}
                        prefix={"+"}
                        id="telInput"
                        inputComponent={PhoneInput}
                    />
                </FormControl>
                <FormControl className={s.input}>
                    <InputLabel htmlFor="name">?????????????? ??????</InputLabel>
                    <Input
                        value={state.name}
                        onChange={handleChangeInput}
                        name="name"
                        id="name"
                        error={!isValidInput}
                    />
                </FormControl>
                <TextField
                    label="?????????????? ??????????????????"
                    multiline
                    variant={"standard"}
                    className={s.input}
                    name={"message"}
                    value={state.message}
                    onChange={handleChangeInput}
                    error={!isValidInput}
                />

                <Button text={"??????????????????"} onClick={handleButtonClick} isLoading={isDataSending}/>

                {!isValidInput && <Alert severity="error">?????????????????? ?????? ???????? ?????? ?????????????? ???????????????? ????????????</Alert>}
            </div>

            <ModalWindow isOpen={isOpenModal} closeModal={handleCloseModal} isFormSendSuccess={isSuccess} data={state}/>
        </>
    );
}

export default App;
