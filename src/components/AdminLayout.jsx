import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink, Outlet } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
function AdminLayout() {
    const { copy } = useLanguage();
    return (_jsxs("main", { className: "page-stack", children: [_jsxs("section", { className: "subnav-panel", children: [_jsx("p", { className: "section-kicker", children: copy.adminLayout.kicker }), _jsxs("nav", { className: "subnav-links", "aria-label": "Admin pages", children: [_jsx(NavLink, { end: true, to: "/admin", className: ({ isActive }) => (isActive ? 'subnav-link subnav-link-active' : 'subnav-link'), children: copy.adminLayout.dashboard }), _jsx(NavLink, { to: "/admin/consumers", className: ({ isActive }) => (isActive ? 'subnav-link subnav-link-active' : 'subnav-link'), children: copy.adminLayout.consumers }), _jsx(NavLink, { to: "/admin/moderation", className: ({ isActive }) => (isActive ? 'subnav-link subnav-link-active' : 'subnav-link'), children: copy.adminLayout.moderation }), _jsx(NavLink, { to: "/admin/sellers", className: ({ isActive }) => (isActive ? 'subnav-link subnav-link-active' : 'subnav-link'), children: copy.adminLayout.sellers })] })] }), _jsx(Outlet, {})] }));
}
export default AdminLayout;
