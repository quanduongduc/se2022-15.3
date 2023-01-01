import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, SyntheticEvent, useState } from 'react';
import './register.css';
import Logo from '../../image/logo.png';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const REGISTER_URL = '/register';

const RegisterPage = (): ReactElement => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState(false);

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        const response = await axios.post(
            REGISTER_URL,
            JSON.stringify({ userName, password, firstName, lastName }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        console.log(JSON.stringify(response?.data));
        setUserName('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setGender(false);
    };

    const handleChange = (e: any) => {
        setGender(e.target.checked);
    };

    return (
        <div className="wrapper d-flex align-items-center">
            <div className="header mb-5">
                <div className="title-wrapper">
                    <div className="logo mb-3">
                        <img src={Logo} />
                    </div>
                    <div className="title">Salyr</div>
                </div>
            </div>
            <div className="content mt-5">
                <div className="form-wrapper">
                    <div className="login-container mt-5">
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
                                    className="form-label"
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
                                    className="form-label"
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
                                    className="form-label"
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
                                    className="form-label"
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
                            <div className="register-group  input-group mb-3">
                                <label
                                    htmlFor="re-password-validation"
                                    className="form-label"
                                >
                                    Xác nhận mật khẩu
                                </label>
                                <input
                                    type="password"
                                    aria-invalid="false"
                                    className="form-control border-dark"
                                    id="re-password-validation"
                                    placeholder="Nhập lại mật khẩu của ban."
                                    autoCapitalize="off"
                                    required
                                />
                            </div>
                            <div className="gender-group d-flex flex-wrap mb-3">
                                <div className="form-check ps-4 pe-4">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadio"
                                        id="male"
                                        onChange={handleChange}
                                        checked={gender}
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
                                        name="flexRadio"
                                        id="female"
                                        onChange={handleChange}
                                        checked={gender}
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
                                        name="flexRadio"
                                        id="undefind-gender"
                                        onChange={handleChange}
                                        checked={gender}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="undefind-gender"
                                    >
                                        Không phân biệt giới tính
                                    </label>
                                </div>
                                <div className="form-check ps-4 pe-4">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadio"
                                        id="undefined"
                                        onChange={handleChange}
                                        checked
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
