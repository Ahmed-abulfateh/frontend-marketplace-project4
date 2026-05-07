import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { getListingImages } from '../lib/listingImages';
function ListingCard({ listing }) {
    const { copy, formatCurrency, translateCatalogText, translateListingStatus } = useLanguage();
    const { cartIds, favoriteIds, listingStatuses, toggleCart, toggleFavorite } = useMarketplace();
    const isFavorite = favoriteIds.includes(listing.id);
    const isInCart = cartIds.includes(listing.id);
    const currentStatus = listingStatuses[listing.id] ?? listing.status;
    const listingImages = getListingImages(listing);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    useEffect(() => {
        setActiveImageIndex(0);
    }, [listing.id]);
    useEffect(() => {
        if (listingImages.length <= 1) {
            return;
        }
        const timer = window.setInterval(() => {
            setActiveImageIndex((current) => (current + 1) % listingImages.length);
        }, 2200);
        return () => window.clearInterval(timer);
    }, [listingImages]);
    return (_jsxs("article", { className: "listing-card", children: [listingImages.length > 0 ? (_jsxs("div", { className: "listing-image-stage", children: [_jsx("img", { className: "listing-image-media", src: listingImages[activeImageIndex], alt: translateCatalogText(listing.title), loading: "lazy" }), listingImages.length > 1 ? (_jsx("div", { className: "listing-image-dots", "aria-hidden": "true", children: listingImages.map((imageUrl, index) => (_jsx("span", { className: index === activeImageIndex ? 'listing-image-dot listing-image-dot-active' : 'listing-image-dot' }, `${listing.id}-${imageUrl}`))) })) : null] })) : (_jsx("div", { className: "listing-image-placeholder", "aria-hidden": "true" })), _jsxs("div", { className: "listing-card-body", children: [_jsxs("div", { className: "listing-topline", children: [_jsx("p", { className: "card-label", children: translateCatalogText(listing.category) }), _jsx("span", { className: "badge", children: translateCatalogText(listing.trust) })] }), _jsx("h3", { children: _jsx(Link, { className: "listing-link", to: `/browse/${listing.id}`, children: translateCatalogText(listing.title) }) }), _jsx("p", { className: "seller-name", children: listing.seller }), _jsx("p", { children: translateCatalogText(listing.meta) }), _jsxs("div", { className: "listing-meta-grid", children: [_jsx("span", { children: translateCatalogText(listing.shipping) }), _jsx("span", { children: copy.common.sellerScore(listing.reviewScore.toFixed(1)) }), _jsx("span", { children: translateListingStatus(currentStatus) })] }), _jsxs("div", { className: "listing-footer", children: [_jsx("strong", { children: formatCurrency(listing.price) }), _jsx("span", { children: copy.common.inStock(listing.inventory) })] }), _jsxs("div", { className: "card-actions", children: [_jsx("button", { type: "button", className: "button button-ghost", onClick: () => toggleFavorite(listing.id), children: isFavorite ? copy.product.savedToFavorites : copy.common.save }), _jsx("button", { type: "button", className: "button button-secondary", onClick: () => toggleCart(listing.id), children: isInCart ? copy.product.removeFromCart : copy.product.addToCart })] })] })] }));
}
export default ListingCard;
