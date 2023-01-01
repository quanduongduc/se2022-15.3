import React, { ReactElement } from 'react';
import './password-reset.css';
import Logo from '../../image/logo.png';

const PasswordReset = (): ReactElement => {
    return (
        <div className="wrapper">
            <div className="header d-flex flex-wrap align-items-center justify-content-center">
                <div className="title-wrapper">
                    <div className="logo mb-3">
                        <img src={Logo} />
                    </div>
                    <div className="title">Salyr</div>
                </div>
            </div>
            <div className="content d-flex flex-wrap align-items-center justify-content-center">
                <div className="form-wrapper text-align-center">
                    <h1 className="type_element mb-4">
                        <b>Cài đặt lại Mật khẩu</b>
                    </h1>
                    <p>
                        Nhập <b>tên người dùng Salyr</b>, hoặc
                        <b> địa chỉ email</b> bạn đã dùng để đăng ký. Chúng tôi
                        sẽ gửi email cho bạn với tên người dùng của bạn và một
                        liên kết để đặt lại mật khẩu của bạn.
                    </p>
                    <div className="reset-container text-center">
                        <form
                            className="reset-form needs-validation"
                            noValidate
                        >
                            <div className="reset-group input-group text-left">
                                <label
                                    htmlFor="username-validation"
                                    className="form-label"
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
                                    required
                                />
                            </div>
                            <div className="btn d-flex justify-content-center aling-items-center ">
                                <button className="submit-btn border-dark btn-lg rounded-pill mt-3 d-flex flex-column justify-content-center align-items-center ">
                                    Gửi
                                </button>
                            </div>
                        </form>
                        <p>
                            If you still need help, contact <b>Salyr Support</b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordReset;
