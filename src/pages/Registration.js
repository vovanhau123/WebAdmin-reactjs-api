import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Layout from '../components/Layout';
import ReCAPTCHA from "react-google-recaptcha";

function Registration() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [errors, setErrors] = useState({});


    const [recaptchaValue, setRecaptchaValue] = useState(null);

    const handleRecaptchaChange = (value) => {
        setRecaptchaValue(value);
    };

    const validateInputs = () => {
        const errors = {};

        if (!name.trim()) {
            errors.name = 'Tên không được để trống';
        }

        if (!email.trim()) {
            errors.email = 'Email không được để trống';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email không hợp lệ';
        }

        if (!password.trim()) {
            errors.password = 'Mật khẩu không được để trống';
        }

        if (password !== password_confirmation) {
            errors.password_confirmation = 'Mật khẩu xác thực không khớp';
        }

        return errors;
    };


    const handleSave = () => {
        const validationErrors = validateInputs();
        setErrors(validationErrors);
        if (!recaptchaValue) {
            setErrors({ ...validationErrors, recaptcha: 'Vui lòng xác nhận không phải là robot.' });
            return;
        }

        if (Object.keys(validationErrors).length === 0) {
            // ... (your existing axios post request)
        }
        if (Object.keys(validationErrors).length === 0) {
            setIsSaving(true);
            axios.post('http://192.168.1.9:8686/register.php', {
                name: name,
                email: email,
                password: password,
                passwordconfirmation: password_confirmation
            })
                .then(function (response) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    Swal.fire({
                        icon: 'success',
                        title: 'Đăng ký thành công!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setIsSaving(false);
                    setName('');
                    setEmail('');
                    setPassword('');
                    setPasswordConfirmation('');
                    setErrors({});
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Đã xảy ra lỗi!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setIsSaving(false);
                });
        }
    };

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h2 className="card-title text-center mb-5 fw-light fs-5">Tạo tài khoản mới</h2>
                                <form>
                                    <div className="form-floating mb-3">
                                        <input
                                            value={name}
                                            onChange={(event) => { setName(event.target.value) }}
                                            type="text"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            id="floatingInput"
                                            placeholder="Jhon Joe"
                                        />
                                        <label htmlFor="floatingInput">Tên</label>
                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            value={email}
                                            onChange={(event) => { setEmail(event.target.value) }}
                                            type="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            id="floatingEmail"
                                            placeholder="name@example.com"
                                        />
                                        <label htmlFor="floatingEmail">Địa chỉ email</label>
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            value={password}
                                            onChange={(event) => { setPassword(event.target.value) }}
                                            type="password"
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            id="floatingPassword"
                                            placeholder="Password"
                                        />
                                        <label htmlFor="floatingPassword">Mật khẩu</label>
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            value={password_confirmation}
                                            onChange={(event) => { setPasswordConfirmation(event.target.value) }}
                                            type="password"
                                            className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            placeholder="password_confirmation "
                                        />
                                        <label htmlFor="password_confirmation">Xác thực mật khẩu</label>
                                        {errors.password_confirmation && <div className="invalid-feedback">{errors.password_confirmation}</div>}
                                    </div>
                                    <div className="form-floating mb-3">
                                        <ReCAPTCHA
                                            sitekey="6LeTcCIpAAAAAOp3IkiFap7Y-2BWlE--cN0-EHJA"
                                            onChange={handleRecaptchaChange}
                                        />
                                        {errors.recaptcha && <div className="invalid-feedback">{errors.recaptcha}</div>}
                                    </div>
                                    <div className="d-grid">
                                        <button
                                            disabled={isSaving}
                                            onClick={handleSave}
                                            className="btn btn-primary btn-login text-uppercase fw-bold"
                                            type="button"
                                        >
                                            Create new account
                                        </button>
                                    </div>
                                    <hr className="my-4"></hr>

                                    <div className="d-grid">
                                        <Link className="btn btn-outline-primary btn-login text-uppercase fw-bold" to="/">
                                            Sign in
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Registration;
