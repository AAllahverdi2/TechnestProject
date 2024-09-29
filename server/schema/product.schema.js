const mongoose = require('mongoose');


const CarDetailsSchema = new mongoose.Schema({
    brand: String,
    condition: String,
    model: String,
    year: Number,
    fuel: String,
    color: String,
    mileage: Number,
    engine: String,
    transmission: String,
    doors: Number,

});

const ComputerDetailsSchema = new mongoose.Schema({
    prodBrand: String,
    series: String,
    prodColor: String,
    hardDiskSize: String,
    cpuModel: String,
    ramMemory: String,
});

const GoldDetailsSchema = new mongoose.Schema({
    weight: Number,
    purity: String,
    gemstone: String,
    metalType: String,
    claspType: String,
    dimensions: {
        length: Number,
        width: Number,
        height: Number
    },
    gemstoneColor: String,
});
const ProductSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    bidderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    afterPrice: Number,
    productPrice: Number,
    minimumBidPrice: Number,
    productName: String,
    endTime: Date,
    startTime: Date,
    oneTimePurchase: Number,
    productDescription: String,
    watching: Number,
    totalBids: Number,
    productImages: [{ type: String }],
    type: {
        type: String,
        enum: ['car', 'electronic', 'jewelry']
    },
    details: { type: mongoose.Schema.Types.Mixed }
}, { versionKey: false, timestamps: true })

ProductSchema.statics.getDetailsSchema = function (type) {
    switch (type) {
        case 'car':
            return CarDetailsSchema;
        case 'electronic':
            return ComputerDetailsSchema;
        case 'jewelry':
            return GoldDetailsSchema;
        default:
            throw new Error('Invalid product type');
    }
};

ProductSchema.post('save', async function (doc) {
    if (doc.type && doc.details) {
        const detailsSchema = this.constructor.getDetailsSchema(doc.type);
        const flatDetails = {};

        for (const key in detailsSchema.obj) {
            flatDetails[key] = doc.details[key];
        }

        await doc.updateOne({ details: flatDetails });
    }
});
module.exports = ProductSchema
