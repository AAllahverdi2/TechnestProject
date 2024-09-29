export const getInitialFormikState = (type) => {
    let initialState = {
        userId: '',
        afterPrice: 0,
        productPrice: '',
        minimumBidPrice: '',
        productName: '',
        productDescription: '',
        oneTimePurchase: '',
        watching: 0,
        bidderId:'',
        endTime: new Date().toISOString().substring(0, 16),
        startTime: new Date().toISOString().substring(0, 16),
        totalBids: 0,
        productImages: [],
        type: type,
        details: {},
    };
    if (type) {
        if (type == 'car') {
            initialState.details = {
                brand: '',
                condition: '',
                model: '',
                year: '',
                fuel: '',
                color: '',
                mileage: '',
                engine: '',
                transmission: '',
                doors: '',
            };
        } else if (type == 'electronic') {
            initialState.details = {
                prodBrand: '',
                series: '',
                prodColor: '',
                hardDiskSize: '',
                cpuModel: '',
                ramMemory: '',
            };
        } else if (type == 'jewelry') {
            initialState.details = {
                weight: '',
                purity: '',
                gemstone: '',
                metalType: '',
                claspType: '',
                dimensions: {
                    length: '',
                    width: '',
                    height: '',
                },
                gemstoneColor: '',
            };
        }

    }

    return initialState;
};