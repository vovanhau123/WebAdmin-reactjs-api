import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [isSaving, setIsSaving] = useState(false);
    const [errors, setErrors] = useState({});
    // useEffect(() => {
    //     if (localStorage.getItem('user') && localStorage.getItem('user') !== null) {
    //         navigate('/dashboard');
    //     }
    // },);

    const [recaptchaValue, setRecaptchaValue] = useState(null);

    const handleRecaptchaChange = (value) => {
        setRecaptchaValue(value);
    };
    const validateInputs = () => {
        const errors = {};

        if (!email.trim()) {
            errors.email = 'Email không được để trống';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email không hợp lệ';
        }

        if (!password.trim()) {
            errors.password = 'Mật khẩu không được để trống';
        }
        return errors;
    };

    const instance = axios.create({
        baseURL: 'http://192.168.1.16:8686/',
        headers: {
            'Content-Type': 'application/json',
        },
    });






    const handleSave = () => {
        const validationErrors = validateInputs();
        setErrors(validationErrors);
        setIsSaving(true);
        if (!recaptchaValue) {
            setErrors({ ...validationErrors, recaptcha: 'Vui lòng xác nhận không phải là robot.' });
            setIsSaving(false); // Tắt trạng thái đang lưu để cho phép người dùng thử lại
            return;
        } else {
            if (Object.keys(validationErrors).length === 0) {
                // ... (your existing axios post request)
            }
            instance.post('admin.php', {
                email: email,
                password: password,
            })
                .then(function (response) {
                    if (response.data.success) {
                        // Đăng nhập thành công
                        console.log(response);
                        // localStorage.setItem("users", JSON.stringify(response.data.user));
                        Swal.fire({
                            icon: 'success',
                            title: 'Đăng nhập thành công!',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        navigate("/dashboard");
                    } else {
                        console.log(response);
                        // Đăng nhập thất bại
                        Swal.fire({
                            icon: 'error',
                            title: 'Thông tin không hợp lệ!',
                            showConfirmButton: true,
                            timer: 2000
                        })
                    }
                    setIsSaving(false);
                    setEmail('')
                    setPassword('')
                })
                .catch(function (error) {
                    // Xử lý lỗi khi gửi yêu cầu
                    Swal.fire({
                        icon: 'error',
                        title: 'An Error Occured!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setIsSaving(false)
                });
        }
    }
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                                <form>
                                    <div className="form-floating mb-3">
                                        <input
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            type="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            id="floatingInput"
                                            placeholder="name@example.com"
                                        />
                                        <label htmlFor="floatingInput">Email address</label>
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            type="password"
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            id="floatingPassword"
                                            placeholder="Password"
                                        />
                                        <label htmlFor="floatingPassword">Password</label>
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
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
                                            type="submit"
                                            className="btn btn-primary btn-login text-uppercase fw-bold"
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                    <hr className="my-4"></hr>

                                    <div className="d-grid">
                                        <Link className="btn btn-outline-primary btn-login text-uppercase fw-bold" to="/signup">
                                            Create new account
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

export default Login;