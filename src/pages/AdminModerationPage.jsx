import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
function AdminModerationPage() {
    const { copy, translateCatalogText, translateListingStatus } = useLanguage();
    const { deleteListing, listingStatuses, listings } = useMarketplace();
    const [actionNotice, setActionNotice] = useState(null);
    const handleDeleteListing = async (listingId, title) => {
        setActionNotice(null);
        if (!window.confirm(copy.common.deletePrompt(translateCatalogText(title)))) {
            return;
        }
        try {
            await deleteListing(listingId);
            setActionNotice({ tone: 'success', message: copy.seller.notices.deleted });
        }
        catch (error) {
            setActionNotice({
                tone: 'error',
                message: error instanceof Error ? error.message : copy.moderation.notices.deleteError,
            });
        }
    };
    return (_jsxs("section", { className: "market-grid", children: [_jsxs("div", { className: "section-heading compact", children: [_jsx("p", { className: "section-kicker", children: copy.moderation.boardKicker }), _jsx("h2", { children: copy.moderation.boardTitle })] }), actionNotice ? (_jsx("p", { className: actionNotice.tone === 'success' ? 'form-notice form-notice-success' : 'form-notice form-notice-error', children: actionNotice.message })) : null, _jsx("div", { className: "queue-grid admin-order-grid", children: listings.map((listing) => (_jsxs("article", { className: "queue-card", children: [_jsx("p", { className: "card-label", children: translateCatalogText(listing.category) }), _jsx("h3", { children: translateCatalogText(listing.title) }), _jsx("p", { children: listing.seller }), _jsxs("div", { className: "listing-footer", children: [_jsx("strong", { children: translateListingStatus(listingStatuses[listing.id] ?? listing.status) }), _jsx("span", { children: translateCatalogText(listing.trust) })] }), _jsxs("div", { className: "card-actions", children: [_jsx(Link, { className: "inline-link", to: `/admin/moderation/${listing.id}`, children: copy.moderation.reviewListing }), _jsx("button", { type: "button", className: "button button-ghost", onClick: () => void handleDeleteListing(listing.id, listing.title), children: copy.moderation.deleteProduct })] })] }, listing.id))) })] }));
}
export default AdminModerationPage;
