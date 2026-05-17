const DEMO_STATE_KEY = 'signal-market-demo-state';
const DEMO_TOKEN_KEY = 'signal-market-demo-token';
``
const createDemoImage = (title, accent, accentSoft) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0d1117"/><stop offset="100%" stop-color="#111827"/></linearGradient><linearGradient id="glow" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${accent}" stop-opacity="0.9"/><stop offset="100%" stop-color="${accentSoft}" stop-opacity="0.1"/></linearGradient></defs><rect width="1200" height="800" fill="url(#bg)"/><circle cx="300" cy="220" r="170" fill="${accent}" fill-opacity="0.16"/><circle cx="920" cy="160" r="140" fill="${accentSoft}" fill-opacity="0.12"/><rect x="120" y="150" width="960" height="500" rx="36" fill="url(#glow)" fill-opacity="0.26" stroke="${accent}" stroke-opacity="0.28"/><path d="M240 520l165-165a28 28 0 0 1 40 0l115 115 74-74a28 28 0 0 1 40 0L960 520v64H240z" fill="${accent}" fill-opacity="0.26"/><text x="50%" y="50%" text-anchor="middle" fill="#f7f9f9" font-family="Arial, sans-serif" font-size="54" font-weight="700">${title}</text><text x="50%" y="58%" text-anchor="middle" fill="#cbd5e1" font-family="Arial, sans-serif" font-size="24">Demo image</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const DEMO_USERS = [
    {
        id: 'usr-admin-ahmed',
        username: 'ahmed-bh91-admin',
        email: 'ahmed-bh91@live.com',
        phone: '66929266',
        password: '@khalid123Qwe',
        role: 'admin',
        accountStatus: 'active',
        addressLine: 'Manama Souq Building 12',
        city: 'Manama',
        road: 'Road 381',
        block: 'Block 308',
        country: 'Bahrain',
    },
    {
        id: 'usr-seller-ahmed',
        username: 'ahmed-bh91-seller',
        email: 'ahmed-bh91@hotmail.com',
        phone: '66663101',
        password: '@khalid123Qwe',
        role: 'seller',
        accountStatus: 'active',
        addressLine: 'Workshop 4, Hidd Crafts Yard',
        city: 'Hidd',
        road: 'Road 204',
        block: 'Block 115',
        country: 'Bahrain',
    },
    {
        id: 'usr-buyer-mohd',
        username: 'mohd-bh91',
        email: 'mohd-bh91@hotmail.com',
        phone: '17681877',
        password: '@khalid123Qwe',
        role: 'buyer',
        accountStatus: 'active',
        addressLine: 'Apartment 18, Reef Island',
        city: 'Manama',
        road: 'Road 4652',
        block: 'Block 346',
        country: 'Bahrain',
    },
    {
        id: 'usr-seller-lina',
        username: 'lina-crafts',
        email: 'lina-crafts@example.com',
        phone: '33445566',
        password: '@khalid123Qwe',
        role: 'seller',
        accountStatus: 'pending',
        addressLine: '',
        city: '',
        road: '',
        block: '',
        country: 'Bahrain',
    },
];

