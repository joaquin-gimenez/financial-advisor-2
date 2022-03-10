
export function formatPortfolioName(key) {
    key = key.replace(/[A-Z]/g, ' $&')
    return key.charAt(0).toUpperCase() + key.slice(1);
}

export function isNegative(number) {
    return Math.sign(number) === -1;
}

export function roundToTwoDecimals(number) {
    return Math.round(number * 100) / 100
}