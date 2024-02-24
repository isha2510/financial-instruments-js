export const sortData = (key, data) => {
    const sortedData = [...data];
    switch (key) {
        case 'assetClass':
            sortedData.sort((a, b) => {
                let order = ['Commodities', 'Equities', 'Credit']
                const indexofA = order.indexOf(a.assetClass);
                const indexofB = order.indexOf(b.assetClass);
                return indexofA - indexofB;
            })
            break;
        case 'ticker':
            sortedData.sort((a, b) => a.ticker.localeCompare(b.ticker));
            break;
        case 'price':
            sortedData.sort((a, b) => b.price - a.price)
            break;
        default:
            break;
    }
    return sortedData;
};
