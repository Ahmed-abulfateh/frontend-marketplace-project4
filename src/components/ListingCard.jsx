import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { getListingImages } from '../lib/listingImages';
const LISTING_IMAGE_PLACEHOLDER = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22960%22 height=%22640%22 viewBox=%220 0 960 640%22%3E%3Cdefs%3E%3ClinearGradient id=%22g%22 x1=%220%22 y1=%220%22 x2=%221%22 y2=%221%22%3E%3Cstop offset=%220%25%22 stop-color=%22%23131b24%22/%3E%3Cstop offset=%22100%25%22 stop-color=%22%23080b10%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%22960%22 height=%22640%22 fill=%22url(%23g)%22/%3E%3Ccircle cx=%22380%22 cy=%22256%22 r=%2272%22 fill=%22%231d9bf0%22 fill-opacity=%220.2%22/%3E%3Cpath d=%22M220 430l126-126a24 24 0 0 1 34 0l88 88 52-52a24 24 0 0 1 34 0L740 430v36H220z%22 fill=%22%231d9bf0%22 fill-opacity=%220.34%22/%3E%3Ctext x=%2250%25%22 y=%2262%25%22 text-anchor=%22middle%22 fill=%22%23e7e9ea%22 font-family=%22Arial, sans-serif%22 font-size=%2238%22%3EImage unavailable%3C/text%3E%3C/svg%3E';
function ListingImageStage({ listingId, listingTitle, listingImages }) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [failedImageIndexes, setFailedImageIndexes] = useState([]);
    const resolvedImageIndex = listingImages.findIndex((_, index) => index >= activeImageIndex && !failedImageIndexes.includes(index));
    const currentImageIndex = resolvedImageIndex >= 0
        ? resolvedImageIndex
        : listingImages.findIndex((_, index) => !failedImageIndexes.includes(index));
    const currentImage = currentImageIndex >= 0 ? listingImages[currentImageIndex] : undefined;
    if (listingImages.length === 0) {
        return _jsx("div", { className: "listing-image-placeholder", "aria-hidden": "true" });
    }
    return (_jsxs("div", { className: "listing-image-stage", children: [_jsx("img", { className: "listing-image-media", src: currentImage ?? LISTING_IMAGE_PLACEHOLDER, alt: listingTitle, loading: "lazy", onError: () => {
                    if (currentImageIndex < 0) {
                        return;
                    }
                    setFailedImageIndexes((current) => (current.includes(currentImageIndex) ? current : [...current, currentImageIndex]));
                    const nextIndex = listingImages.findIndex((_, index) => index > currentImageIndex && !failedImageIndexes.includes(index));
                    setActiveImageIndex(nextIndex >= 0 ? nextIndex : 0);
                } }), listingImages.length > 1 ? (_jsx("div", { className: "listing-image-dots", children: listingImages.map((imageUrl, index) => (_jsx("button", { type: "button", className: index === activeImageIndex ? 'listing-image-dot listing-image-dot-active' : 'listing-image-dot', onClick: () => setActiveImageIndex(index), "aria-label": `Show image ${index + 1} of ${listingImages.length} for ${listingTitle}`, "aria-pressed": index === activeImageIndex, disabled: failedImageIndexes.includes(index) }, `${listingId}-${imageUrl}`))) })) : null] }));
}
function ListingCard({ listing }) {
    const { copy, formatCurrency, translateCatalogText, translateListingStatus } = useLanguage();
    const { cartIds, favoriteIds, listingStatuses, toggleCart, toggleFavorite } = useMarketplace();
    const isFavorite = favoriteIds.includes(listing.id);
    const isInCart = cartIds.includes(listing.id);
    const currentStatus = listingStatuses[listing.id] ?? listing.status;
    const listingImages = getListingImages(listing);
    const listingTitle = translateCatalogText(listing.title);
    return (_jsxs("article", { className: "listing-card", children: [_jsx(ListingImageStage, { listingId: listing.id, listingTitle: listingTitle, listingImages: listingImages }), _jsxs("div", { className: "listing-card-body", children: [_jsxs("div", { className: "listing-topline", children: [_jsx("p", { className: "card-label", children: translateCatalogText(listing.category) }), _jsx("span", { className: "badge", children: translateCatalogText(listing.trust) })] }), _jsx("h3", { children: _jsx(Link, { className: "listing-link", to: `/browse/${listing.id}`, children: listingTitle }) }), _jsx("p", { className: "seller-name", children: listing.seller }), _jsx("p", { children: translateCatalogText(listing.meta) }), _jsxs("div", { className: "listing-meta-grid", children: [_jsx("span", { children: translateCatalogText(listing.shipping) }), _jsx("span", { children: copy.common.sellerScore(listing.reviewScore.toFixed(1)) }), _jsx("span", { children: translateListingStatus(currentStatus) })] }), _jsxs("div", { className: "listing-footer", children: [_jsx("strong", { children: formatCurrency(listing.price) }), _jsx("span", { children: copy.common.inStock(listing.inventory) })] }), _jsxs("div", { className: "card-actions", children: [_jsx("button", { type: "button", className: "button button-ghost", onClick: () => toggleFavorite(listing.id), children: isFavorite ? copy.product.savedToFavorites : copy.common.save }), _jsx("button", { type: "button", className: "button button-secondary", onClick: () => toggleCart(listing.id), children: isInCart ? copy.product.removeFromCart : copy.product.addToCart })] })] })] }));
}
export default ListingCard;
