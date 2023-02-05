import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
    ReactElement,
    SyntheticEvent,
    useEffect,
    useState
} from 'react';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import Logo from '../../image/logo.png';
import axios from '../../api/axios';
import validator from 'validator';
import './register.css';
const REGISTER_URL = 'auth/register';

const RegisterPage = (): ReactElement => {
    const navigate = useNavigate();
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    const upperChars = /[A-Z]/;
    const digitChars = /[0-9]/;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('undefined');
    const [errMsg, setErrMsg] = useState('');
    const [errMsgFirstName, setErrMsgFistName] = useState('');
    const [errMsgLastName, setErrMsgLastName] = useState('');
    const [errMsgUserName, setErrMsgUserName] = useState('');
    const [errMsgPassWord, setErrMsgPassWord] = useState('');

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
                setUserName('');
                setPassword('');
                setFirstName('');
                setLastName('');
                setGender('');
                navigate('/login');
            })
            .catch((err) => {
                if (err.response) {
                    setErrMsg(err.response.data.message);
                }
            });
    };

    useEffect(() => {
        if (!validator.isAlpha(firstName)) {
            setErrMsgFistName('Bạn cần nhập họ của bạn chỉ là chữ');
        }

        if (firstName === '') {
            setErrMsgFistName('Bạn cần nhập họ của bạn');
        }

        if (validator.isAlpha(firstName)) {
            setErrMsgFistName('');
        }
    }, [firstName]);

    useEffect(() => {
        if (!validator.isAlpha(lastName)) {
            setErrMsgLastName('Bạn cần nhập tên của bạn chỉ là chữ');
        } else if (lastName === '') {
            setErrMsgLastName('Bạn cần nhập tên của bạn');
        } else {
            setErrMsgLastName('');
        }
    }, [lastName]);

    useEffect(() => {
        if (userName.length < 8) {
            setErrMsgUserName('Tên tài khoản của bạn cần nhiều hơn 8 ký tự');
        } else if (userName.length > 32) {
            setErrMsgUserName('Tên tài khoản của bạn cần ít hơn 32 ký tự');
        } else {
            setErrMsgUserName('');
        }
    }, [userName]);

    useEffect(() => {
        if (password.length < 8) {
            setErrMsgPassWord('Mật khẩu phải có lớn hơn 8 ký tự');
        } else if (!upperChars.test(password)) {
            setErrMsgPassWord('Mật khẩu phải có 1 chữ in hoa');
        } else if (!digitChars.test(password)) {
            setErrMsgPassWord('Mật khẩu phải có ít nhất 1 số');
        } else if (!specialChars.test(password)) {
            setErrMsgPassWord('Mật khẩu phải có 1 ký tự đặc biệt');
        } else {
            setErrMsgPassWord('');
        }
    }, [password]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGender(e.target.value);
    };

    return (
        <div className="register-wrapper d-flex align-items-center">
            <div className="register-header mt-2">
                <div className="register-title-wrapper">
                    <div className="logo mb-2">
                        <img src={Logo} className="register-logo" />
                    </div>
                    <div className="register-title">Salyr</div>
                </div>
            </div>
            <div className="register-content">
                <div className="register-form-wrapper">
                    <div className="register-container">
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
                            <div className="register-group mb-3">
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
                                    placeholder="Nhập họ của bạn. Không dấu!"
                                    autoCapitalize="off"
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    value={firstName}
                                    required
                                />
                                <p className="err-msg-first-name text-danger fw-bold ms-2">
                                    {errMsgFirstName}
                                </p>
                            </div>
                            <div className="register-group mb-3">
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
                                    placeholder="Nhập tên của bạn. Không dấu!"
                                    autoCapitalize="off"
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    value={lastName}
                                    required
                                />
                                <p className="err-msg-last-name text-danger fw-bold ms-2">
                                    {errMsgLastName}
                                </p>
                            </div>
                            <div className="register-group mb-3">
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
                                <p className="err-msg-user-name text-danger fw-bold ms-2">
                                    {errMsgUserName}
                                </p>
                            </div>
                            <div className="register-group mb-3">
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
                                <p className="err-msg-password text-danger fw-bold ms-2">
                                    {errMsgPassWord}
                                </p>
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
