import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
function ProtectedRoute({ roles }) {
    const { copy } = useLanguage();
    const { isReady, session } = useMarketplace();
    const location = useLocation();
    if (!isReady) {
        return _jsx("main", { className: "loading-shell", children: copy.common.loading });
    }
    if (!session) {
        return _jsx(Navigate, { to: "/sign-in", replace: true, state: { from: location.pathname } });
    }
    if (roles && !roles.includes(session.role)) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    return _jsx(Outlet, {});
}
export default ProtectedRoute;
