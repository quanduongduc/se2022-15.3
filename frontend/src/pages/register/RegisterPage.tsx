import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, SyntheticEvent, useState } from 'react';
import './register.css';
import Logo from '../../image/logo.png';
import { useNavigate } from 'react-router-dom';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import axios from '../../api/axios';
const REGISTER_URL = 'auth/register';

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
        await axios
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
            .then(() => {
                navigate('/login');
                setUserName('');
                setPassword('');
                setFirstName('');
                setLastName('');
                setGender('');
            })
            .catch((err) => {
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
                                ĐĂNG KÝ BẰNG FACEBOOK
                            </p>
                        </button>
                        <button className="google-login btn btn-light border-dark mb-2 rounded-pill d-flex justify-content-center">
                            <FontAwesomeIcon icon={faGoogle} size="2x" />
                            <p className="mx-4">ĐĂNG KÝ BẰNG GOOGLE</p>
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
                                    Họ của bạn là gì
                                </label>
                                <input
                                    type="text"
                                    aria-invalid="false"
                                    className="form-control border-dark"
                                    id="firstName-validation"
                                    placeholder="Nhập họ của bạn."
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
                                    Tên của bạn là gì
                                </label>
                                <input
                                    type="text"
                                    aria-invalid="false"
                                    className="form-control border-dark"
                                    id="lastName-validation"
                                    placeholder="Nhập tên của bạn."
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
                                    Đặt tên tài khoản của bạn
                                </label>
                                <input
                                    type="text"
                                    aria-invalid="false"
                                    className="form-control border-dark"
                                    id="username-validation"
                                    placeholder="Nhập tên tài khoản."
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
                                    Tạo mật khẩu
                                </label>
                                <input
                                    type="password"
                                    aria-invalid="false"
                                    className="form-control border-dark"
                                    id="password-validation"
                                    placeholder="Nhập mật khẩu của bạn."
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
                                        Nữ
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
                                        Không phân biệt giới tính
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
                                        Không muốn nêu cụ thể
                                    </label>
                                </div>
                            </div>
                            <div className="register-group d-flex flex-column ">
                                <div className="register-btn mb-3 d-flex justify-content-center">
                                    <button className="btn border-dark btn-lg rounded-pill px-4 py-2">
                                        Đăng Ký
                                    </button>
                                </div>
                                <p className="sign-in d-flex justify-content-center">
                                    <span className="link-container">
                                        Bạn đã có tài khoản?
                                        <a
                                            href=""
                                            onClick={() => navigate('/login')}
                                        >
                                            Đăng nhập
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
