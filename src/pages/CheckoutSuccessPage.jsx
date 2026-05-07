import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, Navigate, useLocation } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
function CheckoutSuccessPage() {
    const location = useLocation();
    const locationState = location.state;
    const { copy } = useLanguage();
    const { clearLastCheckout, lastCheckout } = useMarketplace();
    const confirmation = locationState?.confirmation ?? lastCheckout;
    if (!confirmation) {
        return _jsx(Navigate, { to: "/browse", replace: true });
    }
    return (_jsxs("main", { className: "page-stack", children: [_jsx(PageHero, { variant: "product", kicker: copy.checkoutSuccess.kicker, title: copy.checkoutSuccess.title, summary: copy.checkoutSuccess.summary, aside: _jsxs(_Fragment, { children: [_jsx("p", { className: "card-label", children: copy.checkoutSuccess.confirmationLabel }), _jsxs("ul", { className: "feature-list compact", children: [_jsx("li", { children: copy.common.orderCount(confirmation.orderIds.length) }), _jsx("li", { children: confirmation.paymentMethod }), _jsx("li", { children: confirmation.emailSent ? copy.checkoutSuccess.emailSent : copy.checkoutSuccess.emailManual })] })] }) }), _jsxs("section", { className: "product-layout", children: [_jsxs("article", { className: "product-panel", children: [_jsxs("div", { className: "section-heading compact", children: [_jsx("p", { className: "section-kicker", children: copy.checkoutSuccess.summaryKicker }), _jsx("h2", { children: confirmation.buyerName })] }), _jsxs("div", { className: "product-details-grid", children: [_jsxs("div", { children: [_jsx("span", { className: "product-label", children: copy.checkoutSuccess.emailLabel }), _jsx("strong", { children: confirmation.email })] }), _jsxs("div", { children: [_jsx("span", { className: "product-label", children: copy.checkoutSuccess.addressLabel }), _jsx("strong", { children: confirmation.address })] }), _jsxs("div", { children: [_jsx("span", { className: "product-label", children: copy.checkoutSuccess.ordersLabel }), _jsx("strong", { children: confirmation.orderIds.join(', ') })] })] })] }), _jsxs("aside", { className: "purchase-panel", children: [_jsx("p", { className: "card-label", children: copy.checkoutSuccess.nextSteps }), _jsxs("div", { className: "card-actions vertical-actions", children: [_jsx(Link, { className: "button button-primary", to: "/shipments", onClick: clearLastCheckout, children: copy.checkoutSuccess.shipments }), _jsx(Link, { className: "button button-ghost", to: "/browse", onClick: clearLastCheckout, children: copy.checkoutSuccess.backToBrowse })] })] })] })] }));
}
export default CheckoutSuccessPage;
