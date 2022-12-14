import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, SyntheticEvent, useState } from 'react';
import './register.css';
import Logo from '../../image/logo.png';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const REGISTER_URL = '/auth/register';

const RegisterPage = (): ReactElement => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('undefined');
    const [errMsg, setErrMsg] = useState('');

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        const response = await axios
            .post(
                REGISTER_URL,
                JSON.stringify({
                    userName,
                    password,
                    firstName,
                    lastName,
                    gender
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            .then((response) => {
                navigate('/login');
                setUserName('');
                setPassword('');
                setFirstName('');
                setLastName('');
                setGender('');
            })
            .catch(function (err) {
                if (err.response) {
                    setErrMsg(err.response.data.message);
                }
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGender(e.target.value);
    };

    return (
        <div className="register-wrapper d-flex align-items-center">
            <div className="register-header">
                <div className="register-title-wrapper">
                    <div className="logo mb-3">
                        <img src={Logo} />
                    </div>
                    <div className="register-title">Salyr</div>
                </div>
            </div>
            <div className="register-content mt-3">
                <div className="register-form-wrapper">
                    <div className="register-container mt-5">
                        <p
                            className={
                                errMsg
                                    ? 'errmsg-register text-center mb-4 text-white'
                                    : 'offscreen'
                            }
                            aria-live="assertive"
                        >
                            <FontAwesomeIcon
                                icon={faCircleExclamation}
                                size="2x"
                                color="white"
                                className="register-font mx-3"
                            />
                            {errMsg}
                        </p>
                        <button className="face-login btn btn-primary border-dark mb-2 rounded-pill d-flex justify-content-center">
                            <FontAwesomeIcon
                                icon={faFacebook}
                                size="2x"
                                color="white"
                            />
                            <p className="text-white mx-4">
                                ????NG K?? B???NG FACEBOOK
                            </p>
                        </button>
                        <button className="google-login btn btn-light border-dark mb-2 rounded-pill d-flex justify-content-center">
                            <FontAwesomeIcon icon={faGoogle} size="2x" />
                            <p className="mx-4">????NG K?? B???NG GOOGLE</p>
                        </button>
                        <hr className="divider" />
                        <form
                            className="register-form needs-validation mt-3"
                            onSubmit={submitHandler}
                            noValidate
                        >
                            <div className="register-group  input-group mb-3">
                                <label
                                    htmlFor="firstName-validation"
                                    className="register-form-label"
                                >
                                    H??? c???a b???n l?? g??
                                </label>
                                <input
                                    type="text"
                                    aria-invalid="false"
                                    className="form-control border-dark"
                                    id="firstName-validation"
                                    placeholder="Nh???p h??? c???a b???n."
                                    autoCapitalize="off"
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    value={firstName}
                                    required
                                />
                            </div>
                            <div className="register-group  input-group mb-3">
                                <label
                                    htmlFor="lastName-validation"
                                    className="register-form-label"
                                >
                                    T??n c???a b???n l?? g??
                                </label>
                                <input
                                    type="text"
                                    aria-invalid="false"
                                    className="form-control border-dark"
                                    id="lastName-validation"
                                    placeholder="Nh???p t??n c???a b???n."
                                    autoCapitalize="off"
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    value={lastName}
                                    required
                                />
                            </div>
                            <div className="register-group  input-group mb-3">
                                <label
                                    htmlFor="username-validation"
                                    className="register-form-label"
                                >
                                    ?????t t??n t??i kho???n c???a b???n
                                </label>
                                <input
                                    type="text"
                                    aria-invalid="false"
                                    className="form-control border-dark"
                                    id="username-validation"
                                    placeholder="Nh???p t??n t??i kho???n."
                                    autoCapitalize="off"
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                    value={userName}
                                    required
                                />
                            </div>
                            <div className="register-group  input-group mb-3">
                                <label
                                    htmlFor="password-validation"
                                    className="register-form-label"
                                >
                                    T???o m???t kh???u
                                </label>
                                <input
                                    type="password"
                                    aria-invalid="false"
                                    className="form-control border-dark"
                                    id="password-validation"
                                    placeholder="Nh???p m???t kh???u c???a b???n."
                                    autoCapitalize="off"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                    required
                                />
                            </div>
                            <div className="gender-group d-flex flex-wrap mb-3">
                                <div className="form-check ps-4 pe-4">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="radio"
                                        id="male"
                                        onChange={handleChange}
                                        value="male"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="male"
                                    >
                                        Nam
                                    </label>
                                </div>
                                <div className="form-check ps-4 pe-4">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="radio"
                                        id="female"
                                        onChange={handleChange}
                                        value="female"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="female"
                                    >
                                        N???
                                    </label>
                                </div>
                                <div className="form-check ps-4 pe-4">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="radio"
                                        id="undefind"
                                        onChange={handleChange}
                                        value="undefined"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="undefind"
                                    >
                                        Kh??ng ph??n bi???t gi???i t??nh
                                    </label>
                                </div>
                                <div className="form-check ps-4 pe-4">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="radio"
                                        id="undefined"
                                        onChange={handleChange}
                                        value="undefined"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="undefined"
                                    >
                                        Kh??ng mu???n n??u c??? th???
                                    </label>
                                </div>
                            </div>
                            <div className="register-group d-flex flex-column ">
                                <div className="register-btn mb-3 d-flex justify-content-center">
                                    <button className="btn border-dark btn-lg rounded-pill px-4 py-2">
                                        ????ng K??
                                    </button>
                                </div>
                                <p className="sign-in d-flex justify-content-center">
                                    <span className="link-container">
                                        B???n ???? c?? t??i kho???n?
                                        <a
                                            href=""
                                            onClick={() => navigate('/login')}
                                        >
                                            ????ng nh???p
                                        </a>
                                    </span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
