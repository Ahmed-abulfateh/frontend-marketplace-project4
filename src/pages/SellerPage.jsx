import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { getListingImages } from '../lib/listingImages';
const sellerCategoryOptions = [
    'Home',
    'Vintage',
    'Textiles',
    'Kitchen',
    'Accessories',
    'Art',
    'Electronics',
    'Jewelry',
    'Clothing',
    'Beauty',
    'Toys',
    'Books',
    'Sports',
    'Garden',
    'Office',
    'Handmade',
    'Furniture',
    'Baby & Kids',
    'Food & Drinks',
    'Collectibles',
];
const sellerQueueCopy = {
    en: {
        readyToShip: 'Ready to ship',
        readyToShipNote: (count) => count > 0
            ? 'Paid orders are waiting for label printing and carrier handoff.'
            : 'No paid orders are waiting for shipment right now.',
        readyToShipAction: 'Open seller orders',
        underReview: 'Listings under review',
        underReviewNote: (count) => count > 0
            ? 'These products are pending seller review before they can go live.'
            : 'All current products have moved beyond the review queue.',
        underReviewAction: 'Review listing controls',
        payoutHold: 'Awaiting delivery release',
        payoutHoldNote: (count) => count > 0
            ? 'Shipped orders are still waiting for delivery confirmation before payout clears.'
            : 'No shipped orders are currently holding payout release.',
        payoutHoldAction: 'Track delivery progress',
    },
    ar: {
        readyToShip: 'جاهزة للشحن',
        readyToShipNote: (count) => count > 0
            ? 'طلبات مدفوعة بانتظار طباعة الملصقات وتسليمها لشركة الشحن.'
            : 'لا توجد حاليًا طلبات مدفوعة بانتظار الشحن.',
        readyToShipAction: 'افتح طلبات البائع',
        underReview: 'منتجات تحت المراجعة',
        underReviewNote: (count) => count > 0
            ? 'هذه المنتجات ما زالت بانتظار مراجعة البائع قبل نشرها.'
            : 'كل المنتجات الحالية تجاوزت قائمة المراجعة.',
        underReviewAction: 'راجع التحكم في المنتجات',
        payoutHold: 'بانتظار تحرير الدفعة',
        payoutHoldNote: (count) => count > 0
            ? 'الطلبات المشحونة ما زالت بانتظار تأكيد التسليم قبل تحرير الدفعة.'
            : 'لا توجد طلبات مشحونة تحجز تحرير الدفعات الآن.',
        payoutHoldAction: 'تابع تقدم التسليم',
    },
};
const createInitialForm = (defaults) => ({
    title: '',
    imageUrl: '',
    imageUrls: ['', '', '', '', '', ''],
    category: defaults.category,
    price: 85,
    inventory: 10,
    meta: '',
    description: '',
    trust: defaults.trust,
    shipping: defaults.shipping,
});
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
function SellerPage() {
    const { copy, formatCurrency, language, translateCatalogText, translateListingStatus } = useLanguage();
    const { createListing, deleteListing, listingStatuses, listings, orders, session, updateListing, updateListingStatus, } = useMarketplace();
    const [editingListingId, setEditingListingId] = useState(null);
    const [form, setForm] = useState(() => createInitialForm(copy.seller.defaultForm));
    const [formNotice, setFormNotice] = useState(null);
    const [listNotice, setListNotice] = useState(null);
    const [stockDrafts, setStockDrafts] = useState({});
    const [savingStockId, setSavingStockId] = useState(null);
    const managedListings = listings.filter((listing) => listing.seller === session?.name);
    const managedListingIds = new Set(managedListings.map((listing) => listing.id));
    const sellerOrders = orders.filter((order) => managedListingIds.has(order.listingId));
    const categoryOptions = Array.from(new Set([
        ...sellerCategoryOptions,
        copy.seller.defaultForm.category,
        ...listings.map((listing) => listing.category),
    ]));
    const readyToShipCount = sellerOrders.filter((order) => order.status === 'paid').length;
    const reviewQueueCount = managedListings.filter((listing) => (listingStatuses[listing.id] ?? listing.status) === 'review').length;
    const payoutHoldCount = sellerOrders.filter((order) => order.status === 'shipped').length;
    const queueCopy = sellerQueueCopy[language];
    const totalProductCount = managedListings.length;
    const totalStockUnits = managedListings.reduce((sum, listing) => sum + listing.inventory, 0);
    const liveProductCount = managedListings.filter((listing) => (listingStatuses[listing.id] ?? listing.status) === 'live').length;
    const maxInventory = Math.max(...managedListings.map((listing) => listing.inventory), 1);
    const sellerQueueCards = [
        {
            id: 'shipments',
            count: readyToShipCount,
            label: queueCopy.readyToShip,
            note: queueCopy.readyToShipNote(readyToShipCount),
            action: queueCopy.readyToShipAction,
            to: '/seller/orders',
        },
        {
            id: 'review',
            count: reviewQueueCount,
            label: queueCopy.underReview,
            note: queueCopy.underReviewNote(reviewQueueCount),
            action: queueCopy.underReviewAction,
            to: '#seller-listings',
        },
        {
            id: 'payout',
            count: payoutHoldCount,
            label: queueCopy.payoutHold,
            note: queueCopy.payoutHoldNote(payoutHoldCount),
            action: queueCopy.payoutHoldAction,
            to: '/seller/orders',
        },
    ];
    useEffect(() => {
        if (!editingListingId) {
            return;
        }
        const listing = managedListings.find((item) => item.id === editingListingId);
        if (!listing) {
            setEditingListingId(null);
            setForm(createInitialForm(copy.seller.defaultForm));
            return;
        }
        setForm(createFormFromListing(listing));
    }, [copy.seller.defaultForm, editingListingId, managedListings]);
    useEffect(() => {
        setStockDrafts((current) => {
            let hasChanges = false;
            const next = { ...current };
            const managedIds = new Set(managedListings.map((listing) => listing.id));
            managedListings.forEach((listing) => {
                const nextInventory = String(listing.inventory);
                if (next[listing.id] === undefined || (savingStockId === listing.id && next[listing.id] !== nextInventory)) {
                    next[listing.id] = String(listing.inventory);
                    hasChanges = true;
                }
            });
            Object.keys(next).forEach((listingId) => {
                if (!managedIds.has(listingId)) {
                    delete next[listingId];
                    hasChanges = true;
                }
            });
            return hasChanges ? next : current;
        });
    }, [managedListings, savingStockId]);
    const sellerMetrics = [
        {
            label: copy.seller.metrics[0].label,
            value: String(listings.filter((listing) => (listingStatuses[listing.id] ?? listing.status) === 'live')
                .length),
            note: copy.seller.metrics[0].note,
        },
        {
            label: copy.seller.metrics[1].label,
            value: formatCurrency(orders.reduce((total, order) => total + order.total, 0)),
            note: copy.seller.metrics[1].note,
        },
        {
            label: copy.seller.metrics[2].label,
            value: String(orders.filter((order) => order.status === 'pending' || order.status === 'paid').length),
            note: copy.seller.metrics[2].note,
        },
    ];
    const setStatus = (listingId, status) => {
        void updateListingStatus(listingId, status);
    };
    const startEditing = (listing) => {
        setEditingListingId(listing.id);
        setForm(createFormFromListing(listing));
        setFormNotice(null);
    };
    const stopEditing = () => {
        setEditingListingId(null);
        setForm(createInitialForm(copy.seller.defaultForm));
        setFormNotice(null);
    };
    const handleCreateListing = async (event) => {
        event.preventDefault();
        setFormNotice(null);
        try {
            const normalizedForm = {
                ...form,
                imageUrls: form.imageUrls.map((value) => value.trim()).filter(Boolean).slice(0, 6),
            };
            if (editingListingId) {
                await updateListing(editingListingId, {
                    ...normalizedForm,
                    imageUrl: normalizedForm.imageUrls[0] ?? '',
                });
                stopEditing();
                setFormNotice({ tone: 'success', message: copy.seller.notices.updated });
                return;
            }
            await createListing({
                ...normalizedForm,
                imageUrl: normalizedForm.imageUrls[0] ?? '',
            });
            setForm(createInitialForm(copy.seller.defaultForm));
            setFormNotice({ tone: 'success', message: copy.seller.notices.created });
        }
        catch (error) {
            setFormNotice({
                tone: 'error',
                message: error instanceof Error ? error.message : copy.seller.notices.saveError,
            });
        }
    };
    const handleDeleteListing = async (listing) => {
        setListNotice(null);
        if (!window.confirm(copy.common.deletePrompt(translateCatalogText(listing.title)))) {
            return;
        }
        try {
            await deleteListing(listing.id);
            if (editingListingId === listing.id) {
                stopEditing();
            }
            setListNotice({ tone: 'success', message: copy.seller.notices.deleted });
        }
        catch (error) {
            setListNotice({
                tone: 'error',
                message: error instanceof Error ? error.message : copy.seller.notices.deleteError,
            });
        }
    };
    const handleStockSave = async (listing) => {
        const draft = stockDrafts[listing.id] ?? String(listing.inventory);
        const nextInventory = Number(draft);
        if (!Number.isInteger(nextInventory) || nextInventory < 0) {
            setListNotice({ tone: 'error', message: copy.seller.notices.stockValidation });
            return;
        }
        setSavingStockId(listing.id);
        setListNotice(null);
        try {
            await updateListing(listing.id, {
                ...createFormFromListing(listing),
                inventory: nextInventory,
            });
            setListNotice({ tone: 'success', message: copy.seller.notices.stockUpdated });
        }
        catch (error) {
            setListNotice({
                tone: 'error',
                message: error instanceof Error ? error.message : copy.seller.notices.stockUpdateError,
            });
        }
        finally {
            setSavingStockId(null);
        }
    };
    if (session?.accountStatus === 'pending') {
        return (_jsx("main", { className: "page-stack", children: _jsx("section", { className: "market-grid", children: _jsxs("article", { className: "queue-card", style: { maxWidth: '480px', margin: '0 auto' }, children: [_jsx("p", { className: "section-kicker", children: copy.sellerPending.kicker }), _jsx("h2", { children: copy.sellerPending.title }), _jsx("p", { children: copy.sellerPending.summary }), _jsx("p", { style: { marginTop: '0.75rem', opacity: 0.7 }, children: copy.sellerPending.detail })] }) }) }));
    }
    return (_jsxs("main", { className: "page-stack", children: [_jsx(PageHero, { variant: "seller", kicker: copy.seller.heroKicker, title: copy.seller.heroTitle, summary: copy.seller.heroSummary, aside: _jsxs(_Fragment, { children: [_jsx("p", { className: "card-label", children: copy.seller.readinessLabel }), _jsx("p", { children: copy.seller.readinessSummary })] }), darkAside: true }), _jsx("section", { className: "metric-grid", children: sellerMetrics.map((metric) => (_jsxs("article", { className: "metric-card", children: [_jsx("p", { className: "card-label", children: metric.label }), _jsx("strong", { children: metric.value }), _jsx("p", { children: metric.note })] }, metric.label))) }), _jsxs("section", { className: "market-grid", children: [_jsxs("div", { className: "section-heading compact", children: [_jsx("p", { className: "section-kicker", children: "Stock stats" }), _jsx("h2", { children: "Live product and stock table" })] }), _jsx("div", { className: "table-toolbar", children: _jsxs("p", { className: "table-count-text", children: ["Products: ", totalProductCount, " | Stock units: ", totalStockUnits, " | Live: ", liveProductCount] }) }), _jsx("div", { className: "table-shell", children: managedListings.length === 0 ? (_jsx("article", { className: "queue-card", children: _jsx("p", { children: "No products yet." }) })) : (_jsxs("table", { className: "orders-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Product" }), _jsx("th", { children: "Items in stock" }), _jsx("th", { children: "Stock level" }), _jsx("th", { children: "Live" })] }) }), _jsx("tbody", { children: managedListings.map((listing) => {
                                        const status = listingStatuses[listing.id] ?? listing.status;
                                        const stockPercent = Math.max(0, Math.min(100, Math.round((listing.inventory / maxInventory) * 100)));
                                        return (_jsxs("tr", { children: [_jsx("td", { children: translateCatalogText(listing.title) }), _jsx("td", { children: listing.inventory }), _jsx("td", { children: _jsx("div", { className: "stock-mini-track", "aria-hidden": "true", children: _jsx("span", { className: "stock-mini-fill", style: { width: `${stockPercent}%` } }) }) }), _jsx("td", { children: _jsxs("span", { className: status === 'live' ? 'stock-live-pill' : 'stock-live-pill stock-live-pill-off', children: [_jsx("span", { className: "stock-live-dot" }), status === 'live' ? 'Live' : translateListingStatus(status)] }) })] }, `stock-${listing.id}`));
                                    }) })] })) })] }), _jsxs("section", { className: "split-panel", children: [_jsxs("div", { className: "split-copy", children: [_jsx("p", { className: "section-kicker", children: copy.seller.prioritiesKicker }), _jsx("h2", { children: copy.seller.prioritiesTitle }), _jsx("ul", { className: "feature-list", children: copy.seller.priorities.map((item) => (_jsx("li", { children: item }, item))) })] }), _jsxs("div", { className: "control-room", children: [_jsxs("div", { className: "control-room-header", children: [_jsx("p", { className: "card-label", children: copy.seller.queueLabel }), _jsx("span", { children: copy.seller.queueTitle })] }), sellerQueueCards.map((item) => (_jsxs("article", { className: item.count > 0 ? 'control-metric accent' : 'control-metric', children: [_jsxs("div", { className: "control-metric-header", children: [_jsx("strong", { children: item.count }), _jsx("span", { children: item.label })] }), _jsx("p", { className: "control-metric-note", children: item.note }), item.to.startsWith('#') ? (_jsx("a", { className: "inline-link control-metric-link", href: item.to, children: item.action })) : (_jsx(Link, { className: "inline-link control-metric-link", to: item.to, children: item.action }))] }, item.id)))] })] }), _jsxs("section", { className: "market-grid", id: "seller-listings", children: [_jsxs("div", { className: "section-heading compact", children: [_jsx("p", { className: "section-kicker", children: copy.seller.listingControlsKicker }), _jsx("h2", { children: copy.seller.listingControlsTitle })] }), listNotice ? (_jsx("p", { className: listNotice.tone === 'success' ? 'form-notice form-notice-success' : 'form-notice form-notice-error', children: listNotice.message })) : null, _jsx("div", { className: "queue-grid seller-queue-grid", children: managedListings.length === 0 ? (_jsxs("article", { className: "queue-card", children: [_jsx("p", { className: "card-label", children: copy.seller.noListingsLabel }), _jsx("h3", { children: copy.seller.noListingsTitle }), _jsx("p", { className: "seller-name", children: copy.seller.noListingsSummary })] })) : managedListings.map((listing) => {
                            const status = listingStatuses[listing.id] ?? listing.status;
                            return (_jsxs("article", { className: "queue-card", children: [_jsx("p", { className: "card-label", children: translateCatalogText(listing.category) }), _jsx("h3", { children: translateCatalogText(listing.title) }), _jsx("p", { className: "seller-name", children: listing.seller }), _jsxs("div", { className: "stock-manager", role: "group", "aria-label": copy.seller.stockManagerLabel, children: [_jsx("span", { className: "product-label", children: copy.seller.placeholders.inventory }), _jsxs("div", { className: "stock-manager-row", children: [_jsx("input", { value: stockDrafts[listing.id] ?? String(listing.inventory), onChange: (event) => setStockDrafts((current) => ({
                                                            ...current,
                                                            [listing.id]: event.target.value,
                                                        })), type: "number", min: "0", step: "1", className: "stock-quantity-input" }), _jsx("button", { type: "button", className: "button button-secondary stock-save-button", onClick: () => void handleStockSave(listing), disabled: savingStockId === listing.id, children: copy.seller.saveStock })] })] }), _jsx("div", { className: "status-pill-row", children: ['live', 'review', 'paused'].map((option) => (_jsx("button", { type: "button", className: option === status ? 'role-chip role-chip-active' : 'role-chip', onClick: () => setStatus(listing.id, option), children: translateListingStatus(option) }, option))) }), _jsxs("div", { className: "card-actions", children: [_jsx("button", { type: "button", className: "button button-secondary", onClick: () => startEditing(listing), children: copy.seller.editProduct }), _jsx("button", { type: "button", className: "button button-ghost", onClick: () => void handleDeleteListing(listing), children: copy.seller.deleteProduct })] })] }, listing.id));
                        }) })] }), _jsxs("section", { className: "market-grid", children: [_jsxs("div", { className: "section-heading compact", children: [_jsx("p", { className: "section-kicker", children: copy.seller.createKicker }), _jsx("h2", { children: editingListingId ? copy.seller.editTitle : copy.seller.createTitle })] }), !editingListingId ? _jsx("p", { className: "form-helper-text", children: copy.seller.createSummary }) : null, formNotice ? (_jsx("p", { className: formNotice.tone === 'success' ? 'form-notice form-notice-success' : 'form-notice form-notice-error', children: formNotice.message })) : null, _jsxs("form", { className: "form-grid", onSubmit: handleCreateListing, children: [_jsx("input", { value: form.title, onChange: (event) => setForm((current) => ({ ...current, title: event.target.value })), placeholder: copy.seller.placeholders.title, required: true }), _jsxs("label", { className: "form-field", children: [_jsxs("span", { className: "card-label", children: [copy.seller.placeholders.imageUrlLabel, " ", _jsx("span", { className: "form-field-optional", children: "(optional)" })] }), _jsx("div", { className: "listing-image-url-grid", children: form.imageUrls.map((imageUrl, index) => (_jsx("input", { value: imageUrl, onChange: (event) => setForm((current) => {
                                                const imageUrls = [...current.imageUrls];
                                                imageUrls[index] = event.target.value;
                                                return {
                                                    ...current,
                                                    imageUrls,
                                                    imageUrl: imageUrls.find((value) => value.trim()) ?? '',
                                                };
                                            }), placeholder: `${copy.seller.placeholders.imageUrl} ${index + 1}`, type: "url" }, `image-url-${index}`))) }), (form.imageUrls.find((value) => value.trim()) ?? '').trim() ? (_jsx("img", { src: (form.imageUrls.find((value) => value.trim()) ?? '').trim(), alt: form.title || 'preview', className: "listing-image-preview-img", onError: (e) => { e.currentTarget.style.display = 'none'; }, onLoad: (e) => { e.currentTarget.style.display = ''; } })) : null] }), _jsxs("label", { className: "form-field", children: [_jsx("span", { className: "card-label", children: copy.seller.placeholders.category }), _jsx("select", { value: form.category, onChange: (event) => setForm((current) => ({ ...current, category: event.target.value })), required: true, children: categoryOptions.map((category) => (_jsx("option", { value: category, children: translateCatalogText(category) }, category))) })] }), _jsxs("label", { className: "form-field", children: [_jsx("span", { className: "card-label", children: copy.seller.placeholders.price }), _jsx("input", { value: String(form.price), onChange: (event) => setForm((current) => ({ ...current, price: Number(event.target.value) })), placeholder: copy.seller.placeholders.price, type: "number", min: "1", step: "0.001", required: true })] }), _jsx("input", { value: String(form.inventory), onChange: (event) => setForm((current) => ({ ...current, inventory: Number(event.target.value) })), placeholder: copy.seller.placeholders.inventory, type: "number", min: "1", required: true }), _jsx("input", { value: form.trust, onChange: (event) => setForm((current) => ({ ...current, trust: event.target.value })), placeholder: copy.seller.placeholders.trust, required: true }), _jsx("input", { value: form.shipping, onChange: (event) => setForm((current) => ({ ...current, shipping: event.target.value })), placeholder: copy.seller.placeholders.shipping, required: true }), _jsx("textarea", { value: form.meta, onChange: (event) => setForm((current) => ({ ...current, meta: event.target.value })), placeholder: copy.seller.placeholders.meta, required: true }), _jsx("textarea", { value: form.description, onChange: (event) => setForm((current) => ({ ...current, description: event.target.value })), placeholder: copy.seller.placeholders.description, required: true }), _jsxs("div", { className: "card-actions", children: [_jsx("button", { type: "submit", className: "button button-primary", children: editingListingId ? copy.seller.buttons.saveChanges : copy.seller.buttons.submit }), editingListingId ? (_jsx("button", { type: "button", className: "button button-secondary", onClick: stopEditing, children: copy.seller.buttons.cancelEdit })) : null] })] })] })] }));
}
export default SellerPage;
