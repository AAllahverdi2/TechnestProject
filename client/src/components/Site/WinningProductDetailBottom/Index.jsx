import React, { useEffect, useRef, useState } from 'react'
import tab1 from '../../../assets/tab1.png'
import tab2 from '../../../assets/tab2.png'
import tab3 from '../../../assets/tab3.png'
import tab4 from '../../../assets/tab4.png'
import './Index.scss'
import notes from '../../../assets/notes.png'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductBids } from '../../../redux/slices/bidHistorySlice'
import { Pagination } from 'antd'
import { useTranslation } from 'react-i18next'
const WinningProductDetailBottom = () => {

    const { oneWinningProduct } = useSelector(state => state.winningProducts)

    const { questions } = useSelector(state => state.questions)
    const { productsBidHistory } = useSelector(state => state.bidHistory)
    const filteredQuestions = questions.filter(question => question.questionRating === 5);
    const dispatch = useDispatch()

    const tab1Ref = useRef()
    const tab2Ref = useRef()
    const tab3Ref = useRef()
    const tab4Ref = useRef()
    const tab1ContentRef = useRef()
    const tab2ContentRef = useRef()
    const tab3ContentRef = useRef()
    const tab4ContentRef = useRef()
    const handleActiveTab1 = () => {
        tab1Ref.current.classList.add('tabsActive2')
        tab3Ref.current.classList.remove('tabsActive2')
        tab4Ref.current.classList.remove('tabsActive2')
        tab2Ref.current.classList.remove('tabsActive2')

        tab1ContentRef.current.classList.remove('d-none')
        tab3ContentRef.current.classList.replace('d-block', 'd-none')
        tab4ContentRef.current.classList.replace('d-block', 'd-none')
        tab2ContentRef.current.classList.replace('d-block', 'd-none')
    }
    const handleActiveTab2 = () => {
        tab1Ref.current.classList.remove('tabsActive2')
        tab3Ref.current.classList.remove('tabsActive2')
        tab4Ref.current.classList.remove('tabsActive2')
        tab2Ref.current.classList.add('tabsActive2')

        tab1ContentRef.current.classList.add('d-none')
        tab3ContentRef.current.classList.replace('d-block', 'd-none')
        tab4ContentRef.current.classList.replace('d-block', 'd-none')
        tab2ContentRef.current.classList.replace('d-none', 'd-block')
    }


    const handleActiveTab3 = () => {
        tab1Ref.current.classList.remove('tabsActive2')
        tab2Ref.current.classList.remove('tabsActive2')
        tab4Ref.current.classList.remove('tabsActive2')
        tab3Ref.current.classList.add('tabsActive2')

        tab1ContentRef.current.classList.add('d-none')
        tab2ContentRef.current.classList.replace('d-block', 'd-none')
        tab4ContentRef.current.classList.replace('d-block', 'd-none')
        tab3ContentRef.current.classList.replace('d-none', 'd-block')
    }
    const handleActiveTab4 = () => {
        tab1Ref.current.classList.remove('tabsActive2')
        tab3Ref.current.classList.remove('tabsActive2')
        tab2Ref.current.classList.remove('tabsActive2')
        tab4Ref.current.classList.add('tabsActive2')

        tab1ContentRef.current.classList.add('d-none')
        tab3ContentRef.current.classList.replace('d-block', 'd-none')
        tab2ContentRef.current.classList.replace('d-block', 'd-none')
        tab4ContentRef.current.classList.replace('d-none', 'd-block')
    }


    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentItems = oneWinningProduct?.productBidders?.slice(indexOfFirstItem, indexOfLastItem);

    const totalItems = oneWinningProduct?.productBidders?.length;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const { t } = useTranslation()
    return (
        <section className='winningDetailBottomS'>
            <div className="container">
                <div className="productDetailBottomBox">
                    <div className="container">
                        <div className="productDetailContainer">
                            <div className="productDetailContainerTop animate__animated wow animate__fadeInRight">
                                <button className='detailTabs tabsActive2' onClick={handleActiveTab1} ref={tab1Ref}>
                                    <div className="detailTabsLeft">
                                        <img src={tab1} alt="tabs" />
                                    </div>
                                    <div className="detailTabsRight">
                                        {
                                            t('pages.winningBidsDetail.bottomSection.box1.title')
                                        }
                                    </div>
                                </button>
                                <button className='detailTabs' onClick={handleActiveTab2} ref={tab2Ref}>
                                    <div className="detailTabsLeft">
                                        <img src={tab2} alt="tabs" />
                                    </div>
                                    <div className="detailTabsRight">
                                        {
                                            t('pages.winningBidsDetail.bottomSection.box2.title')
                                        }
                                    </div>
                                </button>
                                <button className='detailTabs' onClick={handleActiveTab3} ref={tab3Ref}>
                                    <div className="detailTabsLeft">
                                        <img src={tab3} alt="tabs" />
                                    </div>
                                    <div className="detailTabsRight">
                                        {
                                            t('pages.winningBidsDetail.bottomSection.box3.title')
                                        } ({oneWinningProduct?.productBidders?.length})
                                    </div>
                                </button>
                                <button className='detailTabs' onClick={handleActiveTab4} ref={tab4Ref}>
                                    <div className="detailTabsLeft">
                                        <img src={tab4} alt="tabs" />
                                    </div>
                                    <div className="detailTabsRight">
                                        {
                                            t('pages.winningBidsDetail.bottomSection.box4.title')
                                        }
                                    </div>
                                </button>
                            </div>
                            <div className="productDetailContainerBottom1 animate__animated wow animate__fadeInLeft" ref={tab1ContentRef}>
                                <h5 className='tabContent'>
                                    {
                                        t('pages.winningBidsDetail.bottomSection.box1.text')
                                    }
                                </h5>
                                <div className="col-lg-8">
                                    <div className="productDetailBotDesc">
                                        <p>
                                            {
                                                oneWinningProduct?.product && oneWinningProduct.product[0]
                                                    ? oneWinningProduct.product[0].productDescription
                                                    : 'Product description not available'
                                            }                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="productDetailContainerBottom2 d-none animate__animated wow animate__fadeInRight" ref={tab2ContentRef}>
                                <h5 className='tabContent'>
                                    <th>
                                        {
                                            t('pages.winningBidsDetail.bottomSection.box2.text')
                                        }
                                    </th>
                                </h5>
                                <div className="col-lg-8">
                                    <div className="productDescTable">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        {
                                                            t('pages.winningBidsDetail.bottomSection.box2.table.thead.th1')
                                                        }
                                                    </th>
                                                    <th>
                                                        {
                                                            t('pages.winningBidsDetail.bottomSection.box2.table.thead.th2')
                                                        }
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="firstTr">
                                                    <td>
                                                        {
                                                            t('pages.winningBidsDetail.bottomSection.box2.table.tbody.th1')
                                                        }
                                                    </td>
                                                    <td>: $0.00</td>
                                                </tr>
                                                <tr className="secondTr">
                                                    <td>  {
                                                        t('pages.winningBidsDetail.bottomSection.box2.table.tbody.th2')
                                                    }</td>
                                                    <td>:   {
                                                        t('pages.winningBidsDetail.bottomSection.box2.table.tbody.th3')
                                                    }</td>
                                                </tr>
                                                <tr className="firstTr">
                                                    <td>
                                                        {
                                                            t('pages.winningBidsDetail.bottomSection.box2.table.tbody.th4')
                                                        }
                                                    </td>
                                                    <td>: $0.00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="productDescNote  mt-4 d-flex align-items-center">
                                        <div className="productDescNoteLeft">
                                            <img src={notes} alt="notes" />
                                        </div>
                                        <div className="productDescNoteRight">
                                            <h3>
                                                {
                                                    t('pages.winningBidsDetail.bottomSection.box2.note.title')
                                                }
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="productDescNoteP">
                                        <p>
                                            {
                                                t('pages.winningBidsDetail.bottomSection.box2.note.p')
                                            }


                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="productDetailContainerBottom3 d-none animate__animated wow animate__fadeInLeft" ref={tab3ContentRef}>
                                <h5 className='tabContent'>
                                    {
                                        t('pages.winningBidsDetail.bottomSection.box3.text')
                                    }
                                </h5>
                                <div className="col-lg-8">
                                    <div className="descriptionBidTable">
                                        {
                                            oneWinningProduct?.productBidders?.length == 0 ? <p className='noBidder'>No bidders for this product yet.</p> : <table className='descriptionBidTableInside'>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            {
                                                                t('pages.winningBidsDetail.bottomSection.box3.table.th1')
                                                            }
                                                        </th>
                                                        <th>
                                                            {
                                                                t('pages.winningBidsDetail.bottomSection.box3.table.th2')
                                                            }
                                                        </th>
                                                        <th>
                                                            {
                                                                t('pages.winningBidsDetail.bottomSection.box3.table.th3')
                                                            }
                                                        </th>
                                                        <th>
                                                            {
                                                                t('pages.winningBidsDetail.bottomSection.box3.table.th4')
                                                            }
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentItems?.map((item, index) => {
                                                            return <tr key={index} className="aboutBidTr1">
                                                                <td className="tdFirst d-flex align-items-center">
                                                                    <div className="tdFirstIcon">
                                                                        <img src={`http://localhost:5050/public/${item.bidHistoryProfImage}`} alt="bidUser" />
                                                                    </div>
                                                                    <span>
                                                                        {item.bidderName}
                                                                    </span>
                                                                </td>
                                                                <td>{moment(item.createdAt).format('MM/DD/YYYY')}
                                                                </td>
                                                                <td>
                                                                    {moment(item.createdAt).format(' hh:mm:ss A')}

                                                                </td>
                                                                <td>${item.productBidPrice}</td>
                                                            </tr>
                                                        })
                                                    }


                                                </tbody>
                                            </table>
                                        }

                                    </div>
                                    <div style={{ display: oneWinningProduct?.productBidders?.length > 8 ? '' : "none" }} className="productFilterSectionBottom mt-4">
                                        <Pagination defaultCurrent={1}
                                            current={currentPage}
                                            pageSize={pageSize}
                                            total={totalItems}
                                            onChange={handlePageChange}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="productDetailContainerBottom4 d-none animate__animated wow animate__fadeInRight" ref={tab4ContentRef}>
                                <h5 className='tabContent'>

                                    {
                                        t('pages.winningBidsDetail.bottomSection.box4.text')
                                    }
                                </h5>
                                <div className="col-lg-8 mt-4">
                                    <div className="productDetailQuestion">
                                        <div className="prodDetailQuestionsBox">
                                            <div className="accordion accordion-flush" id="accordionFlushExample">

                                                {
                                                    filteredQuestions?.map((item, index) => {
                                                        return <React.Fragment key={index}>

                                                            <div className="accordion-item">
                                                                <h2 className="accordion-header">
                                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapseOne${index + 20}`} aria-expanded="false" aria-controls="flush-collapseOne">
                                                                        {
                                                                            item.questionTitle}
                                                                    </button>
                                                                </h2>
                                                            </div>
                                                            <div id={`flush-collapseOne${index + 20}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                                <div className="accordion-body">
                                                                    <p>
                                                                        {
                                                                            item.questionContent}                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </React.Fragment>
                                                    })
                                                }






                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WinningProductDetailBottom
