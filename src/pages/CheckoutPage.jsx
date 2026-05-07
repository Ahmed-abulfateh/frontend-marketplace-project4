import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
const buildCheckoutForm = (session) => ({
    buyerName: session?.name ?? '',
    email: session?.email ?? '',
    phone: session?.phone ?? '',
    addressLine: session?.addressLine ?? '',
    city: session?.city ?? '',
    road: session?.road ?? '',
    block: session?.block ?? '',
    country: session?.country ?? '',
    paymentMethod: 'Card',
});
function CheckoutPage() {
    const { listingId } = useParams();
    const navigate = useNavigate();
    const { copy, formatCurrency, translateCatalogText } = useLanguage();
    const { cartIds, checkout, listings, session } = useMarketplace();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [useSavedAddress, setUseSavedAddress] = useState(true);
    const [form, setForm] = useState(() => buildCheckoutForm(session));
    const checkoutIds = listingId ? [listingId] : cartIds;
    const checkoutListings = listings.filter((listing) => checkoutIds.includes(listing.id));
    if (checkoutListings.length === 0) {
        return (_jsx("main", { className: "page-stack", children: _jsx("article", { className: "queue-card", children: _jsx("p", { children: copy.common.noResults }) }) }));
    }
    const total = checkoutListings.reduce((sum, listing) => sum + listing.price, 0);
    const handleConfirm = async (event) => {
        event.preventDefault();
        setSubmitError(null);
        setIsSubmitting(true);
        try {
            const confirmation = await checkout({
                listingIds: checkoutListings.map((listing) => listing.id),
                buyerName: form.buyerName,
                email: form.email,
                phone: form.phone,
                addressLine: form.addressLine,
                city: form.city,
                road: form.road,
                block: form.block,
                country: form.country,
                paymentMethod: form.paymentMethod,
            });
            navigate('/shipments', {
                replace: true,
                state: { confirmation },
            });
        }
        catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'Checkout failed. Please try again.');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsx("main", { className: "page-stack", children: _jsxs("form", { className: "product-layout", onSubmit: handleConfirm, children: [_jsxs("article", { className: "product-panel", children: [_jsxs("div", { className: "section-heading compact", children: [_jsx("p", { className: "section-kicker", children: copy.checkout.orderItemsKicker }), _jsx("h2", { children: copy.checkout.orderItemsTitle })] }), _jsx("div", { className: "checkout-list", children: checkoutListings.map((listing) => (_jsxs("div", { className: "checkout-row", children: [_jsxs("div", { className: "order-item-meta-grid", children: [_jsxs("div", { children: [_jsx("span", { className: "product-label", children: copy.common.product }), _jsx("strong", { children: translateCatalogText(listing.title) })] }), _jsxs("div", { children: [_jsx("span", { className: "product-label", children: copy.common.seller }), _jsx("p", { children: listing.seller })] })] }), _jsxs("div", { children: [_jsx("span", { className: "product-label", children: copy.common.totalLabel }), _jsx("strong", { children: formatCurrency(listing.price) })] })] }, listing.id))) }), _jsxs("div", { className: "form-grid compact-form-grid", children: [_jsx("input", { value: form.buyerName, onChange: (event) => setForm((current) => ({ ...current, buyerName: event.target.value })), placeholder: copy.checkout.buyerName, required: true }), _jsx("input", { value: form.email, onChange: (event) => setForm((current) => ({ ...current, email: event.target.value })), type: "email", placeholder: copy.checkout.email, required: true }), _jsx("input", { value: form.phone, onChange: (event) => setForm((current) => ({ ...current, phone: event.target.value })), placeholder: copy.checkout.phone, required: true }), _jsxs("label", { className: "form-field checkout-saved-toggle", children: [_jsx("span", { className: "card-label", children: copy.checkout.useSavedAddress }), _jsx("input", { checked: useSavedAddress, onChange: (event) => {
                                                const checked = event.target.checked;
                                                setUseSavedAddress(checked);
                                                if (checked) {
                                                    setForm((current) => ({
                                                        ...current,
                                                        ...buildCheckoutForm(session),
                                                        paymentMethod: current.paymentMethod,
                                                    }));
                                                }
                                            }, className: "checkout-saved-toggle-input", type: "checkbox" })] }), _jsx("input", { value: form.country, onChange: (event) => setForm((current) => ({ ...current, country: event.target.value })), placeholder: copy.checkout.country, required: true }), _jsx("input", { value: form.city, onChange: (event) => setForm((current) => ({ ...current, city: event.target.value })), placeholder: copy.checkout.city, required: true }), _jsx("input", { value: form.block, onChange: (event) => setForm((current) => ({ ...current, block: event.target.value })), placeholder: copy.checkout.block, required: true }), _jsx("input", { value: form.road, onChange: (event) => setForm((current) => ({ ...current, road: event.target.value })), placeholder: copy.checkout.road, required: true }), _jsx("textarea", { value: form.addressLine, onChange: (event) => setForm((current) => ({ ...current, addressLine: event.target.value })), placeholder: copy.checkout.addressLine, required: true }), _jsx("input", { value: form.paymentMethod, onChange: (event) => setForm((current) => ({ ...current, paymentMethod: event.target.value })), placeholder: copy.checkout.paymentMethod, required: true })] })] }), _jsxs("aside", { className: "purchase-panel", children: [_jsx("p", { className: "card-label", children: copy.checkout.actionsLabel }), _jsx("strong", { className: "purchase-price", children: formatCurrency(total) }), _jsx("p", { children: copy.checkout.actionsSummary }), submitError ? _jsx("p", { role: "alert", children: submitError }) : null, _jsxs("div", { className: "card-actions vertical-actions", children: [_jsx("button", { type: "submit", className: "button button-primary", disabled: isSubmitting, children: copy.checkout.confirm }), _jsx("button", { type: "button", className: "button button-ghost", onClick: () => navigate('/browse'), children: copy.checkout.continueBrowsing })] })] })] }) }));
}
export default CheckoutPage;
