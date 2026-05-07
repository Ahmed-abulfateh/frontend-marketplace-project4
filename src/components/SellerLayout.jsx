import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink, Outlet } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
function SellerLayout() {
    const { copy } = useLanguage();
    return (_jsxs("main", { className: "page-stack", children: [_jsxs("section", { className: "subnav-panel", children: [_jsx("p", { className: "section-kicker", children: copy.sellerLayout.kicker }), _jsxs("nav", { className: "subnav-links", "aria-label": "Seller pages", children: [_jsx(NavLink, { end: true, to: "/seller", className: ({ isActive }) => (isActive ? 'subnav-link subnav-link-active' : 'subnav-link'), children: copy.sellerLayout.dashboard }), _jsx(NavLink, { to: "/seller/products", className: ({ isActive }) => (isActive ? 'subnav-link subnav-link-active' : 'subnav-link'), children: "My Products" }), _jsx(NavLink, { to: "/seller/orders", className: ({ isActive }) => (isActive ? 'subnav-link subnav-link-active' : 'subnav-link'), children: copy.sellerLayout.orders })] })] }), _jsx(Outlet, {})] }));
}
export default SellerLayout;
