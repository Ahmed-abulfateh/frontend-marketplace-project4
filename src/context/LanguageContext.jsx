import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useMemo, useState, } from 'react';
import { copyByLanguage, translateCatalogText, translateListingStatus, translateOrderStatus, translateRoleLabel, } from '../content/copy';
const LANGUAGE_KEY = 'signal-market-language';
const LanguageContext = createContext(undefined);
function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        const savedLanguage = window.localStorage.getItem(LANGUAGE_KEY);
        return savedLanguage === 'ar' ? 'ar' : 'en';
    });
    useEffect(() => {
        const direction = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
        document.documentElement.dir = direction;
        window.localStorage.setItem(LANGUAGE_KEY, language);
    }, [language]);
    const value = useMemo(() => {
        const locale = language === 'ar' ? 'ar-BH' : 'en-BH';
        return {
            language,
            setLanguage,
            locale,
            direction: language === 'ar' ? 'rtl' : 'ltr',
            copy: copyByLanguage[language],
            formatCurrency: (amount) => new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: 'BHD',
                minimumFractionDigits: 3,
                maximumFractionDigits: 3,
            }).format(amount),
            translateCatalogText: (value) => translateCatalogText(value, language),
            translateRoleLabel: (role) => translateRoleLabel(role, language),
            translateListingStatus: (status) => translateListingStatus(status, language),
            translateOrderStatus: (status) => translateOrderStatus(status, language),
        };
    }, [language]);
    return _jsx(LanguageContext.Provider, { value: value, children: children });
}
const useLanguage = () => {
    const value = useContext(LanguageContext);
    if (!value) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return value;
};
export { LanguageProvider, useLanguage };
