import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import logoSrc from '../assets/logo.png';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
function MarketplaceLayout() {
    const { copy, language, setLanguage, translateRoleLabel } = useLanguage();
    const { cartIds, favoriteIds, session, signOut } = useMarketplace();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(() => searchParams.get('q') ?? '');
    // Keep header search bar in sync when navigating to /browse with a query
    useEffect(() => {
        const nextSearchQuery = new URLSearchParams(location.search).get('q') ?? '';
        if (location.pathname === '/browse') {
            setSearchQuery((current) => (current === nextSearchQuery ? current : nextSearchQuery));
        }
        else if (location.pathname !== '/browse') {
            setSearchQuery((current) => (current === '' ? current : ''));
        }
    }, [location.pathname, location.search]);
    const handleSearch = (e) => {
        e.preventDefault();
        const q = searchQuery.trim();
        navigate(q ? `/browse?q=${encodeURIComponent(q)}` : '/browse');
    };
    const navItems = [
        { to: '/', label: copy.layout.nav.home, end: true },
        { to: '/browse', label: copy.layout.nav.browse },
        ...(session?.role === 'seller' ? [{ to: '/seller', label: copy.layout.nav.seller }] : []),
        ...(session?.role === 'admin' ? [{ to: '/admin', label: copy.layout.nav.admin }] : []),
        ...(session ? [{ to: '/shipments', label: copy.layout.nav.shipments }] : []),
        { to: '/checkout', label: copy.layout.nav.checkout },
    ];
    return (_jsxs("div", { className: "app-shell", children: [_jsxs("header", { className: "site-header", children: [_jsxs("div", { className: "header-top", children: [_jsx(Link, { to: "/", className: "header-logo-link", children: _jsx("img", { src: logoSrc, alt: copy.layout.brand, className: "header-logo" }) }), _jsxs("form", { className: "header-search-form", onSubmit: handleSearch, role: "search", children: [_jsx("input", { className: "header-search-input", type: "search", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: copy.browse.searchPlaceholder, "aria-label": copy.browse.searchKicker }), _jsx("button", { type: "submit", className: "header-search-btn", "aria-label": "Search", children: _jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("circle", { cx: "11", cy: "11", r: "8" }), _jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })] }) })] }), _jsxs("div", { className: "header-actions", children: [_jsxs("button", { type: "button", className: "header-icon-btn header-lang-btn", onClick: () => setLanguage(language === 'en' ? 'ar' : 'en'), title: language === 'en' ? copy.common.arabic : copy.common.english, children: [_jsxs("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("line", { x1: "2", y1: "12", x2: "22", y2: "12" }), _jsx("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })] }), _jsx("span", { children: language === 'en' ? 'EN' : 'AR' })] }), _jsxs(Link, { to: "/checkout", className: "header-icon-btn", title: copy.common.savedCount(favoriteIds.length), children: [_jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" }) }), favoriteIds.length > 0 && _jsx("span", { className: "header-badge", children: favoriteIds.length })] }), _jsxs(Link, { to: "/checkout", className: "header-icon-btn", title: copy.common.cartCount(cartIds.length), children: [_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("circle", { cx: "9", cy: "21", r: "1" }), _jsx("circle", { cx: "20", cy: "21", r: "1" }), _jsx("path", { d: "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" })] }), cartIds.length > 0 && _jsx("span", { className: "header-badge", children: cartIds.length })] }), session ? (_jsx(Link, { to: "/shipments", className: "header-icon-btn", title: copy.layout.nav.shipments, children: _jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("rect", { x: "1", y: "3", width: "15", height: "13" }), _jsx("polygon", { points: "16 8 20 8 23 11 23 16 16 16 16 8" }), _jsx("circle", { cx: "5.5", cy: "18.5", r: "1.5" }), _jsx("circle", { cx: "18.5", cy: "18.5", r: "1.5" })] }) })) : null, session ? (_jsxs("div", { className: "header-profile", children: [_jsxs("div", { className: "header-icon-btn header-profile-btn", children: [_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), _jsx("circle", { cx: "12", cy: "7", r: "4" })] }), _jsx("span", { className: "header-profile-name", children: session.name }), _jsx("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("polyline", { points: "6 9 12 15 18 9" }) })] }), _jsxs("div", { className: "header-profile-dropdown", children: [_jsx("span", { className: "dropdown-role", children: translateRoleLabel(session.role) }), _jsx(Link, { className: "dropdown-item", to: "/profile", children: copy.layout.profile }), _jsx("button", { type: "button", className: "dropdown-item", onClick: () => void signOut(), children: copy.layout.signOut })] })] })) : (_jsxs("div", { className: "header-auth-btns", children: [_jsx(Link, { className: "header-auth-link", to: "/sign-in", children: copy.layout.signIn }), _jsx(Link, { className: "header-auth-link header-auth-link-primary", to: "/sign-up", children: copy.layout.signUp })] }))] })] }), _jsx("nav", { className: "header-nav", "aria-label": "Primary navigation", children: navItems.map((item) => (_jsx(NavLink, { to: item.to, end: item.end, className: ({ isActive }) => isActive ? 'header-nav-link header-nav-link-active' : 'header-nav-link', children: item.label }, item.to))) })] }), _jsx(Outlet, {}), _jsx("footer", { className: "site-footer" })] }));
}
export default MarketplaceLayout;