const DEMO_LISTINGS = [
    {
        id: 'studio-ceramics',
        title: 'Hand-thrown studio ceramics set',
        imageUrl: createDemoImage('Ceramics', '#1d9bf0', '#8ecdf8'),
        imageUrls: [
            createDemoImage('Ceramics', '#1d9bf0', '#8ecdf8'),
            createDemoImage('Ceramics Set', '#0f766e', '#99f6e4'),
        ],
        seller: 'ahmed-bh91-seller',
        price: 28.5,
        meta: 'Stoneware glazed in a warm sand finish for daily hosting.',
        description: 'A durable two-piece serving set built for display, gifting, and everyday use.',
        category: 'Home',
        trust: 'Verified seller',
        shipping: 'Tracked delivery in 2-4 days',
        reviewScore: 4.8,
        inventory: 9,
        status: 'live',
        moderationNotes: [],
        reviews: [],
        createdAt: '2026-04-01T09:30:00.000Z',
    },
    {
        id: 'restored-desk-lamp',
        title: 'Restored brass desk lamp',
        imageUrl: createDemoImage('Desk Lamp', '#f59e0b', '#fde68a'),
        imageUrls: [
            createDemoImage('Desk Lamp', '#f59e0b', '#fde68a'),
            createDemoImage('Warm Light', '#b45309', '#fdba74'),
        ],
        seller: 'ahmed-bh91-seller',
        price: 54.0,
        meta: 'Vintage metal body rewired for modern desks and studios.',
        description: 'A restored statement lamp with a compact footprint and warm task lighting.',
        category: 'Vintage',
        trust: 'Verified restoration',
        shipping: 'Tracked insured delivery',
        reviewScore: 4.7,
        inventory: 4,
        status: 'live',
        moderationNotes: [],
        reviews: [],
        createdAt: '2026-04-03T11:15:00.000Z',
    },
    {
        id: 'natural-linen-set',
        title: 'Natural linen dining set',
        imageUrl: createDemoImage('Linen Set', '#10b981', '#6ee7b7'),
        imageUrls: [
            createDemoImage('Linen Set', '#10b981', '#6ee7b7'),
            createDemoImage('Table Texture', '#047857', '#a7f3d0'),
        ],
        seller: 'ahmed-bh91-seller',
        price: 17.25,
        meta: 'Soft-washed table linen with subtle texture and easy layering.',
        description: 'A ready-to-style textile set designed for casual hosting and elevated dining tables.',
        category: 'Textiles',
        trust: 'Verified seller',
        shipping: 'Returns accepted within 7 days',
        reviewScore: 4.6,
        inventory: 15,
        status: 'live',
        moderationNotes: [],
        reviews: [],
        createdAt: '2026-04-04T08:45:00.000Z',
    },
    {
        id: 'walnut-serving-board',
        title: 'Walnut serving board',
        imageUrl: createDemoImage('Serving Board', '#a16207', '#fbbf24'),
        imageUrls: [
            createDemoImage('Serving Board', '#a16207', '#fbbf24'),
            createDemoImage('Walnut Grain', '#78350f', '#fde68a'),
        ],
        seller: 'ahmed-bh91-seller',
        price: 21.9,
        meta: 'Food-safe hardwood board with a slim profile and rich grain.',
        description: 'Built for grazing tables, coffee service, and gift-ready presentation.',
        category: 'Kitchen',
        trust: 'Verified materials',
        shipping: 'Tracked delivery in 3 days',
        reviewScore: 4.9,
        inventory: 11,
        status: 'live',
        moderationNotes: [],
        reviews: [],
        createdAt: '2026-04-05T14:10:00.000Z',
    },
    {
        id: 'courier-tote',
        title: 'Courier canvas tote',
        imageUrl: createDemoImage('Canvas Tote', '#7c3aed', '#c4b5fd'),
        imageUrls: [
            createDemoImage('Canvas Tote', '#7c3aed', '#c4b5fd'),
            createDemoImage('Everyday Carry', '#4c1d95', '#ddd6fe'),
        ],
        seller: 'ahmed-bh91-seller',
        price: 32.0,
        meta: 'Heavy canvas everyday bag with structured handles and inner pockets.',
        description: 'A commuter-ready tote designed for work, errands, and weekend carry.',
        category: 'Accessories',
        trust: 'Verified seller',
        shipping: 'Tracked delivery with returns',
        reviewScore: 4.5,
        inventory: 7,
        status: 'review',
        moderationNotes: [
            { author: 'ahmed-bh91-admin', note: 'Approve once updated packaging photo is added.' },
        ],
        reviews: [],
        createdAt: '2026-04-06T16:20:00.000Z',
    },
    {
        id: 'botanical-print-set',
        title: 'Botanical print triptych',
        imageUrl: createDemoImage('Botanical Art', '#0ea5a4', '#5eead4'),
        imageUrls: [
            createDemoImage('Botanical Art', '#0ea5a4', '#5eead4'),
            createDemoImage('Print Triptych', '#115e59', '#99f6e4'),
        ],
        seller: 'ahmed-bh91-seller',
        price: 44.75,
        meta: 'Three coordinated art prints sized for hallway or living room walls.',
        description: 'A ready-to-frame wall set with muted tones and layered botanical forms.',
        category: 'Art',
        trust: 'Verified seller',
        shipping: 'Tracked delivery in 4 days',
        reviewScore: 4.8,
        inventory: 6,
        status: 'paused',
        moderationNotes: [],
        reviews: [],
        createdAt: '2026-04-07T10:05:00.000Z',
    },
    {
        id: 'handwoven-planters',
        title: 'Handwoven planter trio',
        imageUrl: createDemoImage('Planter Trio', '#22c55e', '#86efac'),
        imageUrls: [
            createDemoImage('Planter Trio', '#22c55e', '#86efac'),
            createDemoImage('Woven Fiber', '#15803d', '#bbf7d0'),
        ],
        seller: 'ahmed-bh91-seller',
        price: 36.5,
        meta: 'Three handwoven baskets sized for herbs, desk plants, or entryway styling.',
        description: 'A lightweight planter set with natural texture and a warm handmade finish.',
        category: 'Home',
        trust: 'Verified seller',
        shipping: 'Tracked delivery in 3-5 days',
        reviewScore: 4.7,
        inventory: 8,
        status: 'live',
        moderationNotes: [],
        reviews: [],
        createdAt: '2026-04-08T09:00:00.000Z',
    },
    {
        id: 'artisan-mug-pair',
        title: 'Artisan mug pair',
        imageUrl: createDemoImage('Mug Pair', '#ef4444', '#fca5a5'),
        imageUrls: [
            createDemoImage('Mug Pair', '#ef4444', '#fca5a5'),
            createDemoImage('Glazed Stoneware', '#991b1b', '#fecaca'),
        ],
        seller: 'ahmed-bh91-seller',
        price: 19.75,
        meta: 'Two matching mugs with a soft matte glaze and comfortable rounded handles.',
        description: 'Gift-ready stoneware designed for coffee, tea, and everyday shelf appeal.',
        category: 'Kitchen',
        trust: 'Verified materials',
        shipping: 'Tracked delivery in 2-4 days',
        reviewScore: 4.9,
        inventory: 13,
        status: 'live',
        moderationNotes: [],
        reviews: [],
        createdAt: '2026-04-09T13:25:00.000Z',
    },
    {
        id: 'brushed-mirror-tray',
        title: 'Brushed mirror tray',
        imageUrl: createDemoImage('Mirror Tray', '#64748b', '#cbd5e1'),
        imageUrls: [
            createDemoImage('Mirror Tray', '#64748b', '#cbd5e1'),
            createDemoImage('Vanity Accent', '#334155', '#e2e8f0'),
        ],
        seller: 'ahmed-bh91-seller',
        price: 24.0,
        meta: 'Reflective tray for perfumes, candles, keys, or tabletop styling.',
        description: 'A polished accent piece that works as decor, storage, or a display base.',
        category: 'Decor',
        trust: 'Verified seller',
        shipping: 'Tracked insured delivery',
        reviewScore: 4.6,
        inventory: 10,
        status: 'review',
        moderationNotes: [
            { author: 'ahmed-bh91-admin', note: 'Approve after the final angle photo is added.' },
        ],
        reviews: [],
        createdAt: '2026-04-10T15:40:00.000Z',
    },
    {
        id: 'saffron-gift-box',
        title: 'Saffron gift box',
        imageUrl: createDemoImage('Saffron Box', '#d97706', '#fdba74'),
        imageUrls: [
            createDemoImage('Saffron Box', '#d97706', '#fdba74'),
            createDemoImage('Spice Selection', '#92400e', '#fde68a'),
        ],
        seller: 'ahmed-bh91-seller',
        price: 41.25,
        meta: 'A curated spice set with premium saffron threads and presentation packaging.',
        description: 'A compact gourmet gift box made for holidays, hosting, and premium resale.',
        category: 'Food',
        trust: 'Verified materials',
        shipping: 'Tracked delivery in 4 days',
        reviewScore: 4.8,
        inventory: 5,
        status: 'live',
        moderationNotes: [],
        reviews: [],
        createdAt: '2026-04-11T10:50:00.000Z',
    },
];

