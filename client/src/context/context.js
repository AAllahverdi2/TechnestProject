import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser, getUserToken } from "../redux/slices/userSlice";
import { postWinningProducts } from "../redux/slices/winningProductSlice";
import toast from "react-hot-toast";
import { postOrder } from "../redux/slices/orderSlice";

const dataContext = createContext(null)


const DataContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)

    const loginRef = useRef()
    const handleOpenLoginModal = () => {
        loginRef.current.classList.add('openLogin')
    }
    const handleCloseLoginModal = () => {
        loginRef.current.classList.remove('openLogin')

    }

    const registerRef = useRef()
    const handleOpenRegisterModal = () => {
        registerRef.current.classList.add('openRegisterForm')
    }
    const handleCloseRegisterModal = () => {
        registerRef.current.classList.remove('openRegisterForm')
    }
    const adminHeadRef = useRef()
    const sideBardHeadRef = useRef()
    const handleResSideBar = () => {
        sideBardHeadRef.current.classList.toggle('resSidebarInHead')
    }
    const handleAddWidthHeader = () => {
        adminHeadRef.current.classList.toggle('activeHeadBurger')
        sideBardHeadRef.current.classList.toggle('sideBar')
    }

    const userImageModalRef = useRef()
    const handleOpenImageUpdate = () => {
        userImageModalRef.current.classList.add('openUserImageModal')
    }
    const handleCloseImageUpdate = () => {
        userImageModalRef.current.classList.remove('openUserImageModal')
    }

    const profUpdateRef = useRef()

    const handleOpenProfUpdate = () => {
        profUpdateRef.current.classList.add('openProfUpdate')

    }
    const handleCloseProfUpdate = () => {
        profUpdateRef.current.classList.remove('openProfUpdate')
    }

    const phoneRef = useRef()
    const handleUpdatePhone = () => {
        phoneRef.current.classList.add('phoneOpen')
    }
    const handleRemoveUpdatePhone = () => {
        phoneRef.current.classList.remove('phoneOpen')
    }
    const gmailRef = useRef()
    const handleUpdateGmail = () => {
        gmailRef.current.classList.add('gmailUpdateOpen')
    }
    const handleRemoveUpdateGmail = () => {
        gmailRef.current.classList.remove('gmailUpdateOpen')
    }

    const passwordModalRef = useRef()
    const handleUpdatePassword = () => {
        passwordModalRef.current.classList.add('openPasswordModal')
    }
    const handleRemoveUpdatePassword = () => {
        passwordModalRef.current.classList.remove('openPasswordModal')
    }
    const settingsUpdateRef = useRef()
    const handleOpenUpdateSettings = () => {
        settingsUpdateRef.current.classList.add('openSettingsUpdate')
    }
    const handleCloseUpdateSettings = () => {
        settingsUpdateRef.current.classList.remove('openSettingsUpdate')
    }
    const forgotRef = useRef()
    const openForgotRef = () => {
        forgotRef.current.classList.add('openForgotPassword')
    }
    const closeForgotRef = () => {
        forgotRef.current.classList.remove('openForgotPassword')
    }
    const updateRessPass = useRef()
    const openUpdatePassModal = () => {
        updateRessPass.current.classList.add('openResetPassModal')
    }
    const closeUpdatePassModal = () => {
        updateRessPass.current.classList.remove('openResetPassModal')
    }


    const prodCreateRef = useRef()
    const prodCreateModalOpen = () => {
        prodCreateRef.current.classList.add('openCreateProduct')
    }
    const prodCreateModalClose = () => {
        prodCreateRef.current.classList.remove('openCreateProduct')
    }


    const openProdUpdateRef = useRef()
    const handleOpenProductUpdate = () => {
        openProdUpdateRef.current.classList.add('openProductUpdateModal')
    }
    const handleCloseProductUpdate = () => {
        openProdUpdateRef.current.classList.remove('openProductUpdateModal')
    }

    const [notification, setNotification] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()
    const handleCompleteCount = async (users, oneProduct) => {
        const target = users.find(user => user._id == oneProduct?.bidderId)
        if (target) {
            const winnerName = `${target?.firstName} ${target?.lastName}`
            toast.success('Okkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
            await dispatch(postWinningProducts({
                winnerId: oneProduct?.bidderId,
                winnerName: winnerName,
                winnerGmail: target?.userGmail,
                product: oneProduct,
                productBidders: oneProduct

            }
            ))
        }


    }


    const openCheckout = useRef()
    const handleOpenCheckout = () => {
        openCheckout.current.classList.add('openCheckout')
    }
    const handleRemoveCheckout = () => {
        openCheckout.current.classList.remove('openCheckout')
    }

    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const blogRef = useRef()

    const handleOpenBlog = () => {
        blogRef.current.classList.add('openBlogCreate')
    }
    const handleCloseBlog = () => {
        blogRef.current.classList.remove('openBlogCreate')

    }
    const openEditRef = useRef()
    const handleOpenBlogEdit = () => {
        openEditRef.current.classList.add('openEditBlog')
    }
    const handleCloseBlogEdit = () => {
        openEditRef.current.classList.remove('openEditBlog')
    }
    const openOrderDetailRef = useRef()
    const handleOpenOrderDetail = () => {
        openOrderDetailRef.current.classList.add('openOrderDetail')
    }
    const handleCloseOrderDetail = () => {
        openOrderDetailRef.current.classList.remove('openOrderDetail')
    }
    const values = {
        loginRef, handleOpenLoginModal, handleCloseLoginModal,
        handleCloseRegisterModal, handleOpenRegisterModal, registerRef,
        sideBardHeadRef, adminHeadRef, handleAddWidthHeader, handleResSideBar,
        userImageModalRef, handleOpenImageUpdate, handleCloseImageUpdate,
        profUpdateRef, handleOpenProfUpdate, handleCloseProfUpdate
        , phoneRef, handleUpdatePhone, handleRemoveUpdatePhone,
        gmailRef, handleUpdateGmail, handleRemoveUpdateGmail,
        passwordModalRef, handleUpdatePassword, handleRemoveUpdatePassword,
        settingsUpdateRef, handleOpenUpdateSettings, handleCloseUpdateSettings,
        forgotRef, openForgotRef, closeForgotRef,
        updateRessPass, openUpdatePassModal, closeUpdatePassModal,
        prodCreateRef, prodCreateModalOpen, prodCreateModalClose,
        loading, setLoading, setNotification, notification,
        openProdUpdateRef, handleOpenProductUpdate, handleCloseProductUpdate,
        open, setOpen, handleClose, handleOpen, handleCompleteCount,
        openCheckout, handleOpenCheckout, handleRemoveCheckout,
        paymentSuccess, setPaymentSuccess,
        blogRef, handleOpenBlog, handleCloseBlog,
        openEditRef,handleOpenBlogEdit,handleCloseBlogEdit,
        openOrderDetailRef,handleOpenOrderDetail,handleCloseOrderDetail
    }
    return <dataContext.Provider value={values} >{children}</dataContext.Provider>
}

const useDataContext = () => useContext(dataContext)

export { DataContextProvider, useDataContext }