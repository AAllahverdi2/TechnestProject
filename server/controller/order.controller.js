const OrderModel = require("../models/order.model");


const OrderController = {
    getAll: async (req, res) => {
        try {
            const orders = await OrderModel.find({}).populate('items')
            res.status(200).send(orders)

        } catch (err) {
            res.status(404).send('Error In Getting All Orders' + err)
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params
            const order = await OrderModel.findById(id)
            res.status(200).send(order)

        } catch (err) {
            res.status(404).send('Error In Getting One Order' + err)
        }
    },
    getAllUsersData: async (req, res) => {
        try {
            const orderedUserId = req.params.orderedUserId;
            const userOrders = await OrderModel.find({ orderedUserId: orderedUserId })
            res.status(200).send(userOrders)

        } catch (err) {
            res.status(404).send('Error In Getting All User Orders' + err)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deleteProduct = await OrderModel.findByIdAndDelete(id)
            res.send(deleteProduct)

        } catch (err) {
            res.status(404).send('Error In Deleting Order' + err)
        }
    },
    add: async (req, res) => {
        try {
            const {
                orderedUserId,
                orderFirstName,
                orderLastName,
                orderAddress,
                orderApartments,
                orderCity,
                orderCountry,
                orderPhone,
                orderGmail,
                orderStatus,
                items,
                orderTotalPrice,
                orderTotalAmount,
            } = req.body;

            const newOrder = new OrderModel({
                orderedUserId: orderedUserId,
                orderFirstName: orderFirstName,
                orderLastName: orderLastName,
                orderAddress: orderAddress,
                orderApartments: orderApartments,
                orderCity: orderCity,
                orderCountry: orderCountry,
                orderPhone: orderPhone,
                orderGmail: orderGmail,
                orderStatus: orderStatus,
                orderTotalPrice: orderTotalPrice,
                orderTotalAmount: orderTotalAmount,
                items: items
            })
            await newOrder.save();
            res.status(201).send(newOrder);
        } catch (err) {
            console.log(err)
            res.status(400).send('Error In Posting Order: ' + err);
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params
            const {
                orderedUserId,
                orderFirstName,
                orderLastName,
                orderAddress,
                orderApartments,
                orderCity,
                orderCountry,
                orderPhone,
                orderGmail,
                orderTotalPrice,
                orderTotalAmount,
                orderStatus,
                items
            } = req.body;

            const updateOrder = {
                orderedUserId: orderedUserId,
                orderFirstName: orderFirstName,
                orderLastName: orderLastName,
                orderAddress: orderAddress,
                orderApartments: orderApartments,
                orderCity: orderCity,
                orderCountry: orderCountry,
                orderPhone: orderPhone,
                orderGmail: orderGmail,
                orderStatus: orderStatus,
                orderTotalPrice: orderTotalPrice ,
                orderTotalAmount: orderTotalAmount,
                items: items
            }
            await OrderModel.findByIdAndUpdate(id, { $set: updateOrder }, { new: true })
            const updateOrderData = await OrderModel.findById(id)
            res.status(200).send(updateOrderData)
        } catch (err) {
            console.log(err)
            res.status(400).send('Error In Updating Order: ' + err);
        }
    },
    updateStatus: async (req, res) => {
        try {
            const productId = req.params.id;
            const { orderStatus } = req.body;

            const order = await OrderModel.findById(productId);
            if (!order) {
                return res.status(404).send('Order not found');
            }
            order.orderStatus = orderStatus

            await OrderModel.findByIdAndUpdate(
                productId,
                { $set: { orderStatus: order.orderStatus } },
                { new: true }
            );
            const oneOrder = await OrderModel.findById(productId);

            res.status(200).send(oneOrder);
        } catch (err) {
            res.status(500).send('Error In Updating Order Status: ' + err);
        }
    },
}

module.exports = OrderController