const DEMO_ORDERS = [
    {
        id: 'ord-1042',
        listingId: 'studio-ceramics',
        buyerId: 'usr-buyer-mohd',
        buyer: 'mohd-bh91',
        total: 28.5,
        status: 'delivered',
        email: 'mohd-bh91@hotmail.com',
        phone: '17681877',
        addressLine: 'Apartment 18, Reef Island',
        city: 'Manama',
        road: 'Road 4652',
        block: 'Block 346',
        country: 'Bahrain',
        shippingAddress: 'Apartment 18, Reef Island, Manama, Road 4652, Block 346, Bahrain',
        paymentMethod: 'Card',
        messages: [
            {
                senderId: 'usr-buyer-mohd',
                senderName: 'mohd-bh91',
                senderRole: 'buyer',
                text: 'The set arrived safely. Thank you for the careful packaging.',
                createdAt: '2026-04-20T13:15:00.000Z',
            },
            {
                senderId: 'usr-seller-ahmed',
                senderName: 'ahmed-bh91-seller',
                senderRole: 'seller',
                text: 'Happy to hear that. Let me know if you need a matching platter.',
                createdAt: '2026-04-20T14:00:00.000Z',
            },
        ],
        createdAt: '2026-04-18T09:20:00.000Z',
    },
    {
        id: 'ord-1043',
        listingId: 'restored-desk-lamp',
        buyerId: 'usr-buyer-mohd',
        buyer: 'mohd-bh91',
        total: 54.0,
        status: 'paid',
        email: 'mohd-bh91@hotmail.com',
        phone: '17681877',
        addressLine: 'Apartment 18, Reef Island',
        city: 'Manama',
        road: 'Road 4652',
        block: 'Block 346',
        country: 'Bahrain',
        shippingAddress: 'Apartment 18, Reef Island, Manama, Road 4652, Block 346, Bahrain',
        paymentMethod: 'Card',
        messages: [],
        createdAt: '2026-04-25T11:45:00.000Z',
    },
];

