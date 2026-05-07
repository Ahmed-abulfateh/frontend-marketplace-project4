import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import marketplaceApi from '../lib/marketplaceApi';
const buildProfileForm = (session) => ({
    username: session.username,
    email: session.email,
    phone: session.phone,
    addressLine: session.addressLine,
    city: session.city,
    road: session.road,
    block: session.block,
    country: session.country,
});
function ProfilePage() {
    const { copy, translateRoleLabel } = useLanguage();
    const { isReady, session, updateProfile } = useMarketplace();
    const [notice, setNotice] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isSendingReset, setIsSendingReset] = useState(false);
    const [resetNotice, setResetNotice] = useState(null);
    const [form, setForm] = useState(() => session ? buildProfileForm(session) : null);
    useEffect(() => {
        if (session) {
            setForm(buildProfileForm(session));
        }
    }, [session]);
    if (!isReady) {
        return _jsx("main", { className: "loading-shell", children: copy.common.loading });
    }
    if (!session) {
        return _jsx(Navigate, { to: "/sign-in", replace: true });
    }
    if (!form) {
        return _jsx("main", { className: "loading-shell", children: copy.common.loading });
    }
    const handleChange = (field, value) => {
        setForm((current) => (current ? { ...current, [field]: value } : current));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setNotice(null);
        setIsSaving(true);
        try {
            await updateProfile(form);
            setNotice({ tone: 'success', message: copy.profile.notices.updated });
        }
        catch (error) {
            setNotice({
                tone: 'error',
                message: error instanceof Error ? error.message : copy.profile.notices.updateError,
            });
        }
        finally {
            setIsSaving(false);
        }
    };
    const handleRequestPasswordReset = async () => {
        setResetNotice(null);
        setIsSendingReset(true);
        try {
            const result = await marketplaceApi.requestPasswordReset();
            if (result.resetUrl) {
                // Dev mode without SMTP — show the link directly
                setResetNotice({ tone: 'success', message: `${copy.profile.changePasswordSent} (dev link: ${result.resetUrl})` });
            }
            else {
                setResetNotice({ tone: 'success', message: copy.profile.changePasswordSent });
            }
        }
        catch (error) {
            setResetNotice({
                tone: 'error',
                message: error instanceof Error ? error.message : copy.profile.notices.updateError,
            });
        }
        finally {
            setIsSendingReset(false);
        }
    };
    return (_jsxs("main", { className: "page-stack", children: [_jsx(PageHero, { variant: "product", kicker: copy.profile.kicker, title: copy.profile.title(translateRoleLabel(session.role)), summary: copy.profile.summary, aside: _jsxs(_Fragment, { children: [_jsx("p", { className: "card-label", children: copy.profile.savedAddressLabel }), _jsx("p", { children: copy.profile.savedAddressSummary })] }) }), _jsxs("section", { className: "market-grid", children: [_jsxs("div", { className: "section-heading compact", children: [_jsx("p", { className: "section-kicker", children: copy.profile.formKicker }), _jsx("h2", { children: copy.profile.formTitle })] }), notice ? (_jsx("p", { className: notice.tone === 'success' ? 'form-notice form-notice-success' : 'form-notice form-notice-error', children: notice.message })) : null, _jsxs("form", { className: "form-grid", onSubmit: handleSubmit, children: [_jsx("input", { value: form.username, onChange: (event) => handleChange('username', event.target.value), placeholder: copy.profile.fields.username, required: true }), _jsx("input", { value: form.email, onChange: (event) => handleChange('email', event.target.value), type: "email", placeholder: copy.profile.fields.email, required: true }), _jsx("input", { value: form.phone, onChange: (event) => handleChange('phone', event.target.value), placeholder: copy.profile.fields.phone, required: true }), _jsx("input", { value: form.country, onChange: (event) => handleChange('country', event.target.value), placeholder: copy.profile.fields.country }), _jsx("input", { value: form.city, onChange: (event) => handleChange('city', event.target.value), placeholder: copy.profile.fields.city }), _jsx("input", { value: form.block, onChange: (event) => handleChange('block', event.target.value), placeholder: copy.profile.fields.block }), _jsx("input", { value: form.road, onChange: (event) => handleChange('road', event.target.value), placeholder: copy.profile.fields.road }), _jsx("textarea", { value: form.addressLine, onChange: (event) => handleChange('addressLine', event.target.value), placeholder: copy.profile.fields.addressLine }), _jsx("div", { className: "card-actions", children: _jsx("button", { type: "submit", className: "button button-primary", disabled: isSaving, children: copy.profile.save }) })] }), _jsxs("div", { className: "section-divider", style: { marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }, children: [_jsx("p", { className: "section-kicker", children: copy.resetPassword.kicker }), resetNotice ? (_jsx("p", { className: resetNotice.tone === 'success' ? 'form-notice form-notice-success' : 'form-notice form-notice-error', children: resetNotice.message })) : null, _jsx("button", { type: "button", className: "button button-secondary", disabled: isSendingReset, onClick: handleRequestPasswordReset, style: { marginTop: '0.75rem' }, children: copy.profile.changePasswordCta })] })] })] }));
}
export default ProfilePage;
