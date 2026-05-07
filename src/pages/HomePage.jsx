import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import ListingCard from '../components/ListingCard';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
function HomePage() {
    const { copy } = useLanguage();
    const { listings } = useMarketplace();
    return (_jsx(_Fragment, { children: _jsx("main", { children: _jsx("section", { className: "market-grid", children: _jsx("div", { className: "listing-grid", children: listings.length > 0 ? listings.slice(0, 3).map((listing) => (_jsx(ListingCard, { listing: listing }, listing.id))) : _jsx("article", { className: "queue-card", children: _jsx("p", { children: copy.common.noResults }) }) }) }) }) }));
}
export default HomePage;