const DEFAULT_APP_STATES = {
    'usr-admin-ahmed': { favoriteIds: [], cartIds: [], role: 'admin' },
    'usr-seller-ahmed': { favoriteIds: [], cartIds: [], role: 'seller' },
    'usr-buyer-mohd': { favoriteIds: ['studio-ceramics'], cartIds: [], role: 'buyer' },
    'usr-seller-lina': { favoriteIds: [], cartIds: [], role: 'seller' },
};

const createDefaultState = () => ({
    users: DEMO_USERS.map((user) => ({ ...user })),
    listings: DEMO_LISTINGS.map((listing) => ({ ...listing, imageUrls: [...listing.imageUrls], moderationNotes: [...listing.moderationNotes], reviews: [...listing.reviews] })),
    orders: DEMO_ORDERS.map((order) => ({ ...order, messages: [...order.messages] })),
    appStates: JSON.parse(JSON.stringify(DEFAULT_APP_STATES)),
    passwordResetTokens: [],
});

const clone = (value) => JSON.parse(JSON.stringify(value));

const readToken = () => window.localStorage.getItem(DEMO_TOKEN_KEY);

const writeToken = (token) => {
    if (token) {
        window.localStorage.setItem(DEMO_TOKEN_KEY, token);
        return;
    }
    window.localStorage.removeItem(DEMO_TOKEN_KEY);
};

const readState = () => {
    const saved = window.localStorage.getItem(DEMO_STATE_KEY);

    if (!saved) {
        const nextState = createDefaultState();
        window.localStorage.setItem(DEMO_STATE_KEY, JSON.stringify(nextState));
        return nextState;
    }

    try {
        const parsed = JSON.parse(saved);
        return {
            ...createDefaultState(),
            ...parsed,
            appStates: { ...DEFAULT_APP_STATES, ...(parsed.appStates ?? {}) },
            passwordResetTokens: Array.isArray(parsed.passwordResetTokens) ? parsed.passwordResetTokens : [],
        };
    }
    catch {
        const nextState = createDefaultState();
        window.localStorage.setItem(DEMO_STATE_KEY, JSON.stringify(nextState));
        return nextState;
    }
};

const writeState = (state) => {
    window.localStorage.setItem(DEMO_STATE_KEY, JSON.stringify(state));
};

