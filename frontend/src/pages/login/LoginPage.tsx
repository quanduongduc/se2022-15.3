import {
    faApple,
    faFacebook,
    faGoogle
} from '@fortawesome/free-brands-svg-icons';

import {
    faCircleExclamation,
    faPhone
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
    ReactElement,
    useState,
    SyntheticEvent,
    useEffect
} from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import Logo from '../../image/logo.png';
import './login.css';
const AUTH_URL = '/auth';
const LOGIN_URL = '/auth/login';

const LoginPage = (): ReactElement => {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(true);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        if (auth?.user) {
            navigate('/');
        }
    }, [auth]);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        axios
            .post(LOGIN_URL, JSON.stringify({ userName, password }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            .then(() => {
                setUserName('');
                setPassword('');
                axios
                    .get(AUTH_URL, { withCredentials: true })
                    .then((res) => {
                        const user = res?.data?.user;
                        setAuth({ user });
                        navigate(0);
                    })
                    .catch((err) => {
                        if (err.response) {
                            console.log(err.response?.data?.message);
                        }
                    });
            })
            .catch((err) => {
                if (err.response) {
                    setErrMsg(err.response.data.message);
                }
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
    };

    return (
        <div className="login-wrapper">
            <div className="login-header mb-5">
                <div className="login-title-wrapper">
                    <div className="logo mb-3 mx-0">
                        <img src={Logo} className="login-logo" />
                    </div>
                    <div className="login-title">Salyr</div>
                </div>
            </div>
            <div className="login-content mt-5">
                <div className="form-wrapper">
                    <div className="login-container mt-5">
                        <p
                            className={
                                errMsg
                                    ? 'errmsg-login text-center mb-4 text-white'
                                    : 'offscreen'
                            }
                            aria-live="assertive"
                        >
                            <FontAwesomeIcon
                                icon={faCircleExclamation}
                                size="2x"
                                color="white"
                                className="login-font mx-3"
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
                                ĐĂNG NHẬP BẰNG FACEBOOK
                            </p>
                        </button>
                        <button className="apple-login btn btn-dark border-dark mb-2 rounded-pill d-flex justify-content-center">
                            <FontAwesomeIcon
                                icon={faApple}
                                size="2x"
                                color="white"
                            />
                            <p className="text-white mx-4">
                                ĐĂNG NHẬP BẰNG APPLE
                            </p>
                        </button>
                        <button className="google-login btn btn-light border-dark mb-2 rounded-pill d-flex justify-content-center">
                            <FontAwesomeIcon icon={faGoogle} size="2x" />
                            <p className="mx-4">ĐĂNG NHẬP BẰNG GOOGLE</p>
                        </button>
                        <button className="sdt-login btn btn-light border-dark mb-3 rounded-pill d-flex justify-content-center">
                            <FontAwesomeIcon icon={faPhone} size="2x" />
                            <p className="mx-4">ĐĂNG NHẬP BẰNG SỐ ĐIỆN THOẠI</p>
                        </button>
                        <hr className="divider" />
                        <form
                            className="login-form needs-validation mt-3"
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <div className="login-group input-group mb-3">
                                <label
                                    htmlFor="username-validation"
                                    className="login-form-label"
                                >
                                    Địa chỉ email hoặc tên người dùng
                                </label>
                                <input
                                    type="text"
                                    aria-invalid="false"
                                    className="login-username form-control border-dark"
                                    id="username-validation"
                                    placeholder="Địa chỉ email hoặc tên người dùng"
                                    autoCapitalize="off"
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                    value={userName}
                                    required
                                />
                            </div>
                            <div className="login-group  input-group mb-3">
                                <label
                                    htmlFor="password-validation"
                                    className="login-form-label"
                                >
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    aria-invalid="false"
                                    className="login-password form-control border-dark"
                                    id="password-validation"
                                    placeholder="Mật khẩu"
                                    autoCapitalize="off"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                    required
                                />
                            </div>
                            <a
                                href=""
                                className="reset-password-link"
                                onClick={() => navigate('/password-reset')}
                            >
                                Quên mật khẩu của bạn?
                            </a>
                            <div className="login-btn mb-3">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="flexCheckDefault"
                                        onChange={handleChange}
                                        checked={isChecked}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexCheckDefault"
                                    >
                                        Hãy nhớ tôi
                                    </label>
                                </div>
                                <button className="btn border-dark btn-lg rounded-pill">
                                    Đăng nhập
                                </button>
                            </div>
                        </form>
                        <hr className="divider" />
                        <div className="sign-up-group mt-3">
                            <div className="label-noaccount mb-4">
                                Bạn chưa có tài khoản?
                            </div>
                            <button
                                className="btn btn-light border-dark btn-lg rounded-pill"
                                onClick={() => {
                                    return navigate('/register');
                                }}
                            >
                                Đăng ký Salyr
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
