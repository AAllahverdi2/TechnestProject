import AccountSettings from "../pages/Admin/AccountSettings/Index";
import AddManagement from "../pages/Admin/AddManagement/Index";
import AddQuestions from "../pages/Admin/AddQuestions/Index";
import AddTestimonial from "../pages/Admin/AddTestimonial/Index";
import AddWinners from "../pages/Admin/AddWinners/Index";
import AdminDashboard from "../pages/Admin/AdminDashboard/Index";
import AdminLogin from "../pages/Admin/AdminLogin/Index";
import AdminRegister from "../pages/Admin/AdminRegister/Index";
import AdminRoot from "../pages/Admin/AdminRoot";
import BidHistory from "../pages/Admin/BidHistory/Index";
import Blogs from "../pages/Admin/Blogs/Index";
import ChangeAdminPass from "../pages/Admin/ChangeAdminPass/Index";
import Comments from "../pages/Admin/Comments/Index";
import CommentsDetail from "../pages/Admin/CommentsDetail/Index";
import Management from "../pages/Admin/Management/Index";
import ManagementDetail from "../pages/Admin/ManagementDetail/Index";
import ManagementEdit from "../pages/Admin/ManagementEdit/Index";
import OrderDetail from "../pages/Admin/OrderDetail/Index";
import Orders from "../pages/Admin/Orders/Index";
import PrivateAdminRoute from "../pages/Admin/PrivateAdminRoot";
import Products from "../pages/Admin/Products/Index";
import QuestionDetail from "../pages/Admin/QuestionDetail/Index";
import QuestionEdit from "../pages/Admin/QuestionEdit/Index";
import Questions from "../pages/Admin/Questions/Index";
import Subscribers from "../pages/Admin/Subscribers/Index";
import TestimonialDetail from "../pages/Admin/TestimonialDetail/Index";
import TestimonialEdit from "../pages/Admin/TestimonialEdit/Index";
import Testimonials from "../pages/Admin/Testimonials/Index";
import UserDetail from "../pages/Admin/UserDetail/Index";
import Users from "../pages/Admin/Users/Index";
import WinnerDetail from "../pages/Admin/WinnerDetail/Index";
import WinnerEdit from "../pages/Admin/WinnerEdit/Index";
import Winners from "../pages/Admin/Winners/Index";
import WinningProducts from "../pages/Admin/WinningProducts/Index";
import About from "../pages/Site/About/Index";
import Blog from "../pages/Site/Blog/Index";
import BlogDetail from "../pages/Site/BlogDetail/Index";
import Contacts from "../pages/Site/Contacts/Index";
import Dashboard from "../pages/Site/Dashboard/Index";
import Faq from "../pages/Site/Faq/Index";
import Home from "../pages/Site/Home/Index";
import MyBid from "../pages/Site/MyBid/Index";
import MyBids from "../pages/Site/MyBids/Index";
import MyFavorites from "../pages/Site/MyFavorites/Index";
import NotFound from "../pages/Site/NotFound/Index";
import OrdersTable from "../pages/Site/OrdersTable/Index";
import PersonalProfile from "../pages/Site/PersonalProfile/Index";
import Product from "../pages/Site/Product/Index";
import ProductDetail from "../pages/Site/ProductDetail/Index";
import SiteRoot from "../pages/Site/SiteRoot";
import WinningBids from "../pages/Site/WinningBids/Index";
import WinningProductDetail from "../pages/Site/WinningProductDetail/Index";
export const ROUTER = [
    {
        path: '/',
        element: <SiteRoot />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'product',
                element: <Product />
            },
            {
                path: 'product/:id',
                element: <ProductDetail />
            },
            {
                path: "blog",
                element: <Blog />
            },
            {
                path: 'blog/:id',
                element: <BlogDetail />
            },
            {
                path: 'contacts',
                element: <Contacts />
            },
            {
                path: 'faq',
                element: <Faq />
            },
            {
                path: 'dashboard',
                element: <Dashboard />
            },

            {
                path: 'myProducts',
                element: <MyBids />
            },
            {
                path: 'myFavorites',
                element: <MyFavorites />
            },
            {
                path: 'personalProfile',
                element: <PersonalProfile />
            },
            {
                path: 'winningBids',
                element: <WinningBids />
            },
            {
                path: 'myBid',
                element: <MyBid />
            },
            {
                path: 'winningBids/:id',
                element: <WinningProductDetail />
            },
            {
                path: 'myOrders',
                element: <OrdersTable />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminRoot />,
        children: [
            {
                path: '',
                element: <PrivateAdminRoute element={AdminDashboard} />
            },
            {
                path: 'addTestimonial',
                element: <PrivateAdminRoute element={AddTestimonial} />
            },
            {
                path: 'testimonialsTable',
                element: <PrivateAdminRoute element={Testimonials} />
            },
            {
                path: 'testimonialDetail/:id',
                element: <PrivateAdminRoute element={TestimonialDetail} />
            },
            {
                path: 'testimonialEdit/:id',
                element: <PrivateAdminRoute element={TestimonialEdit} />
            },
            {
                path: 'addQuestions',
                element: <PrivateAdminRoute element={AddQuestions} />
            },
            {
                path: 'questionsTable',
                element: <PrivateAdminRoute element={Questions} />
            },
            {
                path: 'questionDetail/:id',
                element: <PrivateAdminRoute element={QuestionDetail} />
            },
            {
                path: 'questionEdit/:id',
                element: <PrivateAdminRoute element={QuestionEdit} />
            },
            {
                path: 'winnersTable',
                element: <PrivateAdminRoute element={Winners} />
            },
            {
                path: 'addWinners',
                element: <PrivateAdminRoute element={AddWinners} />
            }
            ,
            {
                path: 'winnerDetail/:id',
                element: <PrivateAdminRoute element={WinnerDetail} />
            },
            {
                path: 'winnerEdit/:id',
                element: <PrivateAdminRoute element={WinnerEdit} />
            },
            {
                path: 'managementTable',
                element: <PrivateAdminRoute element={Management} />
            },
            {
                path: 'addManagement',
                element: <PrivateAdminRoute element={AddManagement} />
            },
            {
                path: 'managementDetail/:id',
                element: <PrivateAdminRoute element={ManagementDetail} />
            },
            {
                path: 'managementEdit/:id',
                element: <PrivateAdminRoute element={ManagementEdit} />
            },
            {
                path: 'users',
                element: <PrivateAdminRoute element={Users} />
            },
            {
                path: 'userDetail/:id',
                element: <PrivateAdminRoute element={UserDetail} />
            },
            {
                path: 'loginAdmin',
                element: <AdminLogin />
            },
            {
                path: 'changeAdminPass',
                element: <PrivateAdminRoute element={ChangeAdminPass} />
            },
            {
                path: 'accountSettings/:id',
                element: <PrivateAdminRoute element={AccountSettings} />
            },
            {
                path: 'adminRegister',
                element: <AdminRegister />
            },
            {
                path: 'products',
                element: <PrivateAdminRoute element={Products} />
            },
            {
                path: 'bidHistory',
                element: <PrivateAdminRoute element={BidHistory} />
            },
            {
                path: 'winningProducts',
                element: <PrivateAdminRoute element={WinningProducts} />
            },
            {
                path: 'adminOrders',
                element: <PrivateAdminRoute element={Orders} />
            },
            {
                path: 'adminOrders/:id',
                element: <PrivateAdminRoute element={OrderDetail} />
            },
            {
                path: 'subscribers',
                element: <PrivateAdminRoute element={Subscribers} />
            },
            {
                path: 'blogs',
                element: <PrivateAdminRoute element={Blogs} />
            },
            {
                path: 'comments',
                element: <PrivateAdminRoute element={Comments} />
            },
            {
                path: 'comments/:id',
                element: <PrivateAdminRoute element={CommentsDetail} />
            }
        ]
    }
]