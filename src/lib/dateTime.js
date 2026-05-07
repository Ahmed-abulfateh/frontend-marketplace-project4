const formatDateTimeGmt3 = (value, language) => {
    if (!value) {
        return '-';
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return '-';
    }
    const locale = language === 'ar' ? 'ar-EG' : 'en-US';
    const formatted = new Intl.DateTimeFormat(locale, {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Bahrain',
    }).format(date);
    return `${formatted} (GMT+3)`;
};
export { formatDateTimeGmt3 };
