import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { useState } from 'react';
function SignInPage() {
    const { copy } = useLanguage();
    const { isReady, session, signIn } = useMarketplace();
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({ identifier: '', password: '' });
    const [error, setError] = useState(null);
    if (!isReady) {
        return _jsx("main", { className: "loading-shell", children: copy.common.loading });
    }
    if (session) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    const redirectTo = location.state?.from ?? '/';
    const handleSignIn = async (event) => {
        event.preventDefault();
        setError(null);
        try {
            await signIn(form);
            navigate(redirectTo, { replace: true });
        }
        catch (nextError) {
            setError(nextError instanceof Error ? nextError.message : copy.signIn.error);
        }
    };
    return (_jsx("main", { className: "auth-shell", children: _jsxs("section", { className: "auth-panel", children: [_jsxs("div", { className: "auth-header", children: [_jsxs("div", { children: [_jsx("p", { className: "section-kicker", children: copy.signIn.kicker }), _jsx("h1", { children: copy.signIn.title }), _jsx("p", { className: "lead page-lead", children: copy.signIn.summary })] }), _jsx(LanguageSwitcher, {})] }), error ? _jsx("p", { className: "form-notice form-notice-error", children: error }) : null, _jsxs("form", { className: "form-grid auth-form", onSubmit: handleSignIn, children: [_jsx("input", { value: form.identifier, onChange: (event) => setForm((current) => ({ ...current, identifier: event.target.value })), placeholder: copy.signIn.identifier, required: true }), _jsx("input", { value: form.password, onChange: (event) => setForm((current) => ({ ...current, password: event.target.value })), type: "password", placeholder: copy.signIn.password, required: true }), _jsxs("div", { className: "card-actions auth-actions", children: [_jsx("button", { type: "submit", className: "button button-primary", children: copy.signIn.submit }), _jsx(Link, { className: "button button-ghost", to: "/sign-up", children: copy.signIn.createAccount })] })] })] }) }));
}
export default SignInPage;
