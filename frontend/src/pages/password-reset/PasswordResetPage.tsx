import React, { ReactElement } from 'react';
import './password-reset.css';
import Logo from '../../image/logo.png';

const PasswordReset = (): ReactElement => {
    return (
        <div className="reset-password-wrapper">
            <div className="reset-password-header d-flex flex-wrap align-items-center justify-content-center mb-4">
                <div className="reset-password-title-wrapper d-flex align-items-center justify-content-center">
                    <div className="logo mb-3">
                        <img src={Logo} className="password-reset-logo" />
                    </div>
                    <div className="reset-title mx-4">Salyr</div>
                </div>
            </div>
            <div className="reset-content d-flex flex-wrap align-items-center justify-content-center mt-3">
                <div className="reset-password-form-wrapper text-align-center">
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
                            <div className="reset-group input-group">
                                <label
                                    htmlFor="username-validation"
                                    className="reset-form-label mb-1 mt-2"
                                >
                                    <b>Địa chỉ email hoặc tên người dùng</b>
                                </label>
                                <input
                                    type="text"
                                    aria-invalid="false"
                                    className="reset-username border-dark form-control"
                                    id="username-validation"
                                    placeholder="Địa chỉ email hoặc tên người dùng"
                                    autoCapitalize="off"
                                    required
                                />
                            </div>
                            <div className="btn d-flex justify-content-center aling-items-center ">
                                <button className="submit-btn border-dark btn-lg rounded-pill mt-3 mb-3 d-flex flex-column justify-content-center align-items-center ">
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
