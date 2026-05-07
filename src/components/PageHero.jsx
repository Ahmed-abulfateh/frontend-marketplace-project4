import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function PageHero({ variant, kicker, title, summary, aside, darkAside }) {
    return (_jsxs("section", { className: `page-hero page-hero-${variant}`, children: [_jsxs("div", { children: [_jsx("p", { className: "section-kicker", children: kicker }), _jsx("h1", { children: title }), _jsx("p", { className: "lead page-lead", children: summary })] }), _jsx("div", { className: darkAside ? 'page-summary-card dark' : 'page-summary-card', children: aside })] }));
}
export default PageHero;
