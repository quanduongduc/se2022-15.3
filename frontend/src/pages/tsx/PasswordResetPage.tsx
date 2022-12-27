import React, { ReactElement } from 'react';
import '../css/password-reset.css';
import Logo from '../../image/logo.png';

const PasswordReset = (): ReactElement => {
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
            <div className="content">
                <div className="form-wrapper">
                    <div className="login-container">
                        <form
                            className="login-form needs-validation"
                            noValidate
                        >
                            <div className="login-group input-group">
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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordReset;
