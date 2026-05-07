import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import PageHero from '../components/PageHero';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { getListingImages } from '../lib/listingImages';
const productDetailLabels = {
    en: {
        gallery: 'Product gallery',
        priceInfo: 'Price information',
        originalPrice: 'Original price',
        promotions: 'Live promotions',
        description: 'Product description',
        specifications: 'Specifications',
        variations: 'Product variations',
        reviews: 'Customer reviews and ratings',
        sellerInfo: 'Seller information',
        yearsOnPlatform: 'Years on platform',
        followers: 'Followers',
        responseRate: 'Response rate',
        positiveFeedback: 'Positive feedback',
        shippingPolicy: 'Shipping policy',
        shoppingTips: 'Smart shopping tips',
        reviewSummary: (count, score) => `${count} buyer reviews • ${score.toFixed(1)} average rating`,
        storeName: 'Official storefront',
    },
    ar: {
        gallery: 'معرض المنتج',
        priceInfo: 'معلومات السعر',
        originalPrice: 'السعر الأصلي',
        promotions: 'العروض الحالية',
        description: 'وصف المنتج',
        specifications: 'المواصفات',
        variations: 'خيارات المنتج',
        reviews: 'تقييمات وآراء العملاء',
        sellerInfo: 'معلومات البائع',
        yearsOnPlatform: 'سنوات على المنصة',
        followers: 'المتابعون',
        responseRate: 'معدل الاستجابة',
        positiveFeedback: 'التقييم الإيجابي',
        shippingPolicy: 'سياسة الشحن',
        shoppingTips: 'نصائح تسوق ذكية',
        reviewSummary: (count, score) => `${count} مراجعة • متوسط التقييم ${score.toFixed(1)}`,
        storeName: 'المتجر الرسمي',
    },
};
const categoryTemplates = {
    Home: {
        gallery: [
            {
                label: { en: 'Hero angle', ar: 'الزاوية الرئيسية' },
                note: { en: 'Styled in a bright tabletop setting.', ar: 'معروض ضمن إعداد طاولة مضيء.' },
                tone: 'blue',
            },
            {
                label: { en: 'Craft detail', ar: 'تفاصيل الصنع' },
                note: { en: 'Close-up of the hand-finished texture.', ar: 'لقطة قريبة لملمس التشطيب اليدوي.' },
                tone: 'amber',
            },
            {
                label: { en: 'Packaging view', ar: 'عرض التغليف' },
                note: { en: 'Protective wrapping for fragile delivery.', ar: 'تغليف واقٍ مناسب للشحن الحساس.' },
                tone: 'teal',
            },
        ],
        promotions: [
            { en: 'Store coupon unlocked on 2+ items.', ar: 'قسيمة المتجر متاحة عند شراء عنصرين أو أكثر.' },
            { en: 'Bundle discount applies at checkout.', ar: 'خصم التجميع يُطبَّق عند الدفع.' },
        ],
        descriptionBullets: [
            { en: 'Built to bring tactile, handmade character into everyday hosting.', ar: 'مصمم ليضيف طابعًا يدويًا ملموسًا إلى الاستخدام اليومي.' },
            { en: 'Balanced for gifting, display, and repeat use in the home.', ar: 'متوازن كخيار للهدايا والعرض والاستخدام المتكرر في المنزل.' },
            { en: 'Well suited for buyers comparing finish quality and shipping care.', ar: 'مناسب للمشترين الذين يقارنون جودة التشطيب والعناية بالشحن.' },
        ],
        specifications: [
            { label: { en: 'Category', ar: 'الفئة' }, value: { en: 'Home', ar: 'المنزل' } },
            { label: { en: 'Material', ar: 'الخامة' }, value: { en: 'Stoneware ceramic', ar: 'سيراميك حجري' } },
            { label: { en: 'Dimensions', ar: 'الأبعاد' }, value: { en: 'Serving scale for 2 to 4 guests', ar: 'مقاس تقديم مناسب من 2 إلى 4 أشخاص' } },
            { label: { en: 'Color options', ar: 'خيارات اللون' }, value: { en: 'Sand, chalk, charcoal', ar: 'رملي، طباشيري، فحمي' } },
            { label: { en: 'Usage', ar: 'الاستخدام' }, value: { en: 'Food-safe and dishwasher-safe', ar: 'آمن للطعام وآمن لغسالة الصحون' } },
        ],
        variations: [
            { name: { en: 'Color', ar: 'اللون' }, options: [{ en: 'Sand', ar: 'رملي' }, { en: 'Chalk', ar: 'طباشيري' }, { en: 'Charcoal', ar: 'فحمي' }] },
            { name: { en: 'Set size', ar: 'حجم المجموعة' }, options: [{ en: 'Single piece', ar: 'قطعة واحدة' }, { en: 'Serving duo', ar: 'طقم تقديم مزدوج' }, { en: 'Gift set', ar: 'طقم هدية' }] },
        ],
        reviews: [
            {
                author: 'Lina R.',
                rating: 5,
                title: { en: 'Exactly like the photos', ar: 'مطابق تمامًا للصور' },
                comment: { en: 'The finish feels premium and the packaging arrived without damage.', ar: 'التشطيب يبدو فاخرًا ووصل التغليف من دون أي ضرر.' },
                date: '2026-04-11',
            },
            {
                author: 'Nora A.',
                rating: 4,
                title: { en: 'Beautiful for hosting', ar: 'جميل جدًا للاستضافة' },
                comment: { en: 'I checked the dimensions carefully and they matched what I needed.', ar: 'راجعت الأبعاد بعناية وكانت مطابقة لما أحتاجه.' },
                date: '2026-03-28',
            },
        ],
        shippingPolicy: [
            { en: 'Estimated delivery window is shown before final payment.', ar: 'يظهر نطاق موعد التسليم قبل إتمام الدفع.' },
            { en: 'Fragile items ship with reinforced protection.', ar: 'يتم شحن القطع الحساسة بحماية معززة.' },
            { en: 'Free shipping can unlock based on cart value and destination.', ar: 'قد يتوفر شحن مجاني حسب قيمة السلة ووجهة التوصيل.' },
        ],
        shoppingTips: [
            { en: 'Zoom through every gallery frame before ordering.', ar: 'تفحّص كل إطار في المعرض قبل الطلب.' },
            { en: 'Compare current pricing with similar products in the same category.', ar: 'قارن السعر الحالي بمنتجات مشابهة في الفئة نفسها.' },
            { en: 'Save favorites if you want to compare colors or set sizes later.', ar: 'احفظ المنتج في المفضلة إذا أردت مقارنة الألوان أو الأحجام لاحقًا.' },
        ],
    },
    Vintage: {
        gallery: [
            { label: { en: 'Restored profile', ar: 'الواجهة بعد الترميم' }, note: { en: 'Main silhouette with rewired hardware.', ar: 'الشكل الرئيسي مع مكونات كهربائية مجددة.' }, tone: 'amber' },
            { label: { en: 'Switch and stem', ar: 'المفتاح والهيكل' }, note: { en: 'Closer look at material wear and finish.', ar: 'نظرة أقرب إلى تآكل الخامة والتشطيب.' }, tone: 'teal' },
            { label: { en: 'Desk placement', ar: 'الوضع على المكتب' }, note: { en: 'Context shot for workspace scale.', ar: 'صورة سياقية توضح الحجم ضمن مساحة العمل.' }, tone: 'blue' },
        ],
        promotions: [
            { en: 'Limited restored stock available this week.', ar: 'المخزون المجدد المتاح محدود هذا الأسبوع.' },
            { en: 'Seller occasionally adds insured shipping upgrades.', ar: 'يضيف البائع أحيانًا ترقيات للشحن المؤمن.' },
        ],
        descriptionBullets: [
            { en: 'Designed for buyers who care about character, age, and verified restoration work.', ar: 'مناسب للمشترين الذين يهتمون بالشخصية التاريخية والعمر وجودة الترميم الموثق.' },
            { en: 'Highlights condition notes and safe rewiring for daily use.', ar: 'يركز على ملاحظات الحالة وإعادة التوصيل الآمنة للاستخدام اليومي.' },
            { en: 'Useful when comparing authenticity against cheaper replicas.', ar: 'مفيد عند مقارنة الأصالة مع النسخ الأرخص.' },
        ],
        specifications: [
            { label: { en: 'Category', ar: 'الفئة' }, value: { en: 'Vintage', ar: 'منتجات عتيقة' } },
            { label: { en: 'Material', ar: 'الخامة' }, value: { en: 'Metal body with restored finish', ar: 'هيكل معدني بتشطيب مجدد' } },
            { label: { en: 'Dimensions', ar: 'الأبعاد' }, value: { en: 'Compact desk scale with angled arm', ar: 'حجم مكتبي مدمج بذراع مائل' } },
            { label: { en: 'Color options', ar: 'خيارات اللون' }, value: { en: 'Brass, matte black', ar: 'نحاسي، أسود مطفي' } },
            { label: { en: 'Usage', ar: 'الاستخدام' }, value: { en: 'Indoor desk lighting', ar: 'إضاءة مكتبية داخلية' } },
        ],
        variations: [
            { name: { en: 'Finish', ar: 'التشطيب' }, options: [{ en: 'Brass', ar: 'نحاسي' }, { en: 'Matte black', ar: 'أسود مطفي' }] },
            { name: { en: 'Plug type', ar: 'نوع المقبس' }, options: [{ en: 'US plug', ar: 'قابس أمريكي' }, { en: 'EU plug', ar: 'قابس أوروبي' }] },
        ],
        reviews: [
            { author: 'Sara M.', rating: 5, title: { en: 'Looks authentic and works well', ar: 'يبدو أصليًا ويعمل جيدًا' }, comment: { en: 'The condition matched the description and the seller packed it carefully.', ar: 'كانت الحالة مطابقة للوصف وقام البائع بالتغليف بعناية.' }, date: '2026-04-02' },
            { author: 'Yousef K.', rating: 4, title: { en: 'Great restoration work', ar: 'ترميم ممتاز' }, comment: { en: 'I compared several listings and this one gave the clearest condition details.', ar: 'قارنت عدة منتجات وكان هذا المنتج أوضحها من ناحية تفاصيل الحالة.' }, date: '2026-03-14' },
        ],
        shippingPolicy: [
            { en: 'Insured delivery options appear before payment confirmation.', ar: 'تظهر خيارات التوصيل المؤمن قبل تأكيد الدفع.' },
            { en: 'Transit time can vary with fragile-item handling.', ar: 'قد يختلف وقت النقل بسبب التعامل مع القطع الحساسة.' },
            { en: 'Check destination-specific fees before finalizing the order.', ar: 'تحقق من الرسوم الخاصة بوجهة التوصيل قبل إنهاء الطلب.' },
        ],
        shoppingTips: [
            { en: 'Review every close-up image for condition and patina.', ar: 'راجع كل الصور القريبة للحالة واللمعان الطبيعي.' },
            { en: 'Read buyer comments about authenticity and packaging.', ar: 'اقرأ تعليقات المشترين حول الأصالة والتغليف.' },
            { en: 'Compare insured shipping costs across similar restored items.', ar: 'قارن تكاليف الشحن المؤمن بين المنتجات المجددة المشابهة.' },
        ],
    },
};
const pickText = (value, language) => value[language];
const buildFallbackDetails = (listing) => ({
    gallery: [
        { label: { en: 'Main view', ar: 'العرض الرئيسي' }, note: { en: 'Primary visual for the product detail page.', ar: 'العرض الأساسي لصفحة تفاصيل المنتج.' }, tone: 'blue' },
        { label: { en: 'Close-up', ar: 'لقطة قريبة' }, note: { en: 'Focuses on finish, material, and build quality.', ar: 'يركز على التشطيب والخامة وجودة التصنيع.' }, tone: 'amber' },
        { label: { en: 'Usage scene', ar: 'مشهد الاستخدام' }, note: { en: 'Shows scale and fit in a realistic setting.', ar: 'يوضح الحجم والملاءمة في استخدام واقعي.' }, tone: 'teal' },
    ],
    originalPrice: Math.ceil(listing.price * 1.18),
    discountLabel: { en: 'Limited-time markdown', ar: 'خصم لفترة محدودة' },
    promotions: [
        { en: 'Seller coupon may apply at checkout.', ar: 'قد يتم تطبيق قسيمة البائع عند الدفع.' },
        { en: 'Free shipping eligibility depends on destination and cart value.', ar: 'أهلية الشحن المجاني تعتمد على الوجهة وقيمة السلة.' },
    ],
    descriptionBullets: [
        { en: listing.meta, ar: listing.meta },
        { en: `Built for buyers shopping within ${listing.category.toLowerCase()} with visible trust cues.`, ar: `مصمم للمشترين الباحثين ضمن فئة ${listing.category} مع مؤشرات ثقة واضحة.` },
        { en: `Current inventory supports ${listing.inventory} ready-to-ship units.`, ar: `المخزون الحالي يدعم ${listing.inventory} وحدات جاهزة للشحن.` },
    ],
    specifications: [
        { label: { en: 'Category', ar: 'الفئة' }, value: { en: listing.category, ar: listing.category } },
        { label: { en: 'Trust signal', ar: 'مؤشر الثقة' }, value: { en: listing.trust, ar: listing.trust } },
        { label: { en: 'Shipping', ar: 'الشحن' }, value: { en: listing.shipping, ar: listing.shipping } },
        { label: { en: 'Available stock', ar: 'المخزون المتاح' }, value: { en: `${listing.inventory} units`, ar: `${listing.inventory} وحدة` } },
    ],
    variations: [
        { name: { en: 'Style', ar: 'النمط' }, options: [{ en: 'Standard', ar: 'قياسي' }, { en: 'Premium', ar: 'فاخر' }] },
        { name: { en: 'Package', ar: 'الباقة' }, options: [{ en: 'Single item', ar: 'عنصر واحد' }, { en: 'Multi-buy', ar: 'شراء متعدد' }] },
    ],
    reviews: [
        { author: 'Mariam H.', rating: Math.round(listing.reviewScore), title: { en: 'Helpful listing details', ar: 'تفاصيل مفيدة في المنتج' }, comment: { en: 'The page gave enough information to compare it with similar options before ordering.', ar: 'قدمت الصفحة معلومات كافية لمقارنته مع الخيارات المشابهة قبل الطلب.' }, date: '2026-04-18' },
        { author: 'Omar T.', rating: Math.max(4, Math.round(listing.reviewScore - 0.2)), title: { en: 'Worth checking the shipping notes', ar: 'من المفيد مراجعة ملاحظات الشحن' }, comment: { en: 'I liked that the trust and shipping details were visible before checkout.', ar: 'أعجبني أن تفاصيل الثقة والشحن كانت واضحة قبل الدفع.' }, date: '2026-03-30' },
    ],
    shippingPolicy: [
        { en: 'Review shipping timelines before confirming the order.', ar: 'راجع مواعيد الشحن قبل تأكيد الطلب.' },
        { en: 'Additional delivery costs can vary by region.', ar: 'قد تختلف تكاليف التوصيل الإضافية حسب المنطقة.' },
        { en: 'Tracking visibility is shown when available.', ar: 'يتم عرض إمكانية التتبع عند توفرها.' },
    ],
    shoppingTips: [
        { en: 'Inspect all gallery frames, especially if finish or size matters.', ar: 'افحص كل عناصر المعرض خاصة إذا كان التشطيب أو الحجم مهمًا.' },
        { en: 'Read buyer reviews before deciding between similar products.', ar: 'اقرأ مراجعات المشترين قبل الاختيار بين المنتجات المشابهة.' },
        { en: 'Save the listing to favorites if you want to compare prices later.', ar: 'احفظ المنتج في المفضلة إذا أردت مقارنة الأسعار لاحقًا.' },
    ],
});
const buildProductDetails = (listing) => {
    const template = categoryTemplates[listing.category];
    const detailContent = template
        ? {
            ...template,
            originalPrice: Math.ceil(listing.price * 1.18),
            discountLabel: { en: 'Ali-style deal', ar: 'عرض مميز' },
        }
        : buildFallbackDetails(listing);
    return {
        ...detailContent,
        originalPrice: Math.max(detailContent.originalPrice, listing.price + 8),
    };
};
const buildSellerInsights = (listing) => ({
    storeName: `${listing.seller} Store`,
    yearsOnPlatform: Math.max(2, Math.round(listing.reviewScore + 1)),
    followers: `${(listing.inventory * 130).toLocaleString()}+`,
    responseRate: `${Math.min(99, Math.round(listing.reviewScore * 20))}%`,
    positiveFeedback: `${Math.min(99, Math.round(listing.reviewScore * 20 + 1))}%`,
});
const renderStars = (rating) => '★'.repeat(rating) + '☆'.repeat(5 - rating);
function ProductPage() {
    const { listingId } = useParams();
    const navigate = useNavigate();
    const { copy, formatCurrency, language, translateCatalogText, translateListingStatus } = useLanguage();
    const { addListingReview, cartIds, favoriteIds, isReady, listingStatuses, listings, orders, sendOrderMessage, session, toggleCart, toggleFavorite, } = useMarketplace();
    if (!isReady) {
        return _jsx("main", { className: "loading-shell", children: copy.common.loading });
    }
    const listing = listings.find((item) => item.id === listingId);
    if (!listing) {
        return (_jsx("main", { className: "page-stack", children: _jsxs("section", { className: "market-grid", children: [_jsxs("div", { className: "section-heading compact", children: [_jsx("p", { className: "section-kicker", children: "Product details" }), _jsx("h2", { children: "Product unavailable" })] }), _jsxs("article", { className: "queue-card", children: [_jsx("p", { children: "This product can no longer be opened for review. It may have been removed or is no longer available." }), _jsxs("div", { className: "card-actions", children: [_jsx(Link, { className: "button button-secondary", to: "/shipments", children: "Back to shipments" }), _jsx(Link, { className: "button button-primary", to: "/browse", children: "Browse products" })] })] })] }) }));
    }
    const relatedListings = listings.filter((item) => item.category === listing.category && item.id !== listing.id);
    const currentStatus = listingStatuses[listing.id] ?? listing.status;
    const isInCart = cartIds.includes(listing.id);
    const isFavorite = favoriteIds.includes(listing.id);
    const labels = productDetailLabels[language];
    const details = buildProductDetails(listing);
    const sellerInsights = buildSellerInsights(listing);
    const listingImages = getListingImages(listing);
    const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);
    const [selectedVariations, setSelectedVariations] = useState({});
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState('');
    const [reviewError, setReviewError] = useState(null);
    const [chatText, setChatText] = useState('');
    const [chatError, setChatError] = useState(null);
    useEffect(() => {
        setSelectedGalleryIndex(0);
        setSelectedVariations(Object.fromEntries(details.variations.map((variation) => [
            pickText(variation.name, language),
            pickText(variation.options[0], language),
        ])));
    }, [language, listing.id]);
    const activeGallery = details.gallery[selectedGalleryIndex] ?? details.gallery[0];
    const activeProductImage = listingImages[selectedGalleryIndex] ?? listingImages[0] ?? '';
    const listingOrders = orders.filter((order) => order.listingId === listing.id);
    const buyerOrders = listingOrders.filter((order) => order.buyerId === session?.id || order.buyer === session?.name);
    const deliveredOrders = buyerOrders.filter((order) => order.status === 'delivered');
    const reviewOrder = deliveredOrders.find((order) => !(listing.reviews ?? []).some((review) => review.orderId === order.id));
    const canReview = session?.role === 'buyer' && Boolean(reviewOrder);
    const chatOrder = buyerOrders[0];
    const canChat = session?.role === 'buyer' && Boolean(chatOrder);
    const persistedReviews = (listing.reviews ?? []).map((review) => ({
        author: review.author,
        rating: review.rating,
        comment: review.comment,
        date: review.createdAt,
    }));
    const visibleReviews = persistedReviews.length > 0 ? persistedReviews : details.reviews.map((review) => ({
        author: review.author,
        rating: review.rating,
        comment: pickText(review.comment, language),
        date: review.date,
    }));
    const handleSubmitReview = async (event) => {
        event.preventDefault();
        if (!reviewOrder) {
            return;
        }
        setReviewError(null);
        try {
            await addListingReview(listing.id, {
                rating: reviewRating,
                comment: reviewComment.trim(),
            });
            setReviewComment('');
            setReviewRating(5);
        }
        catch (error) {
            setReviewError(error instanceof Error ? error.message : 'Could not submit review.');
        }
    };
    const handleSendMessage = async (event) => {
        event.preventDefault();
        if (!chatOrder || !chatText.trim()) {
            return;
        }
        setChatError(null);
        try {
            await sendOrderMessage(chatOrder.id, chatText.trim());
            setChatText('');
        }
        catch (error) {
            setChatError(error instanceof Error ? error.message : 'Could not send message.');
        }
    };
    return (_jsxs("main", { className: "page-stack", children: [_jsx(PageHero, { variant: "product", kicker: copy.product.kicker, title: translateCatalogText(listing.title), summary: translateCatalogText(listing.description), aside: _jsxs(_Fragment, { children: [_jsx("p", { className: "card-label", children: copy.product.snapshotLabel }), _jsxs("ul", { className: "feature-list compact", children: [_jsx("li", { children: translateCatalogText(listing.category) }), _jsx("li", { children: translateCatalogText(listing.shipping) }), _jsx("li", { children: copy.common.sellerScore(listing.reviewScore.toFixed(1)) })] })] }) }), _jsxs("section", { className: "product-layout", children: [_jsxs("article", { className: "product-panel", children: [_jsxs("div", { className: "section-heading compact", children: [_jsx("p", { className: "section-kicker", children: labels.gallery }), _jsx("h2", { children: translateCatalogText(listing.trust) })] }), _jsxs("div", { className: `gallery-stage gallery-stage-${activeGallery.tone}`, children: [activeProductImage ? (_jsx("img", { className: "product-gallery-image", src: activeProductImage, alt: translateCatalogText(listing.title) })) : null, _jsx("p", { className: "card-label", children: pickText(activeGallery.label, language) }), _jsx("h3", { children: translateCatalogText(listing.title) }), _jsx("p", { children: pickText(activeGallery.note, language) })] }), _jsx("div", { className: "gallery-thumb-grid", children: (listingImages.length > 0 ? listingImages : details.gallery.map(() => '')).map((imageUrl, index) => {
                                    const item = details.gallery[index] ?? details.gallery[index % details.gallery.length];
                                    return (_jsxs("button", { type: "button", className: index === selectedGalleryIndex ? 'gallery-thumb gallery-thumb-active' : 'gallery-thumb', onClick: () => setSelectedGalleryIndex(index), children: [imageUrl ? _jsx("img", { className: "gallery-thumb-image", src: imageUrl, alt: translateCatalogText(listing.title) }) : null, _jsx("strong", { children: pickText(item.label, language) }), _jsx("span", { children: pickText(item.note, language) })] }, `${pickText(item.label, language)}-${imageUrl || index}`));
                                }) }), _jsxs("div", { className: "product-details-grid product-topline-grid", children: [_jsxs("div", { children: [_jsx("span", { className: "product-label", children: copy.product.shippingLabel }), _jsx("strong", { children: translateCatalogText(listing.shipping) })] }), _jsxs("div", { children: [_jsx("span", { className: "product-label", children: copy.product.inventoryLabel }), _jsx("strong", { children: copy.common.units(listing.inventory) })] }), _jsxs("div", { children: [_jsx("span", { className: "product-label", children: copy.product.statusLabel }), _jsx("strong", { children: translateListingStatus(currentStatus) })] })] })] }), _jsxs("aside", { className: "purchase-panel", children: [_jsx("p", { className: "card-label", children: labels.priceInfo }), _jsxs("div", { className: "product-price-stack", children: [_jsx("strong", { className: "purchase-price", children: formatCurrency(listing.price) }), _jsxs("p", { className: "price-strike", children: [labels.originalPrice, ": ", formatCurrency(details.originalPrice)] }), _jsx("span", { className: "badge product-discount-badge", children: pickText(details.discountLabel, language) })] }), _jsx("p", { children: copy.product.purchaseSummary }), _jsx("div", { className: "section-heading compact product-mini-heading", children: _jsx("p", { className: "section-kicker", children: labels.promotions }) }), _jsx("ul", { className: "promo-list", children: details.promotions.map((item) => (_jsx("li", { children: pickText(item, language) }, pickText(item, language)))) }), _jsxs("div", { className: "card-actions vertical-actions", children: [_jsx("button", { type: "button", className: "button button-secondary", onClick: () => void toggleCart(listing.id), children: isInCart ? copy.product.removeFromCart : copy.product.addToCart }), _jsx("button", { type: "button", className: "button button-primary", onClick: () => navigate(session ? `/checkout/${listing.id}` : '/sign-in'), children: copy.product.goToCheckout }), _jsx("button", { type: "button", className: "button button-ghost", onClick: () => void toggleFavorite(listing.id), children: isFavorite ? copy.product.savedToFavorites : copy.product.saveForLater })] }), _jsx(Link, { className: "inline-link", to: "/browse", children: copy.product.backToBrowse })] })] }), _jsxs("section", { className: "product-layout", children: [_jsxs("article", { className: "product-panel product-rich-panel", children: [_jsxs("div", { className: "section-heading compact", children: [_jsx("p", { className: "section-kicker", children: labels.description }), _jsx("h2", { children: translateCatalogText(listing.title) })] }), _jsx("p", { children: translateCatalogText(listing.description) }), _jsx("ul", { className: "feature-list product-description-list", children: details.descriptionBullets.map((item) => (_jsx("li", { children: pickText(item, language) }, pickText(item, language)))) }), _jsxs("div", { className: "section-heading compact product-section-spacing", children: [_jsx("p", { className: "section-kicker", children: labels.specifications }), _jsx("h2", { children: translateCatalogText(listing.meta) })] }), _jsx("div", { className: "product-spec-grid", children: details.specifications.map((spec) => (_jsxs("article", { className: "spec-card", children: [_jsx("span", { className: "product-label", children: pickText(spec.label, language) }), _jsx("strong", { children: pickText(spec.value, language) })] }, pickText(spec.label, language)))) }), _jsxs("div", { className: "section-heading compact product-section-spacing", children: [_jsx("p", { className: "section-kicker", children: labels.variations }), _jsx("h2", { children: copy.product.purchaseFlowLabel })] }), _jsx("div", { className: "variation-grid", children: details.variations.map((variation) => {
                                    const variationName = pickText(variation.name, language);
                                    return (_jsxs("div", { className: "variation-group", children: [_jsx("span", { className: "product-label", children: variationName }), _jsx("div", { className: "variation-options", children: variation.options.map((option) => {
                                                    const optionLabel = pickText(option, language);
                                                    return (_jsx("button", { type: "button", className: selectedVariations[variationName] === optionLabel ? 'variation-chip variation-chip-active' : 'variation-chip', onClick: () => setSelectedVariations((current) => ({
                                                            ...current,
                                                            [variationName]: optionLabel,
                                                        })), children: optionLabel }, optionLabel));
                                                }) })] }, variationName));
                                }) })] }), _jsxs("aside", { className: "purchase-panel product-support-panel", children: [_jsxs("div", { className: "section-heading compact", children: [_jsx("p", { className: "section-kicker", children: labels.sellerInfo }), _jsx("h2", { children: sellerInsights.storeName })] }), _jsxs("div", { className: "seller-info-grid", children: [_jsxs("article", { className: "spec-card", children: [_jsx("span", { className: "product-label", children: copy.product.snapshotLabel }), _jsx("strong", { children: copy.common.sellerScore(listing.reviewScore.toFixed(1)) })] }), _jsxs("article", { className: "spec-card", children: [_jsx("span", { className: "product-label", children: labels.yearsOnPlatform }), _jsx("strong", { children: sellerInsights.yearsOnPlatform })] }), _jsxs("article", { className: "spec-card", children: [_jsx("span", { className: "product-label", children: labels.followers }), _jsx("strong", { children: sellerInsights.followers })] }), _jsxs("article", { className: "spec-card", children: [_jsx("span", { className: "product-label", children: labels.responseRate }), _jsx("strong", { children: sellerInsights.responseRate })] }), _jsxs("article", { className: "spec-card", children: [_jsx("span", { className: "product-label", children: labels.positiveFeedback }), _jsx("strong", { children: sellerInsights.positiveFeedback })] }), _jsxs("article", { className: "spec-card", children: [_jsx("span", { className: "product-label", children: labels.storeName }), _jsx("strong", { children: listing.seller })] })] }), _jsx("div", { className: "section-heading compact product-section-spacing", children: _jsx("p", { className: "section-kicker", children: labels.shippingPolicy }) }), _jsx("ul", { className: "guidance-list", children: details.shippingPolicy.map((item) => (_jsx("li", { children: pickText(item, language) }, pickText(item, language)))) }), _jsx("div", { className: "section-heading compact product-section-spacing", children: _jsx("p", { className: "section-kicker", children: labels.shoppingTips }) }), _jsx("ul", { className: "guidance-list", children: details.shoppingTips.map((item) => (_jsx("li", { children: pickText(item, language) }, pickText(item, language)))) }), canChat && chatOrder ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "section-heading compact product-section-spacing", children: [_jsx("p", { className: "section-kicker", children: "Live chat" }), _jsx("h2", { children: "Message seller" })] }), _jsx("div", { className: "review-grid", children: (chatOrder.messages ?? []).length === 0 ? (_jsx("article", { className: "review-card", children: _jsx("p", { children: "No chat messages yet for this order." }) })) : (chatOrder.messages ?? []).map((message) => (_jsxs("article", { className: "review-card", children: [_jsxs("div", { className: "listing-footer review-header-row", children: [_jsxs("div", { children: [_jsx("strong", { children: message.senderName }), _jsx("p", { className: "microcopy", children: new Date(message.createdAt).toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US') })] }), _jsx("span", { className: "badge", children: message.senderRole })] }), _jsx("p", { children: message.text })] }, `${message.senderId}-${message.createdAt}-${message.text}`))) }), _jsxs("form", { className: "form-grid compact-form-grid", onSubmit: handleSendMessage, children: [_jsx("textarea", { value: chatText, onChange: (event) => setChatText(event.target.value), placeholder: "Message seller about your order", required: true }), chatError ? _jsx("p", { className: "form-notice form-notice-error", children: chatError }) : null, _jsx("button", { type: "submit", className: "button button-secondary", children: "Send" })] })] })) : null] })] }), _jsxs("section", { className: "market-grid", children: [_jsxs("div", { className: "section-heading compact", children: [_jsx("p", { className: "section-kicker", children: labels.reviews }), _jsx("h2", { children: labels.reviewSummary(visibleReviews.length, listing.reviewScore) })] }), canReview ? (_jsxs("form", { className: "form-grid compact-form-grid", onSubmit: handleSubmitReview, children: [_jsxs("label", { className: "form-field", children: [_jsx("span", { className: "card-label", children: "Rating" }), _jsx("select", { value: reviewRating, onChange: (event) => setReviewRating(Number(event.target.value)), children: [5, 4, 3, 2, 1].map((value) => (_jsx("option", { value: value, children: value }, value))) })] }), _jsx("textarea", { value: reviewComment, onChange: (event) => setReviewComment(event.target.value), placeholder: "Write your review after delivery", required: true }), reviewError ? _jsx("p", { className: "form-notice form-notice-error", children: reviewError }) : null, _jsx("button", { type: "submit", className: "button button-primary", children: "Submit review" })] })) : null, _jsx("div", { className: "review-grid", children: visibleReviews.map((review) => (_jsxs("article", { className: "review-card", children: [_jsxs("div", { className: "listing-footer review-header-row", children: [_jsxs("div", { children: [_jsx("strong", { children: review.author }), _jsx("p", { className: "microcopy", children: new Date(review.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US') })] }), _jsx("span", { className: "badge", children: renderStars(review.rating) })] }), _jsx("p", { children: review.comment })] }, `${review.author}-${review.date}-${review.comment}`))) })] }), relatedListings.length > 0 ? (_jsxs("section", { className: "market-grid", children: [_jsxs("div", { className: "section-heading compact", children: [_jsx("p", { className: "section-kicker", children: copy.product.relatedKicker }), _jsx("h2", { children: copy.product.relatedTitle(translateCatalogText(listing.category)) })] }), _jsx("div", { className: "listing-grid", children: relatedListings.map((item) => (_jsx(ListingCard, { listing: item }, item.id))) })] })) : null] }));
}
export default ProductPage;
