import React, { useState } from 'react'
import './Index.scss'
import { IoSearch } from "react-icons/io5";
import LatestAuctionCard from '../Cards/LatestAuctionCard/Index';
import { Pagination } from 'antd';
import ProductFilterSectionCard from '../Cards/ProductFilterSectionCard/Index';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts, searchProducts2, sortProducts } from '../../../redux/slices/producSlice';
import { useTranslation } from 'react-i18next';
const ProductFilterSection = () => {
    const { products } = useSelector(state => state.products)
    const productsPerPage = 6;

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(products.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const dispathc = useDispatch()
    const { t } = useTranslation()

    return (
        <section className='productFilterSection'>
            <div className="container">
                <div className="productFilterSectionTop">
                    <div className="productFilterLeft">
                        <div className="productFilterLeftInside">
                            <p>
                                {
                                    t('pages.product.productFilterSection.sortText')
                                }
                            </p>
                            <select className='form-select' onChange={(e) => {
                                dispathc(sortProducts(e.target.value))
                            }}>
                                <option value="df">

                                    {
                                        t('pages.product.productFilterSection.selectOption.op1')
                                    }
                                </option>
                                <optgroup label={t('pages.product.productFilterSection.selectOption.label1')}>
                                    <option value="A-Z">A-Z</option>
                                    <option value="Z-A">Z-A</option>
                                </optgroup>
                                <optgroup label={t('pages.product.productFilterSection.selectOption.label2')}>
                                    <option value="0-9">0-9</option>
                                    <option value="9-0">9-0</option>
                                </optgroup>
                                <optgroup label={t('pages.product.productFilterSection.selectOption.label3')}>
                                    <option value="Electronic">
                                        {
                                            t('pages.product.productFilterSection.selectOption.op2')
                                        }
                                    </option>
                                    <option value="Jewelry">
                                        {
                                            t('pages.product.productFilterSection.selectOption.op3')
                                        }
                                    </option>
                                    <option value="Car">
                                        {
                                            t('pages.product.productFilterSection.selectOption.op4')
                                        }
                                    </option>
                                </optgroup>
                                <optgroup label={t('pages.product.productFilterSection.selectOption.label4')}>
                                    <option value="Latest">  {
                                        t('pages.product.productFilterSection.selectOption.op5')
                                    }</option>
                                    <option value="Oldest">
                                        {
                                            t('pages.product.productFilterSection.selectOption.op6')
                                        }
                                    </option>
                                </optgroup>
                                <optgroup label={t('pages.product.productFilterSection.selectOption.label5')}>
                                    <option value="EndingSoon">
                                        {
                                            t('pages.product.productFilterSection.selectOption.op7')
                                        }
                                    </option>
                                    <option value="EndingLater">
                                        {
                                            t('pages.product.productFilterSection.selectOption.op8')
                                        }
                                    </option>
                                </optgroup>
                            </select>
                        </div>
                    </div>
                    <div className="productFilterRight">
                        <form action="#">
                            <input type="text" placeholder={t('pages.product.productFilterSection.searchInput')} onChange={(e) => {
                                dispathc(searchProducts2(e.target.value))
                            }} />
                            <IoSearch />

                        </form>
                    </div>
                </div>
                <div className="productFilterSectionMiddle">
                    <div className="row">
                        {
                            currentProducts?.map((item, index) => {
                                return <div key={index} className='col-lg-4 col-md-6 wow animate__animated animate__fadeInUp' data-wow-delay={`${(index / 10) + 0.1}s`}>
                                    <ProductFilterSectionCard index={index} item={item} />
                                </div>
                            })
                        }

                    </div>
                </div>
                <div style={{ display: products.length > 6 ? '' : "none" }} className="productFilterSectionBottom">
                    <Pagination defaultCurrent={1}
                        total={products.length}
                        pageSize={productsPerPage}
                        current={currentPage}
                        onChange={handlePageChange} />
                </div>
            </div>
        </section>
    )
}

export default ProductFilterSection
