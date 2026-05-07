export const formatCurrency = (value) => new Intl.NumberFormat('en-BH', {
    style: 'currency',
    currency: 'BHD',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
}).format(value);
export const spotlightListings = [];
export const workflowSteps = [
    'Seller verifies identity and publishes a listing.',
    'Buyer discovers products, compares trust signals, and checks out.',
    'Marketplace holds payment, tracks shipment, and opens support if needed.',
    'Funds release after delivery confirmation and review window.',
];
export const operatingRails = [
    {
        label: 'Buyer experience',
        detail: 'Search, saved lists, checkout, tracking, reviews, and dispute support.',
    },
    {
        label: 'Seller cockpit',
        detail: 'Listings, inventory, orders, payout status, and response-time health.',
    },
    {
        label: 'Admin control',
        detail: 'Moderation queues, refund oversight, seller verification, and payouts audit.',
    },
];
export const trustSignals = [
    'Escrow-style release after delivery',
    'Seller verification before payouts',
    'Messaging, support, and dispute trail',
    'Shipment and refund accountability',
];
export const sellerMetrics = [
    { label: 'Pending confirmations', value: '12', note: 'Orders awaiting seller response' },
    { label: 'Payout queue', value: '$18,420', note: 'Scheduled after delivery checks' },
    { label: 'Support SLA', value: '36h', note: 'Target first-response window' },
];
export const adminQueues = [
    '7 seller verification checks awaiting ID review',
    '5 refund requests need policy approval',
    '3 payout exceptions flagged by risk scoring',
    '11 listings require moderation before publishing',
];
