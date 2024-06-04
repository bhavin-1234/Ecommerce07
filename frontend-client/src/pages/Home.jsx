import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Meta from "../components/Meta";
import mainBanner1 from '../images/main-banner-1.jpg';
import catBanner01 from '../images/catbanner-01.jpg';
import catBanner02 from '../images/catbanner-02.jpg';
import catBanner03 from '../images/catbanner-03.jpg';
import catBanner04 from '../images/catbanner-04.jpg';
import service from '../images/service.png';
import service02 from '../images/service-02.png';
import service03 from '../images/service-03.png';
import service04 from '../images/service-04.png';
import service05 from '../images/service-05.png';
import camera from '../images/camera.jpg';
import tv from '../images/tv.jpg';
import headphone from '../images/headphone.jpg';
import famous01 from '../images/famous-01.webp';
import famous02 from '../images/famous-02.webp';
import famous03 from '../images/famous-03.webp';
import famous04 from '../images/famous-04.webp';
import brand01 from '../images/brand-01.png';
import brand02 from '../images/brand-02.png';
import brand03 from '../images/brand-03.png';
import brand04 from '../images/brand-04.png';
import brand05 from '../images/brand-05.png';
import brand06 from '../images/brand-06.png';
import brand07 from '../images/brand-07.png';
import brand08 from '../images/brand-08.png';
import Container from "../components/Container";
import { services } from "../components/Data";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../features/blogs/blogSlice";
import { useEffect } from "react";
import moment from "moment";
import { getProducts } from "../features/products/productSlice";





const getServicesImages = (index) => {
  switch (index) {
    case 0: return service;
    case 1: return service02;
    case 2: return service03;
    case 3: return service04;
    case 4: return service05;
    default: return '';
  }
}


const Home = () => {


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
    dispatch(getProducts());
  }, []);

  const blogState = useSelector(state => state.blog?.blogs?.allBlog);
  const productState = useSelector(state => state.product.products);




  return (
    <>


      <Meta title="Home" />



      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative">
              <img
                src={mainBanner1}
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>From $999.00 or $41.62/mo.</p>
                <Link className="button">BUY NOW</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img
                  src={catBanner01}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>BEST SALE</h4>
                  <h5>Laptops Max</h5>
                  <p>
                    From $1699.00 or
                    <br /> $64.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src={catBanner02}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>Buy IPad Air</h5>
                  <p>
                    From $599.00 or <br />
                    $49.91/mo. for 12 mo.*
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src={catBanner03}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>15% OFF</h4>
                  <h5>Smartwatch 7</h5>
                  <p>
                    Shop the latest band
                    <br />
                    styles and colors.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src={catBanner04}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>FREE ENGRAVING</h4>
                  <h5>AirPods Max</h5>
                  <p>
                    High-fidelity playback &<br />
                    ultra-low distortion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>



      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {services.map((service, index) => {
                return <div className="d-flex align-items-center gap-15" key={index}>
                  <img src={getServicesImages(index)} alt="services" />
                  <div>
                    <h6>{service.title}</h6>
                    <p className="mb-0">{service.tagLine}</p>
                  </div>
                </div>
              })}
            </div>
          </div>
        </div>
      </Container>



      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex flex-wrap justify-content-between align-items-center">
              <div className="d-flex align-items-center gap">
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src={camera} alt="camera" />
              </div>
              <div className="d-flex align-items-center gap">
                <div>
                  <h6>Smart TV</h6>
                  <p>10 Items</p>
                </div>
                <img src={camera} alt="camera" />
              </div>
              <div className="d-flex align-items-center gap">
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src={tv} alt="tv" />
              </div>
              <div className="d-flex align-items-center gap">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src={headphone} alt="headphone" />
              </div>
              <div className="d-flex align-items-center gap">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src={camera} alt="camera" />
              </div>
              <div className="d-flex align-items-center gap">
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src={camera} alt="camera" />
              </div>
              <div className="d-flex align-items-center gap">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src={tv} alt="tv" />
              </div>
              <div className="d-flex align-items-center gap">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src={headphone} alt="headphone" />
              </div>
            </div>
          </div>
        </div>
      </Container>




      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          <div className="row">
            <ProductCard data={productState.filter(el => el.tag === "featured")} />
          </div>
        </div>
      </Container>



      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src={famous01} className="img-fluid" alt="famous" />
              <div className="famous-content position-absolute">
                <h5 className="text-white">Big Screen</h5>
                <h6 className="text-white">Smart Watch Series 7</h6>
                <p className="text-white">From $399or $16.62/mo. for 24 mo.<sup>*</sup></p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src={famous02} className="img-fluid" alt="famous" />
              <div className="famous-content position-absolute">
                <h5>Studio Display</h5>
                <h6>600 nits of brightnes</h6>
                <p>27-inch 5K Retina display</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src={famous03} className="img-fluid" alt="famous" />
              <div className="famous-content position-absolute">
                <h5>SMARTPHONES</h5>
                <h6>Smartphone 13 Pro.</h6>
                <p>Now in Green. From $999.00 or $41.62/mo. for 24 mo. Footnote<sup>*</sup></p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src={famous04} className="img-fluid" alt="famous" />
              <div className="famous-content position-absolute">
                <h5>HOME SPEAKERS</h5>
                <h6>Room-filling sound.</h6>
                <p>From $699 or $116.58/mo. for 12 mo.<sup>*</sup></p>
              </div>
            </div>
          </div>
        </div>
      </Container>











      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">
              Special Products
            </h3>
          </div>
        </div>
        <div className="row">
          {productState.map((product, index) => {
            if (product.tag === "special") {
              return (
                <SpecialProduct
                  key={index}
                  id={product?._id}
                  title={product?.title}
                  brand={product?.brand}
                  price={product?.price}
                  totalRating={Number(product?.totalRating)}
                  sold={product?.sold}
                  quantity={product?.quantity}

                />
              )
            }
          }
          )}
        </div>
      </Container>














      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard data={productState.filter(el => el.tag === "popular")} />
          {/* {productState.map((product, index, array) => {
            if (product.tag === "popular") {
              return (
                <ProductCard
                  key={index}
                  // title={product?.title}
                  // brand={product?.brand}
                  // price={product?.price}
                  // totalRating={Number(product?.totalRating)}
                  // sold={product?.sold}
                  // quantity={product?.quantity}
                  data={array?.filter((el) => el?.tag === "popular")}
                />
              )
            }
          }
          )} */}
        </div>
      </Container>







      <Container class1="marque-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src={brand01} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand02} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand03} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand04} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand05} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand06} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand07} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand08} alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
        </div>
        <div className="row">
          {/* <div className="col-3"><BlogCard /></div>
          <div className="col-3"><BlogCard /></div>
          <div className="col-3"><BlogCard /></div>
          <div className="col-3"><BlogCard /></div> */}
          {blogState?.map((blog, index) => {
            if (index < 4) {
              return <div key={index} className="col-3">
                <BlogCard
                  id={blog?._id}
                  date={moment(blog?.createdAt).format("MMMM Do YYYY, h:mm a")}
                  title={blog?.title}
                  description={blog?.description.substr(0, 70) + "..."}
                  image={blog?.images[0]?.url}
                />
              </div>
            }
          })}
        </div>
      </Container>
    </>
  );
};

export default Home;
