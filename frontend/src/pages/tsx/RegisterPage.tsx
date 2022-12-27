import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import '../css/register.css';
import Logo from '../../image/logo.png';

const RegisterPage = (): ReactElement => {
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
                            className="login-form needs-validation mt-3"
                            noValidate
                        >
                            <div className="login-group input-group mb-3">
                                <label
                                    htmlFor="username-validation"
                                    className="form-label"
                                >
                                    Email của bạn là gì?
                                </label>
                                <input
                                    type="email"
                                    aria-invalid="false"
                                    className="form-control border-dark"
                                    id="username-validation"
                                    placeholder="Nhập email của bạn."
                                    autoCapitalize="off"
                                    required
                                />
                            </div>
                            <div className="login-group  input-group mb-3">
                                <label
                                    htmlFor="password-validation"
                                    className="form-label"
                                >
                                    Xác nhận email của bạn
                                </label>
                                <input
                                    type="email"
                                    aria-invalid="false"
                                    className="form-control border-dark"
                                    id="password-validation"
                                    placeholder="Nhập lại email của bạn."
                                    autoCapitalize="off"
                                    required
                                />
                            </div>
                            <div className="login-group  input-group mb-3">
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
                                    required
                                />
                            </div>
                            <div className="login-group  input-group mb-3">
                                <label
                                    htmlFor="password-validation"
                                    className="form-label"
                                >
                                    Xác nhận mật khẩu
                                </label>
                                <input
                                    type="password"
                                    aria-invalid="false"
                                    className="form-control border-dark"
                                    id="password-validation"
                                    placeholder="Nhập lại mật khẩu của ban."
                                    autoCapitalize="off"
                                    required
                                />
                            </div>
                            <div className="login-group  input-group mb-3">
                                <label
                                    htmlFor="password-validation"
                                    className="form-label"
                                >
                                    Bạn tên là gì
                                </label>
                                <input
                                    type="text"
                                    aria-invalid="false"
                                    className="form-control border-dark"
                                    id="password-validation"
                                    placeholder="Nhập tên hồ sơ."
                                    autoCapitalize="off"
                                    required
                                />
                            </div>
                            <div className="login-btn mb-3">
                                <button className="btn border-dark btn-lg rounded-pill">
                                    Đăng nhập
                                </button>
                            </div>
                        </form>
                        <hr className="divider" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
