const BidHistoryModel = require("../models/bidHistory.model");
const ProductModel = require("../models/product.model");

const ProductController = {
    getAll: async (req, res) => {
        try {
            const products = await ProductModel.find({})
            res.status(200).send(products)

        } catch (err) {
            res.status(404).send('Error In Getting All Products' + err)
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params
            const product = await ProductModel.findById(id)
            res.status(200).send(product)

        } catch (err) {
            res.status(404).send('Error In Getting One Product' + err)
        }
    },
    getAllUsersData: async (req, res) => {
        try {
            const userId = req.params.userId;
            const products = await ProductModel.find({ userId: userId })
            res.status(200).send(products)

        } catch (err) {
            res.status(404).send('Error In Getting All Users Data' + err)
        }
    },
    getAllBiddersData: async (req, res) => {
        try {
            const bidderId = req.params.bidderId;
            const products = await ProductModel.find({ bidderId: bidderId })
            res.status(200).send(products)

        } catch (err) {
            res.status(404).send('Error In Getting All Bidders Data' + err)
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deleteProduct = await ProductModel.findByIdAndDelete(id)
            await BidHistoryModel.deleteMany({ prodId: deleteProduct._id });

            res.send(deleteProduct)

        } catch (err) {
            res.status(404).send('Error In Deleting Product' + err)
        }
    },
    deleteMultiple: async (req, res) => {

        try {
            const { productIds } = req.body;
            const deletedProducts = await ProductModel.deleteMany({ _id: { $in: productIds } });

            if (deletedProducts.deletedCount > 0) {
                res.status(200).send(deletedProducts);
            } else {
                res.status(404).json({ error: 'No products found for deletion' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    add: async (req, res) => {
        try {
            const {
                userId,
                afterPrice,
                productPrice,
                minimumBidPrice,
                productName,
                productDescription,
                watching,
                totalBids,
                endTime,
                startTime,
                productImages,
                oneTimePurchase,
                bidderId,
                type,
                details,
                prodBrand,
                series,
                prodColor,
                hardDiskSize,
                cpuModel,
                ramMemory,
                brand,
                condition,
                model,
                year,
                fuel,
                color,
                mileage,
                engine,
                transmission,
                doors,

                weight,
                purity,
                gemstone,
                metalType,
                claspType,
                length,
                width,
                height,
                gemstoneColor,
            } = req.body;
            const detailsSchema = ProductModel.getDetailsSchema(type);
            const prodDetail = {}
            if (type == 'electronic') {

                prodDetail.prodBrand = prodBrand,
                    prodDetail.series = series,
                    prodDetail.prodColor = prodColor,
                    prodDetail.hardDiskSize = hardDiskSize,
                    prodDetail.cpuModel = cpuModel,
                    prodDetail.ramMemory = ramMemory
            } else if (type == 'car') {
                prodDetail.brand = brand,
                    prodDetail.condition = condition,
                    prodDetail.model = model,
                    prodDetail.year = Number(year),
                    prodDetail.fuel = fuel,
                    prodDetail.color = color,
                    prodDetail.mileage = Number(mileage),
                    prodDetail.engine = engine,
                    prodDetail.transmission = transmission,
                    prodDetail.doors = Number(doors)
            } else if (type == 'jewelry') {
                const dimens = {}
                dimens.length = Number(length),
                    dimens.width = Number(width),
                    dimens.height = Number(height),
                    prodDetail.weight = Number(weight),
                    prodDetail.purity = purity,
                    prodDetail.gemstone = gemstone,
                    prodDetail.metalType = metalType,
                    prodDetail.claspType = claspType,
                    prodDetail.dimensions = dimens,
                    prodDetail.gemstoneColor = gemstoneColor
            }
            const newProduct = new ProductModel({
                userId: userId,
                bidderId: bidderId,
                afterPrice: afterPrice,
                productPrice: productPrice,
                minimumBidPrice: minimumBidPrice,
                productName: productName,
                productDescription: productDescription,
                watching: watching,
                totalBids: totalBids,
                endTime: endTime,
                startTime: startTime,
                oneTimePurchase: oneTimePurchase,
                type: type,
                details: prodDetail
            });
            if (req.files && req.files.length > 0) {
                newProduct.productImages = req.files.map(file => file.filename);
            }
            await newProduct.save();
            res.status(201).send(newProduct);
        } catch (err) {
            console.log(err)
            res.status(400).send('Error In Posting Product: ' + err);
        }
    },
    update: async (req, res) => {
        try {
            const productId = req.params.id;
            const {
                userId,
                afterPrice,
                productPrice,
                minimumBidPrice,
                productName,
                productDescription,
                bidderId,
                watching,
                totalBids,
                endTime,
                oneTimePurchase,
                startTime,
                productImages,
                type,
                details,
                prodBrand,
                series,
                prodColor,
                hardDiskSize,
                cpuModel,
                ramMemory,
                brand,
                condition,
                model,
                year,
                fuel,
                color,
                mileage,
                engine,
                transmission,
                doors,

                weight,
                purity,
                gemstone,
                metalType,
                claspType,
                length,
                width,
                height,
                gemstoneColor,
            } = req.body;
            const prodDetail = {}
            if (type == 'electronic') {

                prodDetail.prodBrand = prodBrand,
                    prodDetail.series = series,
                    prodDetail.prodColor = prodColor,
                    prodDetail.hardDiskSize = hardDiskSize,
                    prodDetail.cpuModel = cpuModel,
                    prodDetail.ramMemory = ramMemory
            } else if (type == 'car') {
                prodDetail.brand = brand,
                    prodDetail.condition = condition,
                    prodDetail.model = model,
                    prodDetail.year = Number(year),
                    prodDetail.fuel = fuel,
                    prodDetail.color = color,
                    prodDetail.mileage = Number(mileage),
                    prodDetail.engine = engine,
                    prodDetail.transmission = transmission,
                    prodDetail.doors = Number(doors)
            } else if (type == 'jewelry') {
                const dimens = {}
                dimens.length = Number(length),
                    dimens.width = Number(width),
                    dimens.height = Number(height),
                    prodDetail.weight = Number(weight),
                    prodDetail.purity = purity,
                    prodDetail.gemstone = gemstone,
                    prodDetail.metalType = metalType,
                    prodDetail.claspType = claspType,
                    prodDetail.dimensions = dimens,
                    prodDetail.gemstoneColor = gemstoneColor
            }
            const productUpdate = {
                userId: userId,
                afterPrice: afterPrice,
                productPrice: productPrice,
                minimumBidPrice: minimumBidPrice,
                productName: productName,
                productDescription: productDescription,
                watching: watching,
                totalBids: totalBids,
                bidderId: bidderId,
                oneTimePurchase: oneTimePurchase,
                type: type,
                endTime: endTime,
                startTime: startTime,
                details: prodDetail,
            }

            if (req.files && req.files.length > 0) {
                productUpdate.productImages = req.files.map(file => file.filename);
            }
            await ProductModel.findByIdAndUpdate(productId, { $set: productUpdate }, { new: true });
            const updatedProduct = await ProductModel.findById(productId);

            res.status(200).send(updatedProduct);
        } catch (err) {
            res.status(400).send('Error In Updating Product: ' + err);
        }
    },
    incrementWatch: async (req, res) => {
        try {
            const productId = req.params.id;

            const product = await ProductModel.findById(productId);
            if (!product) {
                return res.status(404).send('Product not found');
            }

            product.watching += 1;

            await ProductModel.findByIdAndUpdate(productId, {
                $set: {
                    watching: product.watching
                }
            }, { new: true })

            const product2 = await ProductModel.findById(productId);

            res.status(200).send(product2);
        } catch (err) {
            console.log(err);
            res.status(500).send('Error incrementing watch count');
        }
    },
    increaseAfterPrice: async (req, res) => {
        try {
            const productId = req.params.id;
            const { addedBid, bidderId } = req.body;

            const product = await ProductModel.findById(productId);
            if (!product) {
                return res.status(404).send('Product not found');
            }
            product.afterPrice += addedBid;
            product.totalBids += 1;
            product.bidderId = bidderId

            await ProductModel.findByIdAndUpdate(productId, {
                $set: {
                    afterPrice: product.afterPrice, totalBids: product.totalBids, bidderId: product.bidderId
                }
            }, { new: true });

            const updatedProduct = await ProductModel.findById(productId);

            res.status(200).send(updatedProduct);
        } catch (err) {
            res.status(400).send('Error in increasing afterPrice: ' + err);
        }
    }
}


module.exports = ProductController