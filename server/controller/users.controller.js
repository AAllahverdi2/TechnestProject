const UsersModel = require("../models/users.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const sendResetEmail = require("../helpers/resetTokenMail");
const ProductModel = require("../models/product.model");
const WinningProductModel = require("../models/winningProduct.model");
const OrderModel = require("../models/order.model");
const BlogModel = require("../models/blog.model");
const TodosModel = require("../models/todos.model");
const UserController = {
    getAll: async (req, res) => {
        try {
            const users = await UsersModel.find({}).populate('wishlist basket winningProduct')
            res.status(200).send(users)

        } catch (err) {
            res.status(404).send('Error In Getting All Users' + err)
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params
            const user = await UsersModel.findById(id).populate('wishlist basket winningProduct')
            res.status(200).send(user)

        } catch (err) {
            res.status(404).send('Error In Getting User' + err)
        }
    },
    login: async (req, res) => {
        try {
            const {
                userGmail,
                password,
            } = req.body
            const user = await UsersModel.findOne({ userGmail: userGmail }).populate('wishlist basket winningProduct')
            if (user && await bcrypt.compare(password, user.password)) {
                return res.status(200).send({
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userGmail: user.userGmail,
                    birthdayDay: user.birthdayDay,
                    birthdayMonth: user.birthdayMonth,
                    birthdayYear: user.birthdayYear,
                    address: user.address,
                    superAdmin: user.superAdmin,
                    basket: user.basket,
                    winningProduct: user.winningProduct,
                    wishlist: user.wishlist,
                    profileImage: user.profileImage,
                    language: user.language,
                    resetPasswordToken: user.resetPasswordToken,
                    isAdmin: user.isAdmin,
                    isLogin: user.isLogin,
                    resetPasswordToken: user.resetPasswordToken,
                    resetPasswordExpires: user.resetPasswordExpires,
                    isVerified: user.isVerified,
                    status: user.status,
                    password: user.password,
                    phoneNumber: user.phoneNumber,
                    activeBids: user.activeBids,
                    winningBids: user.winningBids,
                    bidsInWishlist: user.bidsInWishlist,
                    token: await generateToken({
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userGmail: user.userGmail,
                        birthdayDay: user.birthdayDay,
                        birthdayMonth: user.birthdayMonth,
                        birthdayYear: user.birthdayYear,
                        address: user.address,
                        profileImage: user.profileImage,
                        superAdmin: user.superAdmin,
                        language: user.language,
                        basket: user.basket,
                        winningProduct: user.winningProduct,
                        wishlist: user.wishlist,
                        isAdmin: user.isAdmin,
                        isLogin: user.isLogin,
                        isVerified: user.isVerified,
                        status: user.status,
                        phoneNumber: user.phoneNumber,
                        activeBids: user.activeBids,
                        winningBids: user.winningBids,
                        bidsInWishlist: user.bidsInWishlist,
                    })
                })
            } else {
                return res.status(401).send('Email Or Password Incorrect')
            }
        } catch (err) {
            res.status(404).send('Error In Login' + err)
        }
    },
    register: async (req, res) => {
        try {
            const { firstName,
                lastName,
                userGmail,
                birthdayDay,
                birthdayMonth,
                birthdayYear,
                address,
                language,
                isAdmin,
                isLogin,
                isVerified,
                superAdmin,
                status,
                password,
                wishlist,
                winningProduct,
                basket,
                phoneNumber,
                activeBids,
                winningBids,
                bidsInWishlist, } = req.body
            let user = await UsersModel.findOne({ userGmail: userGmail })
            if (user) {
                return res.status(404).send('User Already Registered In This Gmail')
            }
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const newUser = new UsersModel({
                firstName: firstName,
                lastName: lastName,
                userGmail: userGmail,
                birthdayDay: birthdayDay,
                birthdayMonth: birthdayMonth,
                birthdayYear: birthdayYear,
                address: address,
                profileImage: req.file.filename,
                language: language,
                isAdmin: isAdmin,
                superAdmin: superAdmin,
                isLogin: isLogin,
                basket: basket,
                winningProduct: winningProduct,
                wishlist: wishlist,
                isVerified: isVerified,
                status: status,
                password: hashedPassword,
                phoneNumber: phoneNumber,
                activeBids: activeBids,
                winningBids: winningBids,
                bidsInWishlist: bidsInWishlist,
            })
            await newUser.save()
            res.status(201).send({
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                userGmail: newUser.userGmail,
                birthdayDay: newUser.birthdayDay,
                birthdayMonth: newUser.birthdayMonth,
                birthdayYear: newUser.birthdayYear,
                address: newUser.address,
                language: newUser.language,
                isAdmin: newUser.isAdmin,
                superAdmin: newUser.superAdmin,
                profileImage: newUser.profileImage,
                isLogin: newUser.isLogin,
                isVerified: newUser.isVerified,
                basket: newUser.basket,
                wishlist: newUser.wishlist,
                winningProduct: newUser.winningProduct,
                resetPasswordToken: newUser.resetPasswordToken,
                resetPasswordExpires: newUser.resetPasswordExpires,
                status: newUser.status,
                password: newUser.password,
                phoneNumber: newUser.phoneNumber,
                activeBids: newUser.activeBids,
                winningBids: newUser.winningBids,
                bidsInWishlist: newUser.bidsInWishlist,
                token: await generateToken({
                    id: newUser._id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    userGmail: newUser.userGmail,
                    birthdayDay: newUser.birthdayDay,
                    birthdayMonth: newUser.birthdayMonth,
                    birthdayYear: newUser.birthdayYear,
                    winningProduct: newUser.winningProduct,
                    address: newUser.address,
                    language: newUser.language,
                    superAdmin: newUser.superAdmin,
                    isAdmin: newUser.isAdmin,
                    profileImage: newUser.profileImage,
                    isLogin: newUser.isLogin,
                    basket: newUser.basket,
                    wishlist: newUser.wishlist,
                    isVerified: newUser.isVerified,
                    status: newUser.status,
                    phoneNumber: newUser.phoneNumber,
                    activeBids: newUser.activeBids,
                    winningBids: newUser.winningBids,
                    bidsInWishlist: newUser.bidsInWishlist,
                })
            })
        } catch (err) {
            res.status(404).send('Error In Register' + err)
        }

    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params
            const deleteUser = await UsersModel.findByIdAndDelete(id)
            await ProductModel.deleteMany({ userId: deleteUser._id });
            await WinningProductModel.deleteMany({ winnerId: deleteUser._id });
            await OrderModel.deleteMany({ orderedUserId: deleteUser._id });
            await BlogModel.deleteMany({ posterId: deleteUser._id });
            await TodosModel.deleteMany({ todoPosterId: deleteUser._id });
            res.send(deleteUser)

        } catch (err) {
            res.status(404).send('Error In Delete User' + err)
        }
    },
    editUser: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                firstName,
                lastName,
                userGmail,
                birthdayDay,
                birthdayMonth,
                birthdayYear,
                address,
                language,
                isAdmin,
                isLogin,
                wishlist,
                superAdmin,
                basket,
                isVerified,
                winningProduct,
                status,
                phoneNumber,
                activeBids,
                winningBids,
                bidsInWishlist,
                oldPassword, newPassword

            } = req.body;
            const user = await UsersModel.findById(id);
            const updateData = {
                firstName: firstName,
                lastName: lastName,
                userGmail: userGmail,
                birthdayDay: birthdayDay,
                birthdayMonth: birthdayMonth,
                birthdayYear: birthdayYear,
                address: address,
                language: language,
                isAdmin: isAdmin,
                superAdmin: superAdmin,
                wishlist: wishlist,
                winningProduct: winningProduct,
                basket: basket,
                isLogin: isLogin,
                isVerified: isVerified,
                status: status,
                phoneNumber: phoneNumber,
                activeBids: activeBids,
                winningBids: winningBids,
                bidsInWishlist: bidsInWishlist,
            };
            if (req.file !== undefined) {
                updateData.profileImage = req.file.filename;
            }
            if (oldPassword && newPassword) {
                const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

                if (!isPasswordMatch) {
                    return res.status(401).json({ error: 'Old password is incorrect' });
                }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                updateData.password = hashedPassword;
            }


            await UsersModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });
            const updateUser = await UsersModel.findById(id).populate('wishlist basket winningProduct')

            const updatedToken = await generateToken({
                id: updateUser._id,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                userGmail: updateUser.userGmail,
                birthdayDay: updateUser.birthdayDay,
                birthdayMonth: updateUser.birthdayMonth,
                winningProduct: updateUser.winningProduct,
                birthdayYear: updateUser.birthdayYear,
                address: updateUser.address,
                language: updateUser.language,
                isAdmin: updateUser.isAdmin,
                profileImage: updateUser.profileImage,
                isLogin: updateUser.isLogin,
                superAdmin: updateUser.superAdmin,
                basket: updateUser.basket,
                wishlist: updateUser.wishlist,
                isVerified: updateUser.isVerified,
                status: updateUser.status,
                phoneNumber: updateUser.phoneNumber,
                activeBids: updateUser.activeBids,
                winningBids: updateUser.winningBids,
                bidsInWishlist: updateUser.bidsInWishlist,
            });

            res.status(200).send({
                _id: updateUser._id,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                userGmail: updateUser.userGmail,
                birthdayDay: updateUser.birthdayDay,
                birthdayMonth: updateUser.birthdayMonth,
                birthdayYear: updateUser.birthdayYear,
                address: updateUser.address,
                language: updateUser.language,
                isAdmin: updateUser.isAdmin,
                basket: updateUser.basket,
                wishlist: updateUser.wishlist,
                profileImage: updateUser.profileImage,
                superAdmin: updateUser.superAdmin,
                winningProduct: updateUser.winningProduct,
                isLogin: updateUser.isLogin,
                isVerified: updateUser.isVerified,
                resetPasswordToken: updateUser.resetPasswordToken,
                resetPasswordExpires: updateUser.resetPasswordExpires,
                status: updateUser.status,
                password: updateUser.password,
                phoneNumber: updateUser.phoneNumber,
                activeBids: updateUser.activeBids,
                winningBids: updateUser.winningBids,
                bidsInWishlist: updateUser.bidsInWishlist,
                token: updatedToken,
            });
        } catch (err) {
            res.status(404).send('Error In Update User' + err);
        }
    },
    forgotPasswords: async (req, res) => {
        try {
            const { userGmail } = req.body;
            const user = await UsersModel.findOne({ userGmail: userGmail });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const resetToken = jwt.sign({ id: user._id }, process.env.JWT__RESET__SECRET__KEY, {
                expiresIn: '1h'
            });
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = Date.now() + 3600000;
            await user.save();

            sendResetEmail(user.userGmail, resetToken);

            res.status(200).json({ message: 'Password reset initiated successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Error In Forgot Password' });
        }
    },
    changePassword: async (req, res) => {
        try {
            const { id } = req.params
            const { resetToken, newPassword } = req.body;
            const user = await UsersModel.findOne({
                _id: id,
                resetPasswordToken: resetToken,
                resetPasswordExpires: { $gt: Date.now() }
            });

            if (!user) {
                return res.status(401).json({ error: 'Invalid or expired reset token' });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            await UsersModel.findByIdAndUpdate(id, {
                $set: {
                    password: hashedPassword,
                    resetPasswordToken: null,
                    resetPasswordExpires: null
                }
            }, { new: true })
            const updateUser = await UsersModel.findById(id).populate('wishlist basket winningProduct')

            const updatedToken = await generateToken({
                id: updateUser._id,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                userGmail: updateUser.userGmail,
                birthdayDay: updateUser.birthdayDay,
                birthdayMonth: updateUser.birthdayMonth,
                birthdayYear: updateUser.birthdayYear,
                address: updateUser.address,
                language: updateUser.language,
                basket: updateUser.basket,
                wishlist: updateUser.wishlist,
                isAdmin: updateUser.isAdmin,
                superAdmin: updateUser.superAdmin,
                winningProduct: updateUser.winningProduct,
                profileImage: updateUser.profileImage,
                isLogin: updateUser.isLogin,
                isVerified: updateUser.isVerified,
                status: updateUser.status,
                phoneNumber: updateUser.phoneNumber,
                activeBids: updateUser.activeBids,
                winningBids: updateUser.winningBids,
                bidsInWishlist: updateUser.bidsInWishlist,
            });

            res.status(200).send({
                _id: updateUser._id,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                userGmail: updateUser.userGmail,
                birthdayDay: updateUser.birthdayDay,
                birthdayMonth: updateUser.birthdayMonth,
                birthdayYear: updateUser.birthdayYear,
                address: updateUser.address,
                language: updateUser.language,
                isAdmin: updateUser.isAdmin,
                profileImage: updateUser.profileImage,
                superAdmin: updateUser.superAdmin,
                basket: updateUser.basket,
                wishlist: updateUser.wishlist,
                isLogin: updateUser.isLogin,
                winningProduct: updateUser.winningProduct,

                isVerified: updateUser.isVerified,
                status: updateUser.status,
                password: updateUser.password,
                phoneNumber: updateUser.phoneNumber,
                activeBids: updateUser.activeBids,
                winningBids: updateUser.winningBids,
                bidsInWishlist: updateUser.bidsInWishlist,
                token: updatedToken,
            });

        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error In Changing Password' });
        }
    },
    getMe: async (req, res) => {
        res.status(200).send(req.user)
    },
    addToWishlist: async (req, res) => {
        try {
            const productId = req.params.productId;
            const id = req.user.id;

            const product = await ProductModel.findById(productId);
            if (!product) {

                return res.status(404).json({ error: 'Product not found' });
            }

            await UsersModel.findByIdAndUpdate(
                id,
                {
                    $addToSet: { wishlist: productId },
                    $inc: { bidsInWishlist: 1 }
                },
                { new: true }
            );
            const updateUser = await UsersModel.findById(id).populate('wishlist basket winningProduct')

            if (updateUser.wishlist.includes(productId)) {
                return res.status(400).json({ error: 'Product already in wishlist', status: 400 });
            }

            const updatedToken = await generateToken({
                id: updateUser._id,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                userGmail: updateUser.userGmail,
                birthdayDay: updateUser.birthdayDay,
                birthdayMonth: updateUser.birthdayMonth,
                birthdayYear: updateUser.birthdayYear,
                address: updateUser.address,
                language: updateUser.language,
                basket: updateUser.basket,
                winningProduct: updateUser.winningProduct,

                wishlist: updateUser.wishlist,
                isAdmin: updateUser.isAdmin,
                superAdmin: updateUser.superAdmin,
                profileImage: updateUser.profileImage,
                isLogin: updateUser.isLogin,
                isVerified: updateUser.isVerified,
                status: updateUser.status,
                phoneNumber: updateUser.phoneNumber,
                activeBids: updateUser.activeBids,
                winningBids: updateUser.winningBids,
                bidsInWishlist: updateUser.bidsInWishlist,
            });

            res.status(200).send({
                _id: updateUser._id,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                userGmail: updateUser.userGmail,
                birthdayDay: updateUser.birthdayDay,
                birthdayMonth: updateUser.birthdayMonth,
                birthdayYear: updateUser.birthdayYear,
                address: updateUser.address,
                language: updateUser.language,
                winningProduct: updateUser.winningProduct,

                isAdmin: updateUser.isAdmin,
                profileImage: updateUser.profileImage,
                superAdmin: updateUser.superAdmin,
                basket: updateUser.basket,
                wishlist: updateUser.wishlist,
                isLogin: updateUser.isLogin,
                isVerified: updateUser.isVerified,
                resetPasswordToken: null,
                resetPasswordExpires: null,
                status: updateUser.status,
                password: updateUser.password,
                phoneNumber: updateUser.phoneNumber,
                activeBids: updateUser.activeBids,
                winningBids: updateUser.winningBids,
                bidsInWishlist: updateUser.bidsInWishlist,
                token: updatedToken,
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Error in adding to wishlist' });
        }
    },

    removeFromWishlist: async (req, res) => {
        try {
            const productId = req.params.productId;
            const id = req.user.id;
            const product = await ProductModel.findById(productId);
            if (!product) {

                return res.status(404).json({ error: 'Product not found' });
            }
            const updateUser1 = await UsersModel.findById(id)
            if (!updateUser1?.wishlist.includes(productId)) {
                return res.status(400).json({ error: 'Product not found in wishlist' });
            }
            await UsersModel.findByIdAndUpdate(
                id,
                {
                    $pull: { wishlist: productId },
                    $inc: { bidsInWishlist: -1 }
                },
                { new: true }
            );

            const updateUser = await UsersModel.findById(id).populate('wishlist basket winningProduct')

            const updatedToken = await generateToken({
                id: updateUser._id,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                userGmail: updateUser.userGmail,
                birthdayDay: updateUser.birthdayDay,
                birthdayMonth: updateUser.birthdayMonth,
                birthdayYear: updateUser.birthdayYear,
                address: updateUser.address,
                language: updateUser.language,
                basket: updateUser.basket,
                wishlist: updateUser.wishlist,
                isAdmin: updateUser.isAdmin,
                superAdmin: updateUser.superAdmin,
                winningProduct: updateUser.winningProduct,

                profileImage: updateUser.profileImage,
                isLogin: updateUser.isLogin,
                isVerified: updateUser.isVerified,
                status: updateUser.status,
                phoneNumber: updateUser.phoneNumber,
                activeBids: updateUser.activeBids,
                winningBids: updateUser.winningBids,
                bidsInWishlist: updateUser.bidsInWishlist,
            });

            res.status(200).send({
                _id: updateUser._id,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                userGmail: updateUser.userGmail,
                birthdayDay: updateUser.birthdayDay,
                birthdayMonth: updateUser.birthdayMonth,
                birthdayYear: updateUser.birthdayYear,
                address: updateUser.address,
                language: updateUser.language,
                isAdmin: updateUser.isAdmin,
                profileImage: updateUser.profileImage,
                superAdmin: updateUser.superAdmin,
                winningProduct: updateUser.winningProduct,

                basket: updateUser.basket,
                wishlist: updateUser.wishlist,
                isLogin: updateUser.isLogin,
                isVerified: updateUser.isVerified,

                status: updateUser.status,
                password: updateUser.password,
                phoneNumber: updateUser.phoneNumber,
                activeBids: updateUser.activeBids,
                winningBids: updateUser.winningBids,
                bidsInWishlist: updateUser.bidsInWishlist,
                token: updatedToken,
            });
        } catch (err) {
            res.status(500).json({ error: 'Error in removing from wishlist' });
        }
    },


    addToBasket: async (req, res) => {
        try {
            const productId = req.params.productId;
            const id = req.user.id;

            const product = await ProductModel.findById(productId);
            if (!product) {

                return res.status(404).json({ error: 'Product not found' });
            }

            await UsersModel.findByIdAndUpdate(
                id,
                {
                    $addToSet: { basket: productId },
                },
                { new: true }
            );
            const updateUser = await UsersModel.findById(id).populate('wishlist basket winningProduct')

            if (updateUser.basket.includes(productId)) {
                return res.status(400).json({ error: 'Product already in basket', status: 400 });
            }

            const updatedToken = await generateToken({
                id: updateUser._id,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                userGmail: updateUser.userGmail,
                birthdayDay: updateUser.birthdayDay,
                birthdayMonth: updateUser.birthdayMonth,
                birthdayYear: updateUser.birthdayYear,
                address: updateUser.address,
                winningProduct: updateUser.winningProduct,

                language: updateUser.language,
                basket: updateUser.basket,
                wishlist: updateUser.wishlist,
                isAdmin: updateUser.isAdmin,
                superAdmin: updateUser.superAdmin,
                profileImage: updateUser.profileImage,
                isLogin: updateUser.isLogin,
                isVerified: updateUser.isVerified,
                status: updateUser.status,
                phoneNumber: updateUser.phoneNumber,
                activeBids: updateUser.activeBids,
                winningBids: updateUser.winningBids,
                bidsInWishlist: updateUser.bidsInWishlist,
            });

            res.status(200).send({
                _id: updateUser._id,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                userGmail: updateUser.userGmail,
                birthdayDay: updateUser.birthdayDay,
                birthdayMonth: updateUser.birthdayMonth,
                birthdayYear: updateUser.birthdayYear,
                address: updateUser.address,
                language: updateUser.language,
                isAdmin: updateUser.isAdmin,
                profileImage: updateUser.profileImage,
                winningProduct: updateUser.winningProduct,

                superAdmin: updateUser.superAdmin,
                basket: updateUser.basket,
                wishlist: updateUser.wishlist,
                isLogin: updateUser.isLogin,
                isVerified: updateUser.isVerified,
                resetPasswordToken: null,
                resetPasswordExpires: null,
                status: updateUser.status,
                password: updateUser.password,
                phoneNumber: updateUser.phoneNumber,
                activeBids: updateUser.activeBids,
                winningBids: updateUser.winningBids,
                bidsInWishlist: updateUser.bidsInWishlist,
                token: updatedToken,
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Error in adding to basket' });
        }
    },

    removeFromBasket: async (req, res) => {
        try {
            const productId = req.params.productId;
            const id = req.user.id;
            const product = await ProductModel.findById(productId);
            if (!product) {

                return res.status(404).json({ error: 'Product not found' });
            }
            const updateUser1 = await UsersModel.findById(id)
            if (!updateUser1?.basket.includes(productId)) {
                return res.status(400).json({ error: 'Product not found in basket' });
            }
            await UsersModel.findByIdAndUpdate(
                id,
                {
                    $pull: { basket: productId },
                },
                { new: true }
            );

            const updateUser = await UsersModel.findById(id).populate('wishlist basket winningProduct')

            const updatedToken = await generateToken({
                id: updateUser._id,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                userGmail: updateUser.userGmail,
                birthdayDay: updateUser.birthdayDay,
                birthdayMonth: updateUser.birthdayMonth,
                birthdayYear: updateUser.birthdayYear,
                address: updateUser.address,
                language: updateUser.language,
                basket: updateUser.basket,
                wishlist: updateUser.wishlist,
                winningProduct: updateUser.winningProduct,

                isAdmin: updateUser.isAdmin,
                superAdmin: updateUser.superAdmin,
                profileImage: updateUser.profileImage,
                isLogin: updateUser.isLogin,
                isVerified: updateUser.isVerified,
                status: updateUser.status,
                phoneNumber: updateUser.phoneNumber,
                activeBids: updateUser.activeBids,
                winningBids: updateUser.winningBids,
                bidsInWishlist: updateUser.bidsInWishlist,
            });

            res.status(200).send({
                _id: updateUser._id,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                userGmail: updateUser.userGmail,
                birthdayDay: updateUser.birthdayDay,
                birthdayMonth: updateUser.birthdayMonth,
                birthdayYear: updateUser.birthdayYear,
                address: updateUser.address,
                language: updateUser.language,
                isAdmin: updateUser.isAdmin,
                profileImage: updateUser.profileImage,
                superAdmin: updateUser.superAdmin,
                basket: updateUser.basket,
                wishlist: updateUser.wishlist,
                winningProduct: updateUser.winningProduct,

                isLogin: updateUser.isLogin,
                isVerified: updateUser.isVerified,

                status: updateUser.status,
                password: updateUser.password,
                phoneNumber: updateUser.phoneNumber,
                activeBids: updateUser.activeBids,
                winningBids: updateUser.winningBids,
                bidsInWishlist: updateUser.bidsInWishlist,
                token: updatedToken,
            });
        } catch (err) {
            res.status(500).json({ error: 'Error in removing from basket' });
        }
    },
    clearUserBasket: async (req, res) => {
        try {
            const userId = req.params.userId;

            await UsersModel.findByIdAndUpdate(
                userId,
                {
                    $set: { basket: [] },
                },
                { new: true }
            );

            const updateUser = await UsersModel.findById(userId).populate('wishlist basket winningProduct')

            const updatedToken = await generateToken({
                id: updateUser._id,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                userGmail: updateUser.userGmail,
                birthdayDay: updateUser.birthdayDay,
                birthdayMonth: updateUser.birthdayMonth,
                birthdayYear: updateUser.birthdayYear,
                address: updateUser.address,
                language: updateUser.language,
                basket: updateUser.basket,
                wishlist: updateUser.wishlist,
                isAdmin: updateUser.isAdmin,
                superAdmin: updateUser.superAdmin,
                profileImage: updateUser.profileImage,
                isLogin: updateUser.isLogin,
                isVerified: updateUser.isVerified,
                status: updateUser.status,
                winningProduct: updateUser.winningProduct,
                phoneNumber: updateUser.phoneNumber,
                activeBids: updateUser.activeBids,
                winningBids: updateUser.winningBids,
                bidsInWishlist: updateUser.bidsInWishlist,
            });

            res.status(200).send({
                _id: updateUser._id,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                userGmail: updateUser.userGmail,
                birthdayDay: updateUser.birthdayDay,
                birthdayMonth: updateUser.birthdayMonth,
                birthdayYear: updateUser.birthdayYear,
                address: updateUser.address,
                language: updateUser.language,
                isAdmin: updateUser.isAdmin,
                profileImage: updateUser.profileImage,
                superAdmin: updateUser.superAdmin,
                basket: updateUser.basket,
                wishlist: updateUser.wishlist,
                winningProduct: updateUser.winningProduct,

                isLogin: updateUser.isLogin,
                isVerified: updateUser.isVerified,

                status: updateUser.status,
                password: updateUser.password,
                phoneNumber: updateUser.phoneNumber,
                activeBids: updateUser.activeBids,
                winningBids: updateUser.winningBids,
                bidsInWishlist: updateUser.bidsInWishlist,
                token: updatedToken,
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Error in removing from basket' });
        }
    },

    addToWinningProduct: async (req, res) => {
        try {
            const productId = req.params.productId;
            const id = req.user.id;

            const product = await WinningProductModel.findById(productId);
            if (!product) {

                return res.status(404).json({ error: 'Product not found' });
            }

            await UsersModel.findByIdAndUpdate(
                id,
                {
                    $addToSet: { winningProduct: productId },
                },
                { new: true }
            );
            const updateUser = await UsersModel.findById(id).populate('wishlist basket winningProduct')

            if (updateUser.winningProduct.includes(productId)) {
                return res.status(400).json({ error: 'Product already in winning Product', status: 400 });
            }

            const updatedToken = await generateToken({
                id: updateUser._id,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                userGmail: updateUser.userGmail,
                birthdayDay: updateUser.birthdayDay,
                birthdayMonth: updateUser.birthdayMonth,
                birthdayYear: updateUser.birthdayYear,
                address: updateUser.address,
                winningProduct: updateUser.winningProduct,

                language: updateUser.language,
                basket: updateUser.basket,
                wishlist: updateUser.wishlist,
                isAdmin: updateUser.isAdmin,
                superAdmin: updateUser.superAdmin,
                profileImage: updateUser.profileImage,
                isLogin: updateUser.isLogin,
                isVerified: updateUser.isVerified,
                status: updateUser.status,
                phoneNumber: updateUser.phoneNumber,
                activeBids: updateUser.activeBids,
                winningBids: updateUser.winningBids,
                bidsInWishlist: updateUser.bidsInWishlist,
            });

            res.status(200).send({
                _id: updateUser._id,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                userGmail: updateUser.userGmail,
                birthdayDay: updateUser.birthdayDay,
                birthdayMonth: updateUser.birthdayMonth,
                birthdayYear: updateUser.birthdayYear,
                address: updateUser.address,
                language: updateUser.language,
                isAdmin: updateUser.isAdmin,
                profileImage: updateUser.profileImage,
                winningProduct: updateUser.winningProduct,

                superAdmin: updateUser.superAdmin,
                basket: updateUser.basket,
                wishlist: updateUser.wishlist,
                isLogin: updateUser.isLogin,
                isVerified: updateUser.isVerified,
                resetPasswordToken: null,
                resetPasswordExpires: null,
                status: updateUser.status,
                password: updateUser.password,
                phoneNumber: updateUser.phoneNumber,
                activeBids: updateUser.activeBids,
                winningBids: updateUser.winningBids,
                bidsInWishlist: updateUser.bidsInWishlist,
                token: updatedToken,
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Error in adding to winning Product' });
        }
    },
    clearUserWinningProduct: async (req, res) => {
        try {
            const userId = req.params.userId;

            await UsersModel.findByIdAndUpdate(
                userId,
                {
                    $set: { winningProduct: [] },
                },
                { new: true }
            );

            const updateUser = await UsersModel.findById(id).populate('wishlist basket winningProduct')

            const updatedToken = await generateToken({
                id: updateUser._id,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                userGmail: updateUser.userGmail,
                birthdayDay: updateUser.birthdayDay,
                birthdayMonth: updateUser.birthdayMonth,
                birthdayYear: updateUser.birthdayYear,
                address: updateUser.address,
                language: updateUser.language,
                basket: updateUser.basket,
                wishlist: updateUser.wishlist,
                isAdmin: updateUser.isAdmin,
                superAdmin: updateUser.superAdmin,
                profileImage: updateUser.profileImage,
                isLogin: updateUser.isLogin,
                isVerified: updateUser.isVerified,
                status: updateUser.status,
                winningProduct: updateUser.winningProduct,
                phoneNumber: updateUser.phoneNumber,
                activeBids: updateUser.activeBids,
                winningBids: updateUser.winningBids,
                bidsInWishlist: updateUser.bidsInWishlist,
            });

            res.status(200).send({
                _id: updateUser._id,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                userGmail: updateUser.userGmail,
                birthdayDay: updateUser.birthdayDay,
                birthdayMonth: updateUser.birthdayMonth,
                birthdayYear: updateUser.birthdayYear,
                address: updateUser.address,
                language: updateUser.language,
                isAdmin: updateUser.isAdmin,
                profileImage: updateUser.profileImage,
                superAdmin: updateUser.superAdmin,
                basket: updateUser.basket,
                wishlist: updateUser.wishlist,
                winningProduct: updateUser.winningProduct,

                isLogin: updateUser.isLogin,
                isVerified: updateUser.isVerified,

                status: updateUser.status,
                password: updateUser.password,
                phoneNumber: updateUser.phoneNumber,
                activeBids: updateUser.activeBids,
                winningBids: updateUser.winningBids,
                bidsInWishlist: updateUser.bidsInWishlist,
                token: updatedToken,
            });
        } catch (err) {
            res.status(500).json({ error: 'Error in removing from winning Product' });
        }
    },
}
const generateToken = async ({ id, superAdmin, isLogin,winningProduct, firstName, wishlist, basket, winningBids, bidsInWishlist, activeBids, phoneNumber, status, isVerified, lastName, userGmail, birthdayDay, birthdayMonth, birthdayYear, address, language, isAdmin, profileImage }) => {
    return jwt.sign({ id, firstName, superAdmin, wishlist, basket,winningProduct, isLogin, winningBids, bidsInWishlist, activeBids, phoneNumber, status, isVerified, lastName, userGmail, birthdayDay, birthdayMonth, birthdayYear, address, language, isAdmin, profileImage }, process.env.JWT__SECRET__KEY, {
        expiresIn: '2h'
    })
}
module.exports = UserController