const createSession = (user) => ({
    id: user.id,
    name: user.username,
    username: user.username,
    email: user.email,
    phone: user.phone,
    addressLine: user.addressLine ?? '',
    city: user.city ?? '',
    road: user.road ?? '',
    block: user.block ?? '',
    country: user.country ?? '',
    role: user.role,
    accountStatus: user.accountStatus ?? 'active',
});

const ensureUserState = (state, user) => {
    if (!state.appStates[user.id]) {
        state.appStates[user.id] = { favoriteIds: [], cartIds: [], role: user.role };
    }

    return state.appStates[user.id];
};

const getCurrentUser = (state) => {
    const token = readToken();
    return state.users.find((user) => user.id === token) ?? null;
};

const buildStore = (state, session = null) => {
    const activeSession = session?.id ? state.users.find((user) => user.id === session.id) : null;
    const userState = activeSession ? ensureUserState(state, activeSession) : { favoriteIds: [], cartIds: [] };

    return {
        session: activeSession ? createSession(activeSession) : null,
        listings: [...state.listings].sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()),
        favoriteIds: [...(userState.favoriteIds ?? [])],
        cartIds: [...(userState.cartIds ?? [])],
        orders: [...state.orders].sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()),
        ...(activeSession?.role === 'admin'
            ? {
                pendingSellers: state.users
                    .filter((user) => user.role === 'seller')
                    .map((user) => ({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    accountStatus: user.accountStatus ?? 'active',
                })),
            }
            : {}),
    };
};

const requireUser = (state, roles) => {
    const user = getCurrentUser(state);

    if (!user) {
        throw new Error('Authentication required.');
    }

    if (roles && !roles.includes(user.role)) {
        throw new Error('Role is not allowed for this action.');
    }

    return user;
};

const requireApprovedSeller = (user) => {
    if (user.role === 'seller' && user.accountStatus !== 'active') {
        throw new Error('Seller verification is still pending approval.');
    }
};

const slugify = (value) => String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || `listing-${Date.now()}`;

const createResponse = (state, user) => ({ store: buildStore(state, user ? createSession(user) : null) });

const findManagedListing = (state, user, listingId) => {
    const listing = state.listings.find((item) => item.id === listingId);

    if (!listing) {
        throw new Error('Listing not found.');
    }

    if (user.role !== 'admin' && listing.seller !== user.username) {
        throw new Error('You cannot manage this listing.');
    }

    return listing;
};

const canManageOrder = (state, user, order) => {
    if (user.role === 'admin') {
        return true;
    }

    if (user.id === order.buyerId || user.username === order.buyer) {
        return true;
    }

    const listing = state.listings.find((item) => item.id === order.listingId);
    return !!listing && listing.seller === user.username;
};

const createConfirmation = (orders, payload) => ({
    orderIds: orders.map((order) => order.id),
    buyerName: payload.buyerName,
    email: payload.email,
    address: [payload.addressLine, payload.city, payload.road, payload.block, payload.country].filter(Boolean).join(', '),
    paymentMethod: payload.paymentMethod,
    emailSent: false,
});

const nextOrderId = (state) => {
    const current = state.orders
        .map((order) => Number(String(order.id).replace('ord-', '')))
        .filter((value) => Number.isFinite(value));
    return `ord-${(current.length > 0 ? Math.max(...current) : 1043) + 1}`;
};

const normalizeImageUrls = (payload) => {
    const imageUrls = Array.isArray(payload?.imageUrls) ? payload.imageUrls : [];
    const normalized = imageUrls.map((value) => String(value).trim()).filter(Boolean);

    if (normalized.length > 0) {
        return normalized.slice(0, 6);
    }

    const single = String(payload?.imageUrl ?? '').trim();
    return single ? [single] : [];
};

