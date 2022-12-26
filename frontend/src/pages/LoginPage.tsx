import {
    faApple,
    faFacebook,
    faGoogle
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import '../css/login.css';
import Logo from '../image/logo.png';

const LoginPage = (): ReactElement => {
    return (
        <div className="wrapper">
            <div className="header mb-5">
                <div className="title-wrapper">
                    <div className="logo">
                        <img src={Logo} />
                    </div>
                    <div className="title">Salyr</div>
                </div>
            </div>
            <div className="content mt-5">
                <div className="form-wrapper">
                    <div className="login-container mt-5">
                        <button className="face-login btn btn-primary btn-outline-dark mb-2 rounded-pill d-flex justify-content-center">
                            <FontAwesomeIcon
                                icon={faFacebook}
                                size="2x"
                                color="white"
                            />
                            <p className="text-white mx-4">
                                ĐĂNG NHẬP BẰNG FACEBOOK
                            </p>
                        </button>
                        <button className="apple-login btn btn-dark btn-outline-dark mb-2 rounded-pill d-flex justify-content-center">
                            <FontAwesomeIcon
                                icon={faApple}
                                size="2x"
                                color="white"
                            />
                            <p className="text-white mx-4">
                                ĐĂNG NHẬP BẰNG APPLE
                            </p>
                        </button>
                        <button className="google-login btn btn-light btn-outline-dark mb-2 rounded-pill d-flex justify-content-center">
                            <FontAwesomeIcon icon={faGoogle} size="2x" />
                            <p className="mx-4">ĐĂNG NHẬP BẰNG GOOGLE</p>
                        </button>
                        <button className="sdt-login btn btn-light btn-outline-dark mb-3 rounded-pill d-flex justify-content-center">
                            <p>ĐĂNG NHẬP BẰNG SỐ ĐIỆN THOẠI</p>
                        </button>
                        <hr className="divider" />
                        <div className="login-form mt-3">
                            <div className="login-group input-group mb-3">
                                <div className="label">
                                    Địa chỉ email hoặc tên người dùng
                                </div>
                                <input
                                    type="text"
                                    aria-invalid="false"
                                    className="login-username"
                                    placeholder="Địa chỉ email hoặc tên người dùng"
                                    autoCapitalize="off"
                                    required
                                />
                            </div>
                            <div className="login-group  input-group mb-3">
                                <div className="label">Mật khẩu</div>
                                <input
                                    type="text"
                                    aria-invalid="false"
                                    className="login-password"
                                    placeholder="Mật khẩu"
                                    autoCapitalize="off"
                                    required
                                />
                            </div>
                            <a href="" className="reset-password-link">
                                Quên mật khẩu của bạn?
                            </a>
                            <div className="login-btn mb-3">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="flexCheckDefault"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexCheckDefault"
                                    >
                                        Hãy nhớ tôi
                                    </label>
                                </div>
                                <button className="btn btn-outline-dark btn-lg rounded-pill">
                                    Đăng nhập
                                </button>
                            </div>
                        </div>
                        <hr className="divider" />
                        <div className="sign-up-form mt-3">
                            <div className="label mb-4">
                                Bạn chưa có tài khoản?
                            </div>
                            <button className="btn btn-light btn-outline-dark btn-lg rounded-pill">
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
