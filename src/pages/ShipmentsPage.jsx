import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatDateTimeGmt3 } from '../lib/dateTime';
import { getListingImages } from '../lib/listingImages';
function ShipmentsPage() {
    const { copy, formatCurrency, language, translateCatalogText, translateOrderStatus } = useLanguage();
    const { listings, orders, session } = useMarketplace();
    const location = useLocation();
    const locationState = location.state;
    const highlightedOrderIds = new Set(locationState?.confirmation?.orderIds ?? []);
    const buyerOrders = orders
        .filter((order) => order.buyerId === session?.id ||
        order.buyer === session?.name ||
        (session?.email && order.email === session.email))
        .sort((left, right) => {
        const leftHighlighted = highlightedOrderIds.has(left.id);
        const rightHighlighted = highlightedOrderIds.has(right.id);
        if (leftHighlighted === rightHighlighted) {
            return 0;
        }
        return leftHighlighted ? -1 : 1;
    });
    return (_jsxs("section", { className: "market-grid", children: [_jsxs("div", { className: "section-heading compact", children: [_jsx("p", { className: "section-kicker", children: copy.shipments.kicker }), _jsx("h2", { children: copy.shipments.title })] }), highlightedOrderIds.size > 0 ? (_jsxs("p", { className: "form-notice form-notice-success", children: ["Order confirmed. You can now track ", Array.from(highlightedOrderIds).join(', '), " here."] })) : null, _jsx("div", { className: "queue-grid admin-order-grid", children: buyerOrders.length === 0 ? (_jsx("article", { className: "queue-card", children: _jsx("p", { children: copy.shipments.noOrders }) })) : buyerOrders.map((order) => {
                    const listing = listings.find((item) => item.id === order.listingId);
                    const shipmentImages = listing ? getListingImages(listing) : [];
                    const showShipmentMedia = shipmentImages.length > 0 && (order.status === 'shipped' || order.status === 'delivered');
                    return (_jsxs("article", { className: "queue-card", children: [_jsxs("div", { className: "order-item-meta-grid", children: [_jsxs("div", { children: [_jsx("span", { className: "product-label", children: copy.common.orderId }), _jsx("strong", { children: order.id })] }), _jsxs("div", { children: [_jsx("span", { className: "product-label", children: copy.common.product }), _jsx("p", { children: listing ? translateCatalogText(listing.title) : order.listingId })] }), _jsxs("div", { children: [_jsx("span", { className: "product-label", children: copy.common.buyer }), _jsx("p", { children: order.buyer })] }), _jsxs("div", { children: [_jsx("span", { className: "product-label", children: copy.common.totalLabel }), _jsx("strong", { children: formatCurrency(order.total) })] }), _jsxs("div", { children: [_jsx("span", { className: "product-label", children: copy.common.status }), _jsx("p", { className: order.status === 'delivered' ? 'order-status order-status-complete' : 'order-status', children: translateOrderStatus(order.status) })] }), _jsxs("div", { children: [_jsx("span", { className: "product-label", children: "Ordered at" }), _jsx("p", { children: formatDateTimeGmt3(order.createdAt, language) })] })] }), showShipmentMedia ? (_jsx("div", { className: "shipment-media-block", children: _jsx("img", { className: "shipment-media-image", src: shipmentImages[0], alt: listing ? translateCatalogText(listing.title) : order.listingId }) })) : null, order.status === 'shipped' || order.status === 'delivered' ? (_jsx(Link, { className: "inline-link", to: `/browse/${order.listingId}`, children: copy.shipments.reviewCta })) : null] }, order.id));
                }) })] }));
}
export default ShipmentsPage;
