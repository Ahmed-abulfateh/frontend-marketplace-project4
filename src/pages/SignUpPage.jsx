import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
function SignUpPage() {
    const { copy, translateRoleLabel } = useLanguage();
    const { isReady, session, signUp } = useMarketplace();
    const navigate = useNavigate();
    const publicRoles = ['buyer', 'seller'];
    const [form, setForm] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        role: 'buyer',
    });
    const [error, setError] = useState(null);
    if (!isReady) {
        return _jsx("main", { className: "loading-shell", children: copy.common.loading });
    }
    if (session) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        try {
            await signUp(form);
            navigate('/', { replace: true });
        }
        catch (nextError) {
            setError(nextError instanceof Error ? nextError.message : copy.signUp.error);
        }
    };
    return (_jsx("main", { className: "auth-shell", children: _jsxs("section", { className: "auth-panel", children: [_jsxs("div", { className: "auth-header", children: [_jsxs("div", { children: [_jsx("p", { className: "section-kicker", children: copy.signUp.kicker }), _jsx("h1", { children: copy.signUp.title }), _jsx("p", { className: "lead page-lead", children: copy.signUp.summary })] }), _jsx(LanguageSwitcher, {})] }), error ? _jsx("p", { className: "form-notice form-notice-error", children: error }) : null, _jsxs("form", { className: "form-grid auth-form", onSubmit: handleSubmit, children: [_jsx("input", { value: form.username, onChange: (event) => setForm((current) => ({ ...current, username: event.target.value })), placeholder: copy.signUp.username, required: true }), _jsx("input", { value: form.email, onChange: (event) => setForm((current) => ({ ...current, email: event.target.value })), type: "email", placeholder: copy.signUp.email, required: true }), _jsx("input", { value: form.phone, onChange: (event) => setForm((current) => ({ ...current, phone: event.target.value })), placeholder: copy.signUp.phone, required: true }), _jsx("input", { value: form.password, onChange: (event) => setForm((current) => ({ ...current, password: event.target.value })), type: "password", placeholder: copy.signUp.password, required: true }), _jsxs("label", { className: "search-field", htmlFor: "role-select", children: [_jsx("span", { className: "section-kicker", children: copy.signUp.role }), _jsx("select", { id: "role-select", value: form.role, onChange: (event) => setForm((current) => ({ ...current, role: event.target.value })), children: publicRoles.map((role) => (_jsx("option", { value: role, children: translateRoleLabel(role) }, role))) })] }), _jsxs("div", { className: "card-actions auth-actions", children: [_jsx("button", { type: "submit", className: "button button-primary", children: copy.signUp.submit }), _jsx(Link, { className: "button button-ghost", to: "/sign-in", children: copy.signUp.haveAccount })] })] })] }) }));
}
export default SignUpPage;
