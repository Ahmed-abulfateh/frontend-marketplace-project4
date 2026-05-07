import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatDateTimeGmt3 } from '../lib/dateTime';
function SellerOrderDetailPage() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { copy, formatCurrency, language, translateCatalogText, translateOrderStatus } = useLanguage();
    const { advanceOrderStatus, isReady, listings, orders, sendOrderMessage, session } = useMarketplace();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [optimisticDelivered, setOptimisticDelivered] = useState(false);
    const [statusError, setStatusError] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [chatError, setChatError] = useState(null);
    if (!isReady) {
        return _jsx("main", { className: "loading-shell", children: copy.common.loading });
    }
    const order = orders.find((item) => item.id === orderId);
    if (!order) {
        return _jsx(Navigate, { to: "/seller/orders", replace: true });
    }
    const listing = listings.find((item) => item.id === order.listingId);
    const isManagedBySeller = session?.role !== 'seller' || listing?.seller === session?.name;
    const isDelivered = optimisticDelivered || order.status === 'delivered';
    if (!isManagedBySeller) {
        return _jsx(Navigate, { to: "/seller/orders", replace: true });
    }
    const handleAdvanceOrder = async () => {
        if (isSubmitting) {
            return;
        }
        const wasPending = order.status === 'pending';
        setStatusError(null);
        setOptimisticDelivered(true);
        setIsSubmitting(true);
        try {
            await advanceOrderStatus(order.id, 'complete');
            if (wasPending) {
                navigate('/seller/orders?view=to-ship', {
                    replace: true,
                    state: { notice: copy.sellerOrders.confirmedNotice },
                });
            }
        }
        catch (error) {
            setOptimisticDelivered(false);
            setStatusError(error instanceof Error ? error.message : 'Could not update order status.');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const handleSendMessage = async (event) => {
        event.preventDefault();
        const text = messageText.trim();
        if (!text) {
            return;
        }
        setChatError(null);
        try {
            await sendOrderMessage(order.id, text);
            setMessageText('');
        }
        catch (error) {
            setChatError(error instanceof Error ? error.message : 'Could not send message.');
        }
    };
    return (_jsxs("section", { className: "product-layout", children: [_jsxs("article", { className: "product-panel", children: [_jsxs("div", { className: "section-heading compact", children: [_jsx("p", { className: "section-kicker", children: copy.sellerOrderDetail.kicker }), _jsx("h2", { children: order.id })] }), _jsxs("div", { className: "product-details-grid", children: [_jsxs("div", { children: [_jsx("span", { className: "product-label", children: copy.sellerOrderDetail.listing }), _jsx("strong", { children: listing ? translateCatalogText(listing.title) : order.listingId })] }), _jsxs("div", { children: [_jsx("span", { className: "product-label", children: copy.sellerOrderDetail.buyer }), _jsx("strong", { children: order.buyer })] }), _jsxs("div", { children: [_jsx("span", { className: "product-label", children: copy.sellerOrderDetail.status }), _jsx("strong", { className: isDelivered ? 'order-status order-status-complete' : 'order-status', children: translateOrderStatus(isDelivered ? 'delivered' : order.status) })] }), _jsxs("div", { children: [_jsx("span", { className: "product-label", children: "Ordered at" }), _jsx("strong", { children: formatDateTimeGmt3(order.createdAt, language) })] })] }), _jsxs("div", { className: "section-heading compact product-section-spacing", children: [_jsx("p", { className: "section-kicker", children: "Live chat" }), _jsx("h2", { children: "Buyer and seller thread" })] }), _jsx("div", { className: "review-grid", children: (order.messages ?? []).length === 0 ? (_jsx("article", { className: "review-card", children: _jsx("p", { children: "No messages yet for this order." }) })) : (order.messages ?? []).map((message) => (_jsxs("article", { className: "review-card", children: [_jsxs("div", { className: "listing-footer review-header-row", children: [_jsxs("div", { children: [_jsx("strong", { children: message.senderName }), _jsx("p", { className: "microcopy", children: new Date(message.createdAt).toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US') })] }), _jsx("span", { className: "badge", children: message.senderRole })] }), _jsx("p", { children: message.text })] }, `${message.senderId}-${message.createdAt}-${message.text}`))) })] }), _jsxs("aside", { className: "purchase-panel", children: [_jsx("p", { className: "card-label", children: copy.sellerOrderDetail.actionsLabel }), _jsx("strong", { className: "purchase-price", children: formatCurrency(order.total) }), _jsx("p", { children: copy.sellerOrderDetail.summary }), _jsxs("div", { className: "card-actions vertical-actions", children: [_jsx("button", { type: "button", className: "button button-primary", onClick: () => void handleAdvanceOrder(), disabled: isDelivered || isSubmitting, children: isDelivered ? copy.sellerOrderDetail.delivered : 'Mark Delivered / Complete' }), _jsx(Link, { className: "inline-link", to: "/seller/orders", children: copy.sellerOrderDetail.back })] }), statusError ? _jsx("p", { className: "form-notice form-notice-error", children: statusError }) : null, _jsxs("form", { className: "form-grid compact-form-grid", onSubmit: handleSendMessage, children: [_jsx("textarea", { value: messageText, onChange: (event) => setMessageText(event.target.value), placeholder: "Write a message to the buyer", required: true }), chatError ? _jsx("p", { className: "form-notice form-notice-error", children: chatError }) : null, _jsx("button", { type: "submit", className: "button button-secondary", children: "Send message" })] })] })] }));
}
export default SellerOrderDetailPage;
