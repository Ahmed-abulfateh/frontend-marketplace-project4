import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { getListingImages } from '../lib/listingImages';
const createFormFromListing = (listing) => {
    const listingImages = getListingImages(listing);
    return {
        title: listing.title,
        imageUrl: listingImages[0] ?? listing.imageUrl,
        imageUrls: Array.from({ length: 6 }, (_, index) => listingImages[index] ?? ''),
        price: listing.price,
        meta: listing.meta,
        description: listing.description,
        category: listing.category,
        trust: listing.trust,
        shipping: listing.shipping,
        inventory: listing.inventory,
    };
};
function AdminModerationDetailPage() {
    const { listingId } = useParams();
    const navigate = useNavigate();
    const { copy, translateCatalogText, translateListingStatus } = useLanguage();
    const { addModerationNote, deleteListing, isReady, listingStatuses, listings, updateListing, updateListingStatus, } = useMarketplace();
    const [note, setNote] = useState('');
    const [form, setForm] = useState(null);
    const [actionNotice, setActionNotice] = useState(null);
    if (!isReady) {
        return _jsx("main", { className: "loading-shell", children: copy.common.loading });
    }
    const listing = listings.find((item) => item.id === listingId);
    if (!listing) {
        return _jsx(Navigate, { to: "/admin/moderation", replace: true });
    }
    const currentStatus = listingStatuses[listing.id] ?? listing.status;
    useEffect(() => {
        setForm(createFormFromListing(listing));
    }, [listing]);
    const handleAddNote = async (event) => {
        event.preventDefault();
        setActionNotice(null);
        if (!note.trim()) {
            return;
        }
        try {
            await addModerationNote(listing.id, note);
            setNote('');
            setActionNotice({ tone: 'success', message: copy.moderation.notices.noteSaved });
        }
        catch (error) {
            setActionNotice({
                tone: 'error',
                message: error instanceof Error ? error.message : copy.moderation.notices.noteError,
            });
        }
    };
    const handleUpdateListing = async (event) => {
        event.preventDefault();
        setActionNotice(null);
        if (!form) {
            return;
        }
        try {
            const imageUrls = form.imageUrls.map((value) => value.trim()).filter(Boolean).slice(0, 6);
            await updateListing(listing.id, {
                ...form,
                imageUrl: imageUrls[0] ?? '',
                imageUrls,
            });
            setActionNotice({ tone: 'success', message: copy.moderation.notices.updated });
        }
        catch (error) {
            setActionNotice({
                tone: 'error',
                message: error instanceof Error ? error.message : copy.moderation.notices.updateError,
            });
        }
    };
    const handleDeleteListing = async () => {
        setActionNotice(null);
        if (!window.confirm(copy.common.deletePrompt(translateCatalogText(listing.title)))) {
            return;
        }
        try {
            await deleteListing(listing.id);
            navigate('/admin/moderation');
        }
        catch (error) {
            setActionNotice({
                tone: 'error',
                message: error instanceof Error ? error.message : copy.moderation.notices.deleteError,
            });
        }
    };
    return (_jsxs("section", { className: "product-layout", children: [_jsxs("article", { className: "product-panel", children: [_jsxs("div", { className: "section-heading compact", children: [_jsx("p", { className: "section-kicker", children: copy.moderation.detailKicker }), _jsx("h2", { children: translateCatalogText(listing.title) })] }), _jsx("p", { children: translateCatalogText(listing.description) }), _jsxs("div", { className: "product-details-grid", children: [_jsxs("div", { children: [_jsx("span", { className: "product-label", children: copy.moderation.seller }), _jsx("strong", { children: listing.seller })] }), _jsxs("div", { children: [_jsx("span", { className: "product-label", children: copy.moderation.trustSignal }), _jsx("strong", { children: translateCatalogText(listing.trust) })] }), _jsxs("div", { children: [_jsx("span", { className: "product-label", children: copy.moderation.currentState }), _jsx("strong", { children: translateListingStatus(currentStatus) })] })] }), _jsxs("div", { className: "section-heading compact moderation-section", children: [_jsx("p", { className: "section-kicker", children: copy.moderation.notesKicker }), _jsx("h2", { children: copy.moderation.notesTitle })] }), _jsx("div", { className: "checkout-list", children: listing.moderationNotes.length > 0 ? (listing.moderationNotes.map((entry) => (_jsxs("div", { className: "checkout-row", children: [_jsxs("div", { children: [_jsx("strong", { children: entry.author }), _jsx("p", { children: entry.note })] }), _jsx("span", { children: new Date(entry.createdAt).toLocaleDateString() })] }, `${entry.author}-${entry.createdAt}`)))) : (_jsx("div", { className: "checkout-row", children: _jsxs("div", { children: [_jsx("strong", { children: copy.moderation.noNotesTitle }), _jsx("p", { children: copy.moderation.noNotesSummary })] }) })) })] }), _jsxs("aside", { className: "purchase-panel", children: [_jsx("p", { className: "card-label", children: copy.moderation.actionsLabel }), _jsx("p", { children: copy.moderation.actionsSummary }), actionNotice ? (_jsx("p", { className: actionNotice.tone === 'success' ? 'form-notice form-notice-success' : 'form-notice form-notice-error', children: actionNotice.message })) : null, _jsx("div", { className: "card-actions vertical-actions", children: ['live', 'review', 'paused'].map((status) => (_jsx("button", { type: "button", className: status === currentStatus ? 'button button-primary' : 'button button-secondary', onClick: () => void updateListingStatus(listing.id, status), children: copy.moderation.setStatus(translateListingStatus(status)) }, status))) }), _jsxs("form", { className: "form-grid compact-form-grid", onSubmit: handleUpdateListing, children: [_jsx("input", { value: form?.title ?? '', onChange: (event) => setForm((current) => current ? { ...current, title: event.target.value } : current), placeholder: copy.moderation.placeholders.title, required: true }), form?.imageUrls.map((imageUrl, index) => (_jsx("input", { value: imageUrl, onChange: (event) => setForm((current) => {
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
                                }), placeholder: `${copy.moderation.placeholders.imageUrl} ${index + 1}`, type: "url" }, `moderation-image-url-${index}`))), _jsx("input", { value: form?.category ?? '', onChange: (event) => setForm((current) => current ? { ...current, category: event.target.value } : current), placeholder: copy.moderation.placeholders.category, required: true }), _jsx("input", { value: String(form?.price ?? ''), onChange: (event) => setForm((current) => current ? { ...current, price: Number(event.target.value) } : current), placeholder: copy.moderation.placeholders.price, type: "number", min: "1", required: true }), _jsx("input", { value: String(form?.inventory ?? ''), onChange: (event) => setForm((current) => current ? { ...current, inventory: Number(event.target.value) } : current), placeholder: copy.moderation.placeholders.inventory, type: "number", min: "1", required: true }), _jsx("input", { value: form?.trust ?? '', onChange: (event) => setForm((current) => current ? { ...current, trust: event.target.value } : current), placeholder: copy.moderation.placeholders.trust, required: true }), _jsx("input", { value: form?.shipping ?? '', onChange: (event) => setForm((current) => current ? { ...current, shipping: event.target.value } : current), placeholder: copy.moderation.placeholders.shipping, required: true }), _jsx("textarea", { value: form?.meta ?? '', onChange: (event) => setForm((current) => current ? { ...current, meta: event.target.value } : current), placeholder: copy.moderation.placeholders.meta, required: true }), _jsx("textarea", { value: form?.description ?? '', onChange: (event) => setForm((current) => current ? { ...current, description: event.target.value } : current), placeholder: copy.moderation.placeholders.description, required: true }), _jsx("button", { type: "submit", className: "button button-primary", children: copy.moderation.saveEdits })] }), _jsxs("form", { className: "form-grid compact-form-grid", onSubmit: handleAddNote, children: [_jsx("textarea", { value: note, onChange: (event) => setNote(event.target.value), placeholder: copy.moderation.placeholders.note, required: true }), _jsx("button", { type: "submit", className: "button button-primary", children: copy.moderation.saveNote })] }), _jsx("button", { type: "button", className: "button button-ghost", onClick: () => void handleDeleteListing(), children: copy.moderation.deleteProduct })] })] }));
}
export default AdminModerationDetailPage;
