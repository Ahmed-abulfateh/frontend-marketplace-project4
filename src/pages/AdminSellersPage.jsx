import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
function AdminSellersPage() {
    const { copy } = useLanguage();
    const { pendingSellers, updateSellerStatus } = useMarketplace();
    const [actionNotice, setActionNotice] = useState(null);
    const [loadingId, setLoadingId] = useState(null);
    const [statusDrafts, setStatusDrafts] = useState({});
    useEffect(() => {
        setStatusDrafts((current) => {
            let hasChanges = false;
            const next = { ...current };
            const sellerIds = new Set(pendingSellers.map((seller) => seller.id));
            pendingSellers.forEach((seller) => {
                if (next[seller.id] !== seller.accountStatus) {
                    next[seller.id] = seller.accountStatus;
                    hasChanges = true;
                }
            });
            Object.keys(next).forEach((sellerId) => {
                if (!sellerIds.has(sellerId)) {
                    delete next[sellerId];
                    hasChanges = true;
                }
            });
            return hasChanges ? next : current;
        });
    }, [pendingSellers]);
    const handleStatus = async (userId, status) => {
        setActionNotice(null);
        setLoadingId(userId);
        try {
            await updateSellerStatus(userId, status);
            setActionNotice({ tone: 'success', message: `Seller status updated to ${status}.` });
        }
        catch {
            setActionNotice({ tone: 'error', message: copy.adminSellers.approveError });
        }
        finally {
            setLoadingId(null);
        }
    };
    return (_jsxs("section", { className: "market-grid", children: [_jsxs("div", { className: "section-heading compact", children: [_jsx("p", { className: "section-kicker", children: copy.adminSellers.kicker }), _jsx("h2", { children: copy.adminSellers.title }), _jsx("p", { children: copy.adminSellers.summary })] }), actionNotice ? (_jsx("p", { className: actionNotice.tone === 'success' ? 'form-notice form-notice-success' : 'form-notice form-notice-error', children: actionNotice.message })) : null, pendingSellers.length === 0 ? (_jsx("article", { className: "queue-card", children: _jsx("p", { children: copy.adminSellers.noSellers }) })) : (_jsx("div", { className: "queue-grid admin-order-grid", children: pendingSellers.map((seller) => (_jsxs("article", { className: "queue-card", children: [_jsx("p", { className: "card-label", children: copy.adminSellers.statusLabel }), _jsx("h3", { children: seller.username }), _jsx("p", { children: seller.email }), _jsx("p", { style: { opacity: 0.6, fontSize: '0.85em' }, children: seller.phone }), _jsx("div", { className: "form-grid compact-form-grid", children: _jsxs("select", { value: statusDrafts[seller.id] ?? seller.accountStatus, onChange: (event) => setStatusDrafts((current) => ({
                                    ...current,
                                    [seller.id]: event.target.value,
                                })), disabled: loadingId === seller.id, children: [_jsx("option", { value: "pending", children: copy.adminSellers.statusPending }), _jsx("option", { value: "active", children: copy.adminSellers.statusActive })] }) }), _jsx("div", { className: "card-actions", children: _jsx("button", { type: "button", className: "button button-secondary", disabled: loadingId === seller.id || (statusDrafts[seller.id] ?? seller.accountStatus) === seller.accountStatus, onClick: () => void handleStatus(seller.id, statusDrafts[seller.id] ?? seller.accountStatus), children: copy.common.save }) })] }, seller.id))) }))] }));
}
export default AdminSellersPage;
