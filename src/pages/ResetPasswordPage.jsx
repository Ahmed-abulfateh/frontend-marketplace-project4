import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useLanguage } from '../context/LanguageContext';
import marketplaceApi from '../lib/marketplaceApi';
function ResetPasswordPage() {
    const { copy } = useLanguage();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') ?? '';
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [notice, setNotice] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [done, setDone] = useState(false);
    if (!token) {
        return (_jsxs("main", { className: "page-stack", children: [_jsx(PageHero, { variant: "product", kicker: copy.resetPassword.kicker, title: copy.resetPassword.title, summary: copy.resetPassword.summary, aside: null }), _jsxs("section", { className: "market-grid", children: [_jsx("p", { className: "form-notice form-notice-error", children: copy.resetPassword.notices.invalid }), _jsxs(Link, { to: "/profile", className: "button button-secondary", style: { marginTop: '1rem', display: 'inline-block' }, children: ["\u2190 ", copy.profile.kicker] })] })] }));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setNotice(null);
        if (newPassword !== confirmPassword) {
            setNotice({ tone: 'error', message: copy.resetPassword.notices.mismatch });
            return;
        }
        setIsSubmitting(true);
        try {
            const result = await marketplaceApi.resetPassword(token, newPassword);
            setNotice({ tone: 'success', message: result.message || copy.resetPassword.notices.success });
            setDone(true);
        }
        catch (error) {
            setNotice({
                tone: 'error',
                message: error instanceof Error ? error.message : copy.resetPassword.notices.invalid,
            });
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsxs("main", { className: "page-stack", children: [_jsx(PageHero, { variant: "product", kicker: copy.resetPassword.kicker, title: copy.resetPassword.title, summary: copy.resetPassword.summary, aside: null }), _jsxs("section", { className: "market-grid", children: [_jsx("div", { className: "section-heading compact", children: _jsx("h2", { children: copy.resetPassword.title }) }), notice ? (_jsx("p", { className: notice.tone === 'success' ? 'form-notice form-notice-success' : 'form-notice form-notice-error', children: notice.message })) : null, done ? (_jsx(Link, { to: "/sign-in", className: "button button-primary", style: { marginTop: '1rem', display: 'inline-block' }, children: "Sign in" })) : (_jsxs("form", { className: "form-grid", onSubmit: handleSubmit, children: [_jsx("input", { type: "password", value: newPassword, onChange: (event) => setNewPassword(event.target.value), placeholder: copy.resetPassword.newPasswordLabel, minLength: 8, required: true }), _jsx("input", { type: "password", value: confirmPassword, onChange: (event) => setConfirmPassword(event.target.value), placeholder: copy.resetPassword.confirmPasswordLabel, minLength: 8, required: true }), _jsx("div", { className: "card-actions", children: _jsx("button", { type: "submit", className: "button button-primary", disabled: isSubmitting, children: copy.resetPassword.submit }) })] }))] })] }));
}
export default ResetPasswordPage;
