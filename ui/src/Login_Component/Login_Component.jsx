import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login_Component.css'
import gmcLogo from '../assets/Guwahati_Municipal_Corporation_logo.png';
import skaplinkLogo from '../assets/logoSkaplink.jpg';

function Login_Component() {

    const [formData, setFormData] = useState({
        userid: '',
        password: '',
        otp: '',
    });

    const [captchaText, setCaptchaText] = useState('');
    const [errors, setErrors] = useState({});

    const generateCaptcha = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptchaText(captcha);
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.userid.trim()) newErrors.userid = 'User ID is required';

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.captcha) {
            newErrors.captcha = 'Captcha is required';
        } else if (formData.captcha !== captchaText) {
            newErrors.captcha = 'Captcha does not match';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            alert('Login successful!');
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <section className="login-container">
            <div className="login-form-wrapper">

                <div className="welcome-header">
                    <img src={gmcLogo} alt="GMC Logo" className="gmclogo" />
                    <h1 className="welcome-title">Welcome</h1>
                    <p className="welcome-subtitle">Please log into your account</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit} noValidate>

                    <div className="form-group">
                        <label className="form-label">Username *</label>
                        <input
                            type="text"
                            name="userid"
                            className={`form-input ${errors.userid ? 'input-error' : ''}`}
                            value={formData.userid}
                            onChange={handleChange}
                            placeholder="Enter your username"
                        />
                        {errors.userid && <span className="error-message">{errors.userid}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password *</label>
                        <div className="password-wrapper">
                            <input
                                type="password"
                                name="password"
                                className={`form-input ${errors.password ? 'input-error' : ''}`}
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                            />
                        </div>
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">OTP *</label>
                        <input
                            type="number"
                            name="otp"
                            className={`form-input ${errors.otp ? 'input-error' : ''}`}
                            value={formData.otp}
                            onChange={handleChange}
                            placeholder="Enter your OTP"
                        />
                        {errors.otp && <span className="error-message">{errors.otp}</span>}
                    </div>

                    <button className="login-btn">Login</button>

                    <div className="form-footer">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>

                </form>

                <div className="container-footer">
                    <div className="container-footer-poweredby">
                        <span>Powered by :</span>
                        <Link to="https://skaplinktechnologies.com/">
                            <img src={skaplinkLogo} className="skaplink-logo" alt="Skaplink" />
                        </Link>
                    </div>
                    <div className="container-footer-version">Version 1.0</div>
                </div>

            </div>
        </section>
    )
}

export default Login_Component
