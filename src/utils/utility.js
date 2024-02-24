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

export const setBackgroundColor = (params) => {
   return params.data.assetClass.toLowerCase();
}

export const sortByAssetClass = (valueA, valueB) => {
    let order = ['Commodities', 'Equities', 'Credit']
    const indexofA = order.indexOf(valueA);
    const indexofB = order.indexOf(valueB);
    return indexofA - indexofB;
}

export const priceColor = (params) => {
    if (params.value > 0) {
        return { color: 'blue' }
    }
    return { color: 'red' }
}


