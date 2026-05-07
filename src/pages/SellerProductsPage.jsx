import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { getListingImages } from '../lib/listingImages';
const createFormFromListing = (listing) => {
    const listingImages = getListingImages(listing);
    return {
        title: listing.title,
        imageUrl: listingImages[0] ?? listing.imageUrl,
        imageUrls: Array.from({ length: 6 }, (_, index) => listingImages[index] ?? ''),
        category: listing.category,
        price: listing.price,
        inventory: listing.inventory,
        meta: listing.meta,
        description: listing.description,
        trust: listing.trust,
        shipping: listing.shipping,
    };
};
function SellerProductsPage() {
    const { copy, formatCurrency, translateCatalogText, translateListingStatus } = useLanguage();
    const { listingStatuses, listings, session, updateListing } = useMarketplace();
    const [editingListingId, setEditingListingId] = useState(null);
    const [form, setForm] = useState(null);
    const [notice, setNotice] = useState(null);
    const managedListings = listings.filter((listing) => listing.seller === session?.name);
    const editingListing = managedListings.find((listing) => listing.id === editingListingId) ?? null;
    const startEditing = (listing) => {
        setEditingListingId(listing.id);
        setForm(createFormFromListing(listing));
        setNotice(null);
    };
    const stopEditing = () => {
        setEditingListingId(null);
        setForm(null);
    };
    const handleUpdateListing = async (event) => {
        event.preventDefault();
        if (!editingListingId || !form) {
            return;
        }
        setNotice(null);
        const imageUrls = form.imageUrls.map((value) => value.trim()).filter(Boolean).slice(0, 6);
        try {
            await updateListing(editingListingId, {
                ...form,
                imageUrl: imageUrls[0] ?? '',
                imageUrls,
            });
            setNotice({ tone: 'success', message: 'Product updated successfully.' });
            stopEditing();
        }
        catch (error) {
            setNotice({
                tone: 'error',
                message: error instanceof Error ? error.message : 'Could not update product.',
            });
        }
    };
    return (_jsxs("section", { className: "market-grid", children: [_jsxs("div", { className: "section-heading compact", children: [_jsx("p", { className: "section-kicker", children: "Seller products" }), _jsx("h2", { children: "My Products" })] }), notice ? (_jsx("p", { className: notice.tone === 'success' ? 'form-notice form-notice-success' : 'form-notice form-notice-error', children: notice.message })) : null, _jsx("div", { className: "queue-grid seller-queue-grid", children: managedListings.length === 0 ? (_jsx("article", { className: "queue-card", children: _jsx("p", { children: copy.seller.noListingsSummary }) })) : managedListings.map((listing) => {
                    const status = listingStatuses[listing.id] ?? listing.status;
                    const listingImages = getListingImages(listing);
                    return (_jsxs("article", { className: "queue-card", children: [_jsx("p", { className: "card-label", children: translateCatalogText(listing.category) }), _jsx("h3", { children: translateCatalogText(listing.title) }), _jsx("p", { className: "seller-name", children: formatCurrency(listing.price) }), listingImages[0] ? _jsx("img", { className: "listing-image-preview-img", src: listingImages[0], alt: translateCatalogText(listing.title) }) : null, _jsxs("div", { className: "product-details-grid", children: [_jsxs("div", { children: [_jsx("span", { className: "product-label", children: "Status" }), _jsx("strong", { children: translateListingStatus(status) })] }), _jsxs("div", { children: [_jsx("span", { className: "product-label", children: "Inventory" }), _jsx("strong", { children: copy.common.units(listing.inventory) })] }), _jsxs("div", { children: [_jsx("span", { className: "product-label", children: "Images" }), _jsx("strong", { children: listingImages.length })] })] }), _jsx("div", { className: "card-actions", children: _jsx("button", { type: "button", className: "button button-primary", onClick: () => startEditing(listing), children: "Edit product" }) })] }, listing.id));
                }) }), editingListing && form ? (_jsxs("section", { className: "market-grid", children: [_jsxs("div", { className: "section-heading compact", children: [_jsx("p", { className: "section-kicker", children: "Product editor" }), _jsx("h2", { children: translateCatalogText(editingListing.title) })] }), _jsxs("form", { className: "form-grid", onSubmit: handleUpdateListing, children: [_jsx("input", { value: form.title, onChange: (event) => setForm((current) => current ? { ...current, title: event.target.value } : current), placeholder: copy.seller.placeholders.title, required: true }), _jsx("div", { className: "listing-image-url-grid", children: form.imageUrls.map((imageUrl, index) => (_jsx("input", { value: imageUrl, onChange: (event) => setForm((current) => {
                                        if (!current) {
                                            return current;
                                        }
                                        const imageUrls = [...current.imageUrls];
                                        imageUrls[index] = event.target.value;
                                        return {
                                            ...current,
                                            imageUrls,
                                            imageUrl: imageUrls.find((value) => value.trim()) ?? '',
                                        };
                                    }), placeholder: `${copy.seller.placeholders.imageUrl} ${index + 1}`, type: "url" }, `seller-product-image-url-${index}`))) }), _jsx("input", { value: form.category, onChange: (event) => setForm((current) => current ? { ...current, category: event.target.value } : current), placeholder: copy.seller.placeholders.category, required: true }), _jsx("input", { value: String(form.price), onChange: (event) => setForm((current) => current ? { ...current, price: Number(event.target.value) } : current), placeholder: copy.seller.placeholders.price, type: "number", min: "1", step: "0.001", required: true }), _jsx("input", { value: String(form.inventory), onChange: (event) => setForm((current) => current ? { ...current, inventory: Number(event.target.value) } : current), placeholder: copy.seller.placeholders.inventory, type: "number", min: "0", required: true }), _jsx("input", { value: form.trust, onChange: (event) => setForm((current) => current ? { ...current, trust: event.target.value } : current), placeholder: copy.seller.placeholders.trust, required: true }), _jsx("input", { value: form.shipping, onChange: (event) => setForm((current) => current ? { ...current, shipping: event.target.value } : current), placeholder: copy.seller.placeholders.shipping, required: true }), _jsx("textarea", { value: form.meta, onChange: (event) => setForm((current) => current ? { ...current, meta: event.target.value } : current), placeholder: copy.seller.placeholders.meta, required: true }), _jsx("textarea", { value: form.description, onChange: (event) => setForm((current) => current ? { ...current, description: event.target.value } : current), placeholder: copy.seller.placeholders.description, required: true }), _jsxs("div", { className: "card-actions", children: [_jsx("button", { type: "submit", className: "button button-primary", children: "Save changes" }), _jsx("button", { type: "button", className: "button button-secondary", onClick: stopEditing, children: "Cancel" })] })] })] })) : null] }));
}
export default SellerProductsPage;
