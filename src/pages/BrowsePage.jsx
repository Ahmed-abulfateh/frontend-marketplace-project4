import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDeferredValue, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
// Each chip maps to a filter predicate keyed by chip index.
// 0 = All categories (no filter)
// 1 = Verified sellers  (trust field contains "verified")
// 2 = Tracked shipping   (shipping field contains "tracked" / "متتبع")
// 3 = Flexible returns   (shipping or trust contains "return" / "إرجاع")
const CHIP_FILTERS = [
    null,
    (trust) => trust.toLowerCase().includes('verified') || trust.includes('موثق'),
    (shipping) => shipping.toLowerCase().includes('tracked') || shipping.includes('متتبع'),
    (shipping, trust) => shipping.toLowerCase().includes('return') ||
        shipping.includes('إرجاع') ||
        trust.toLowerCase().includes('return') ||
        trust.includes('إرجاع'),
];
function BrowsePage() {
    const { copy, translateCatalogText } = useLanguage();
    const { listings } = useMarketplace();
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(() => searchParams.get('q') ?? '');
    const [activeChip, setActiveChip] = useState(0);
    const deferredQuery = useDeferredValue(query);
    const handleQueryChange = (value) => {
        setQuery(value);
        if (value.trim()) {
            setSearchParams({ q: value }, { replace: true });
        }
        else {
            setSearchParams({}, { replace: true });
        }
    };
    const handleChipClick = (index) => {
        setActiveChip(index);
    };
    const visibleListings = listings.filter((listing) => {
        // Text search filter
        const search = deferredQuery.trim().toLowerCase();
        if (search) {
            const matchesSearch = [
                translateCatalogText(listing.title),
                listing.seller,
                translateCatalogText(listing.category),
                translateCatalogText(listing.trust),
            ].some((value) => value.toLowerCase().includes(search));
            if (!matchesSearch)
                return false;
        }
        // Chip filter
        const chipFilter = CHIP_FILTERS[activeChip];
        if (!chipFilter)
            return true;
        if (activeChip === 3) {
            return chipFilter(listing.shipping, listing.trust);
        }
        const field = activeChip === 1 ? listing.trust : listing.shipping;
        return chipFilter(field);
    });
    return (_jsxs("main", { className: "page-stack", children: [_jsx("section", { className: "search-panel", children: _jsxs("label", { className: "search-field", htmlFor: "listing-search", children: [_jsx("span", { className: "section-kicker", children: copy.browse.searchKicker }), _jsx("input", { id: "listing-search", type: "search", value: query, onChange: (event) => handleQueryChange(event.target.value), placeholder: copy.browse.searchPlaceholder })] }) }), _jsx("section", { className: "filter-strip", children: copy.browse.chips.map((chip, index) => (_jsx("button", { type: "button", className: index === activeChip ? 'filter-chip filter-chip-active' : 'filter-chip', onClick: () => handleChipClick(index), children: chip }, chip))) }), _jsx("section", { className: "market-grid", children: _jsx("div", { className: "listing-grid", children: visibleListings.length > 0 ? visibleListings.map((listing) => (_jsx(ListingCard, { listing: listing }, listing.id))) : _jsx("article", { className: "queue-card", children: _jsx("p", { children: copy.common.noResults }) }) }) })] }));
}
export default BrowsePage;
