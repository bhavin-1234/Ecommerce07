import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import ReactStars from 'react-rating-stars-component';
import ProductCard from '../components/ProductCard';
// import Color from '../components/Color';
import watch from '../images/watch.jpg';
import gr from '../images/gr.svg';
import gr2 from '../images/gr2.svg';
import gr3 from '../images/gr3.svg';
import gr4 from '../images/gr4.svg';
import Container from '../components/Container';
import { getProducts } from '../features/products/productSlice';

const OurStore = () => {
    const dispatch = useDispatch();
    const [grid, setGrid] = useState(4);



    const productState = useSelector((state) => state.product.products);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [category, setCategory] = useState(null);
    const [brand, setBrand] = useState(null);
    const [tag, setTag] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [sort, setSort] = useState(null);



    useEffect(() => {
        dispatch(getProducts({ sort, category, brand, tag, minPrice, maxPrice }));
    }, [sort, category, brand, tag, minPrice, maxPrice]);

    useEffect(() => {
        let newBrands = [];
        let newCategories = [];
        let newTags = [];
        let newColors = [];
        for (let index = 0; index < productState.length; index++) {
            const element = productState[index];
            newBrands.push(element?.brand);
            newCategories.push(element?.category);
            newTags.push(element?.tag);
            newColors.push(element?.color);
        }
        setBrands([...new Set(newBrands)]);
        setCategories([...new Set(newCategories)]);
        setTags([...new Set(newTags)]);
    }, [productState]);

    return (
        <>
            <Meta title='Oue Store' />
            <BreadCrumb title='Our Store' />
            <Container class1='store-wrapper home-wrapper-2 py-5'>
                <div className='row'>
                    <div className='col-3'>
                        <div className='filter-card mb-3'>
                            <h3 className='filter-title'>Shop By Categories</h3>
                            <div>
                                <ul className='ps-0'>
                                    {categories?.map((cat, index) => (
                                        <li
                                            key={index}
                                            onClick={() => setCategory(cat)}
                                            className={`text-capitalize rounded-3 ps-2 tree ${category === cat ? 'active' : ''
                                                }`}
                                        >
                                            {cat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className='filter-card mb-3'>
                            <h3
                                className='filter-title'
                                alt='asdfasdf'
                            >
                                Filter By
                            </h3>
                            <div>
                                {/* <h5 className="sub-title">Availability</h5>
                                <div>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" value="" id="inStock" />
                                        <label htmlFor="inStock" className="form-check-label">In Stock (1) </label>
                                    </div>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" value="" id="outOfStock" />
                                        <label htmlFor="outOfStock" className="form-check-label">Out of Stock (0)</label>
                                    </div>
                                </div> */}
                                <h5 className='sub-title'>Price</h5>
                                <div className='d-flex align-items-center gap-10'>
                                    $
                                    <div className='form-floating'>
                                        <input
                                            type='number'
                                            className='form-control'
                                            id='floatingInput'
                                            placeholder='From'
                                            onChange={(e) => setMinPrice(e.target.value)}
                                            value={minPrice}
                                        />
                                        <label htmlFor='floatingInput'>From</label>
                                    </div>
                                    $
                                    <div className='form-floating'>
                                        <input
                                            type='number'
                                            className='form-control'
                                            id='floatingInput1'
                                            placeholder='To'
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                            value={maxPrice}
                                        />
                                        <label htmlFor='floatingInput1'>To</label>
                                    </div>
                                </div>

                                {/* <h5 className="sub-title">Size</h5>
                                <div>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" value="" id="size-1" />
                                        <label htmlFor="size-1" className="form-check-label">S (2) </label>
                                    </div>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" value="" id="size-2" />
                                        <label htmlFor="size-2" className="form-check-label">M (0)</label>
                                    </div>
                                </div> */}
                            </div>
                            <div className='my-4'>
                                <h3 className='sub-title'>Brands</h3>
                                <div>
                                    <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                                        {brands?.map((item, index) => (
                                            <span
                                                className={`badge bg-light tree text-capitalize text-secondary rounded-3 py-2 px-3 ${brand === item ? 'active' : ''
                                                    } `}
                                                style={{ cursor: 'pointer' }}
                                                key={index}
                                                onClick={() => setBrand(item)}
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='my-4'>
                                <h3 className='sub-title'>Product Tags</h3>
                                <div>
                                    <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                                        {tags?.map((item, index) => (
                                            <span
                                                className={`badge bg-light tree text-capitalize text-secondary rounded-3 py-2 px-3 ${tag === item ? 'active' : ''
                                                    } `}
                                                style={{ cursor: 'pointer' }}
                                                key={index}
                                                onClick={() => setTag(item)}
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='filter-card mb-3'>
                            <h3 className='filter-title'>Random Product</h3>
                            <div>
                                <div className='random-products mb-3 d-flex'>
                                    <div className='w-50'>
                                        <img
                                            src={watch}
                                            className='img-fluid'
                                            alt='watch'
                                        />
                                    </div>
                                    <div className='w-50'>
                                        <h5>
                                            Kids Headphones bulk 10 pack multi colored for students
                                        </h5>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            activeColor='#ffd700'
                                            value={3}
                                            edit={false}
                                        />
                                        <b>$100.00</b>
                                    </div>
                                </div>
                                <div className='random-products d-flex'>
                                    <div className='w-50'>
                                        <img
                                            src={watch}
                                            className='img-fluid'
                                            alt='watch'
                                        />
                                    </div>
                                    <div className='w-50'>
                                        <h5>
                                            Kids Headphones bulk 10 pack multi colored for students
                                        </h5>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            activeColor='#ffd700'
                                            value={3}
                                            edit={false}
                                        />
                                        <b>$100.00</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-9'>
                        <div className='filter-sort-grid mb-4'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='d-flex align-items-center gap-10'>
                                    <p
                                        className='mb-0 d-block'
                                        style={{ width: '100px' }}
                                    >
                                        Sort By:
                                    </p>
                                    <select
                                        name='sort'
                                        className='form-select'
                                        value={sort}
                                        onChange={(e) => setSort(e.target.value)}
                                    >
                                        {/* <option value="manual">Featured</option> */}
                                        {/* <option value="best-selling">Best Selling</option> */}
                                        <option value='title'>Alphabetically, A-Z</option>
                                        <option value='-title'>
                                            Alphabetically, Z-A
                                        </option>
                                        <option value='price'>Price, low to high</option>
                                        <option value='-price'>Price, high to low</option>
                                        <option value='createdAt'>Date, old to new</option>
                                        <option value='-createdAt'>Date, new to old</option>
                                    </select>
                                </div>
                                <div className='d-flex align-items-center gap-10'>
                                    <p className='total-products mb-0'>21 Products</p>
                                    <div className='d-flex gap-10 align-items-center grid'>
                                        <img
                                            src={gr4}
                                            onClick={() => {
                                                setGrid(3);
                                            }}
                                            className='d-block img-fluid'
                                            alt='grid'
                                        />
                                        <img
                                            src={gr3}
                                            onClick={() => {
                                                setGrid(4);
                                            }}
                                            className='d-block img-fluid'
                                            alt='grid'
                                        />
                                        <img
                                            src={gr2}
                                            onClick={() => {
                                                setGrid(6);
                                            }}
                                            className='d-block img-fluid'
                                            alt='grid'
                                        />
                                        <img
                                            src={gr}
                                            onClick={() => {
                                                setGrid(12);
                                            }}
                                            className='d-block img-fluid'
                                            alt='grid'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='products-list pb-5'>
                            <div className='d-flex flex-wrap align-items-center gap-10'>
                                <ProductCard
                                    data={productState}
                                    grid={grid}
                                />
                                {/* <ProductCard data={productState.filter(el => el.tag === "popular")} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default OurStore;
