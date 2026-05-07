import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLanguage } from '../context/LanguageContext';
function LanguageSwitcher() {
    const { copy, language, setLanguage } = useLanguage();
    return (_jsxs("div", { className: "language-switch", "aria-label": copy.common.language, children: [_jsx("button", { type: "button", className: language === 'en' ? 'role-chip role-chip-active' : 'role-chip', onClick: () => setLanguage('en'), children: copy.common.english }), _jsx("button", { type: "button", className: language === 'ar' ? 'role-chip role-chip-active' : 'role-chip', onClick: () => setLanguage('ar'), children: copy.common.arabic })] }));
}
export default LanguageSwitcher;