const demoMarketplaceApi = {
    getStore: async () => {
        const state = readState();
        return buildStore(state, createSession(getCurrentUser(state) ?? {}));
    },
    signIn: async (payload) => {
        const state = readState();
        const identifier = String(payload?.identifier ?? '').trim().toLowerCase();
        const password = String(payload?.password ?? '');
        const user = state.users.find((candidate) => (
            candidate.username.toLowerCase() === identifier || candidate.email.toLowerCase() === identifier
        ));

        if (!user || user.password !== password) {
            throw new Error('Invalid username/email or password.');
        }

        writeToken(user.id);
        writeState(state);
        return { token: user.id, store: buildStore(state, createSession(user)) };
    },
    signUp: async (payload) => {
        const state = readState();
        const username = String(payload?.username ?? '').trim();
        const email = String(payload?.email ?? '').trim().toLowerCase();
        const phone = String(payload?.phone ?? '').trim();
        const password = String(payload?.password ?? '');
        const role = payload?.role === 'seller' ? 'seller' : 'buyer';

        if (!username || !email || !phone || !password) {
            throw new Error('Username, email, phone, and password are required.');
        }

        if (state.users.some((user) => user.email.toLowerCase() === email || user.phone === phone)) {
            throw new Error('Another account already uses that email or phone.');
        }

        const user = {
            id: `usr-${slugify(username)}-${Date.now()}`,
            username,
            email,
            phone,
            password,
            role,
            accountStatus: role === 'seller' ? 'pending' : 'active',
            addressLine: '',
            city: '',
            road: '',
            block: '',
            country: '',
        };

        state.users.unshift(user);
        ensureUserState(state, user);
        writeToken(user.id);
        writeState(state);
        return { token: user.id, store: buildStore(state, createSession(user)) };
    },
    signOut: async () => {
        const state = readState();
        writeToken(null);
        return buildStore(state, null);
    },
    updateProfile: async (payload) => {
        const state = readState();
        const user = requireUser(state, ['buyer', 'seller', 'admin']);
        const username = String(payload?.username ?? '').trim();
        const email = String(payload?.email ?? '').trim().toLowerCase();
        const phone = String(payload?.phone ?? '').trim();

        if (!username || !email || !phone) {
            throw new Error('Username, email, and phone are required.');
        }

        if (state.users.some((candidate) => candidate.id !== user.id && (candidate.email.toLowerCase() === email || candidate.phone === phone))) {
            throw new Error('Another account already uses that email or phone.');
        }

        Object.assign(user, {
            username,
            email,
            phone,
            addressLine: String(payload?.addressLine ?? ''),
            city: String(payload?.city ?? ''),
            road: String(payload?.road ?? ''),
            block: String(payload?.block ?? ''),
            country: String(payload?.country ?? ''),
        });

        state.listings = state.listings.map((listing) => (listing.seller === createSession(user).name ? { ...listing, seller: username } : listing));
        state.orders = state.orders.map((order) => (order.buyerId === user.id ? { ...order, buyer: username } : order));
        writeState(state);
        return buildStore(state, createSession(user));
    },
    toggleFavorite: async (listingId) => {
        const state = readState();
        const user = requireUser(state, ['buyer', 'seller', 'admin']);
        const appState = ensureUserState(state, user);
        appState.favoriteIds = appState.favoriteIds.includes(listingId)
            ? appState.favoriteIds.filter((id) => id !== listingId)
            : [...appState.favoriteIds, listingId];
        writeState(state);
        return buildStore(state, createSession(user));
    },
    toggleCart: async (listingId) => {
        const state = readState();
        const user = requireUser(state, ['buyer', 'seller', 'admin']);
        const appState = ensureUserState(state, user);
        appState.cartIds = appState.cartIds.includes(listingId)
            ? appState.cartIds.filter((id) => id !== listingId)
            : [...appState.cartIds, listingId];
        writeState(state);
        return buildStore(state, createSession(user));
    },
    createListing: async (payload) => {
        const state = readState();
        const user = requireUser(state, ['seller', 'admin']);
        requireApprovedSeller(user);
        const imageUrls = normalizeImageUrls(payload);

        state.listings.unshift({
            id: slugify(payload?.title),
            title: String(payload?.title ?? '').trim(),
            imageUrl: imageUrls[0] ?? '',
            imageUrls,
            seller: user.username,
            price: Number(payload?.price ?? 0),
            meta: String(payload?.meta ?? '').trim(),
            description: String(payload?.description ?? '').trim(),
            category: String(payload?.category ?? '').trim(),
            trust: String(payload?.trust ?? '').trim(),
            shipping: String(payload?.shipping ?? '').trim(),
            reviewScore: Number(payload?.reviewScore ?? 4.8),
            inventory: Number(payload?.inventory ?? 0),
            status: 'review',
            moderationNotes: [],
            reviews: [],
            createdAt: new Date().toISOString(),
        });
        writeState(state);
        return buildStore(state, createSession(user));
    },
    updateListing: async (listingId, payload) => {
        const state = readState();
        const user = requireUser(state, ['seller', 'admin']);
        requireApprovedSeller(user);
        const listing = findManagedListing(state, user, listingId);
        const imageUrls = normalizeImageUrls(payload);

        Object.assign(listing, {
            ...payload,
            imageUrl: imageUrls[0] ?? listing.imageUrl,
            imageUrls: imageUrls.length > 0 ? imageUrls : listing.imageUrls,
            price: Number(payload?.price ?? listing.price),
            inventory: Number(payload?.inventory ?? listing.inventory),
        });
        writeState(state);
        return buildStore(state, createSession(user));
    },
    deleteListing: async (listingId) => {
        const state = readState();
        const user = requireUser(state, ['seller', 'admin']);
        requireApprovedSeller(user);
        findManagedListing(state, user, listingId);
        state.listings = state.listings.filter((listing) => listing.id !== listingId);
        Object.values(state.appStates).forEach((appState) => {
            appState.favoriteIds = (appState.favoriteIds ?? []).filter((id) => id !== listingId);
            appState.cartIds = (appState.cartIds ?? []).filter((id) => id !== listingId);
        });
        writeState(state);
        return buildStore(state, createSession(user));
    },
    updateListingStatus: async (listingId, status) => {
        const state = readState();
        const user = requireUser(state, ['seller', 'admin']);
        requireApprovedSeller(user);
        const listing = findManagedListing(state, user, listingId);
        listing.status = String(status ?? listing.status);
        writeState(state);
        return buildStore(state, createSession(user));
    },
    addModerationNote: async (listingId, note) => {
        const state = readState();
        const user = requireUser(state, ['admin']);
        const listing = state.listings.find((item) => item.id === listingId);

        if (!listing) {
            throw new Error('Listing not found.');
        }

        listing.moderationNotes = [
            ...(listing.moderationNotes ?? []),
            { author: user.username, note: String(note ?? '').trim() },
        ];
        writeState(state);
        return buildStore(state, createSession(user));
    },
    advanceOrderStatus: async (orderId, status) => {
        const state = readState();
        const user = requireUser(state, ['seller', 'admin']);
        const order = state.orders.find((item) => item.id === orderId);

        if (!order) {
            throw new Error('Order not found.');
        }

        if (!canManageOrder(state, user, order)) {
            throw new Error('You cannot manage this order.');
        }

        const flow = { pending: 'paid', paid: 'shipped', shipped: 'delivered', delivered: 'delivered' };
        const requestedStatus = String(status ?? '').trim().toLowerCase();
        order.status = requestedStatus ? (requestedStatus === 'complete' ? 'delivered' : requestedStatus) : (flow[order.status] ?? order.status);
        writeState(state);
        return buildStore(state, createSession(user));
    },
    sendOrderMessage: async (orderId, text) => {
        const state = readState();
        const user = requireUser(state, ['buyer', 'seller', 'admin']);
        const order = state.orders.find((item) => item.id === orderId);

        if (!order) {
            throw new Error('Order not found.');
        }

        if (!canManageOrder(state, user, order)) {
            throw new Error('You cannot message on this order.');
        }

        const nextText = String(text ?? '').trim();
        if (!nextText) {
            throw new Error('Message text is required.');
        }

        order.messages = [
            ...(order.messages ?? []),
            {
                senderId: user.id,
                senderName: user.username,
                senderRole: user.role,
                text: nextText,
                createdAt: new Date().toISOString(),
            },
        ];
        writeState(state);
        return buildStore(state, createSession(user));
    },
    addListingReview: async (listingId, payload) => {
        const state = readState();
        const user = requireUser(state, ['buyer', 'admin']);
        const listing = state.listings.find((item) => item.id === listingId);

        if (!listing) {
            throw new Error('Listing not found.');
        }

        const matchingOrder = state.orders.find((order) => order.listingId === listingId && order.status === 'delivered' && (order.buyerId === user.id || order.buyer === user.username));
        if (!matchingOrder) {
            throw new Error('Only buyers with delivered orders can add reviews.');
        }

        if ((listing.reviews ?? []).some((review) => review.orderId === matchingOrder.id)) {
            throw new Error('Review already submitted for this order.');
        }

        const rating = Number(payload?.rating ?? 0);
        const comment = String(payload?.comment ?? '').trim();

        if (!Number.isFinite(rating) || rating < 1 || rating > 5 || !comment) {
            throw new Error('Rating (1-5) and comment are required.');
        }

        listing.reviews = [
            ...(listing.reviews ?? []),
            {
                orderId: matchingOrder.id,
                buyerId: user.id,
                author: user.username,
                rating,
                comment,
                createdAt: new Date().toISOString(),
            },
        ];
        listing.reviewScore = Number((listing.reviews.reduce((sum, review) => sum + review.rating, 0) / listing.reviews.length).toFixed(1));
        writeState(state);
        return buildStore(state, createSession(user));
    },
    updateSellerStatus: async (userId, status) => {
        const state = readState();
        const user = requireUser(state, ['admin']);
        const seller = state.users.find((candidate) => candidate.id === userId && candidate.role === 'seller');

        if (!seller) {
            throw new Error('Seller not found.');
        }

        seller.accountStatus = status === 'pending' ? 'pending' : 'active';
        writeState(state);
        return buildStore(state, createSession(user));
    },
    checkout: async (payload) => {
        const state = readState();
        const user = requireUser(state, ['buyer', 'seller', 'admin']);
        const listingIds = Array.isArray(payload?.listingIds) ? payload.listingIds.map((value) => String(value)) : [];

        if (listingIds.length === 0) {
            throw new Error('At least one listing is required for checkout.');
        }

        const listings = listingIds.map((listingId) => state.listings.find((item) => item.id === listingId));
        if (listings.some((listing) => !listing)) {
            throw new Error('One or more selected listings were not found.');
        }

        const createdOrders = listings.map((listing) => {
            if (!listing || listing.inventory < 1) {
                throw new Error(`Insufficient stock for ${listing?.title ?? 'selected item'}.`);
            }

            listing.inventory -= 1;
            return {
                id: nextOrderId(state),
                listingId: listing.id,
                buyerId: user.id,
                buyer: payload.buyerName,
                total: listing.price,
                status: 'pending',
                email: payload.email,
                phone: payload.phone,
                addressLine: payload.addressLine,
                city: payload.city,
                road: payload.road,
                block: payload.block,
                country: payload.country,
                shippingAddress: [payload.addressLine, payload.city, payload.road, payload.block, payload.country].filter(Boolean).join(', '),
                paymentMethod: payload.paymentMethod,
                messages: [],
                createdAt: new Date().toISOString(),
            };
        });

        state.orders.unshift(...createdOrders);
        ensureUserState(state, user).cartIds = [];
        writeState(state);
        return {
            store: buildStore(state, createSession(user)),
            confirmation: createConfirmation(createdOrders, payload),
        };
    },
    requestPasswordReset: async () => {
        const state = readState();
        const user = requireUser(state, ['buyer', 'seller', 'admin']);
        const token = `reset-${Date.now()}`;
        state.passwordResetTokens = [
            ...(state.passwordResetTokens ?? []).filter((entry) => entry.userId !== user.id),
            { token, userId: user.id, expiresAt: Date.now() + 1000 * 60 * 30 },
        ];
        writeState(state);
        return {
            message: 'Password reset link created in demo mode.',
            resetUrl: `${window.location.origin}/reset-password?token=${token}`,
        };
    },
    resetPassword: async (token, newPassword) => {
        const state = readState();
        const entry = (state.passwordResetTokens ?? []).find((item) => item.token === token && item.expiresAt > Date.now());

        if (!entry) {
            throw new Error('Reset link is invalid or has expired.');
        }

        const user = state.users.find((candidate) => candidate.id === entry.userId);
        if (!user) {
            throw new Error('User account no longer exists.');
        }

        user.password = String(newPassword ?? '');
        state.passwordResetTokens = state.passwordResetTokens.filter((item) => item.token !== token);
        writeState(state);
        return { message: 'Password updated successfully.' };
    },
};

export default demoMarketplaceApi;