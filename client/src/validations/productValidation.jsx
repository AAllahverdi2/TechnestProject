import * as Yup from 'yup';
const generateProductSchema = (type) => {
    const productSchema = Yup.object().shape({

        afterPrice: Yup.number(),
        productPrice: Yup.number().required('Product Price is required'),
        oneTimePurchase: Yup.number().required('One Time Purchase is required'),
        minimumBidPrice: Yup.number().required('Minimum Bid Price is required'),
        productName: Yup.string().required('Product Name is required'),
        productDescription: Yup.string().required('Product Description is required'),
        watching: Yup.number(),
        totalBids: Yup.number(),
        startTime: Yup.date().required('Start Time is required'),
        endTime: Yup.date()
            .required('End Time is required')
            .min(Yup.ref('startTime'), 'End Time must be later than Start Time'),
        productImages: Yup.array()
            .min(1, 'Select at least one image')
            .max(10, 'Select up to 10 images').required('Product Images is required'),
        type: Yup.string()
            .oneOf(['car', 'electronic', 'jewelry'], 'Invalid type')
            .required('Type is required'),
        details: Yup.lazy((values) => {
            switch (type) {
                case 'car':
                    return Yup.object().shape({
                        brand: Yup.string().required('Brand is required'),
                        condition: Yup.string().required('Condition is required'),
                        model: Yup.string().required('Model is required'),
                        year: Yup.number().required('Year is required'),
                        fuel: Yup.string().required('Fuel is required'),
                        color: Yup.string().required('Color is required'),
                        mileage: Yup.number().required('Mileage is required'),
                        engine: Yup.string().required('Engine is required'),
                        transmission: Yup.string().required('Transmission is required'),
                        doors: Yup.number().required('Doors is required'),
                    });
                case 'electronic':
                    return Yup.object().shape({
                        prodBrand: Yup.string().required('Brand is required'),
                        series: Yup.string().required('Series is required'),
                        prodColor: Yup.string().required('Color is required'),
                        hardDiskSize: Yup.string().required('Hard Disk Size is required'),
                        cpuModel: Yup.string().required('CPU Model is required'),
                        ramMemory: Yup.string().required('RAM Memory is required'),
                    });
                case 'jewelry':
                    return Yup.object().shape({
                        weight: Yup.number().required('Weight is required'),
                        purity: Yup.string().required('Purity is required'),
                        gemstone: Yup.string().required('Gemstone is required'),
                        metalType: Yup.string().required('Metal Type is required'),
                        claspType: Yup.string().required('Clasp Type is required'),
                        dimensions: Yup.object().shape({
                            length: Yup.number().required('Length is required'),
                            width: Yup.number().required('Width is required'),
                            height: Yup.number().required('Height is required'),
                        }),
                        gemstoneColor: Yup.string().required('Gemstone Color is required'),
                    });
                default:
                    return Yup.object();
            }
        }),
    });
    return productSchema
}
export default generateProductSchema;
