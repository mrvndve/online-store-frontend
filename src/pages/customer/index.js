import React, { Fragment } from 'react';

import useCustomerHome from '../../hooks/use-customer-home';

import { 
  Button, 
  Card, 
  ProductCard,
  SlickSlider,
} from '../../components';

import { Carousel } from 'react-responsive-carousel';

import { 
  PRIMARY_COLOR, 
  PRIMARY_COLOR_YELLOW,
} from '../../utils';

import { 
  ShoppingCart,
} from '@mui/icons-material';

const Title = ({ 
  text, 
  color = PRIMARY_COLOR.txtColor,
}) => (
  <h3>
    <strong style={{ color }}>
      {text}
    </strong>
  </h3>
);

const BannerCarousel = ({
  images,
}) => (
  <>
    <Carousel
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      infiniteLoop
      autoPlay
      swipeable
      emulateTouch
    >
      {images && images.map((i, index) => (
        <Fragment key={index}>
          <img 
            style={{ 
              objectFit: 'fill',
              objectPosition: 'bottom',
              maxWidth: '100%', 
              height: 300,
            }} 
            src={`${process.env.PUBLIC_URL}/images/${i}`} 
          />
        </Fragment>
      ))}
    </Carousel>
  </>
)

const Banner = ({ navigate }) => {
  const carousel = [
    'BannerMonitor.png',
    'BannerMonitor.png',
    'BannerMonitor.png',
  ];

  return <>
    <div className='row g-4'>
      <div className='col-sm-12 col-md-12 col-lg-12 col-xl-8'>
        <Card
          className='customer-card'
          style={{ 
            backgroundColor: PRIMARY_COLOR.bgColor,
            color: PRIMARY_COLOR.txtColor
          }}
        >
          <div className='row gy-5'>
            <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6'>
              <div className='mb-3'>
                <Title text='Umal Marketing'/>
              </div>

              <div className='mb-5'>
                <Title text='Serving Technology better'/>
              </div>

              <div>
                <Button
                  label='Shop Now'
                  startIcon={<ShoppingCart/>}
                  style={{
                    backgroundColor: PRIMARY_COLOR_YELLOW.bgColor,
                    color: PRIMARY_COLOR_YELLOW.txtColor,
                  }}
                  onClick={() => navigate('/collections')}
                />
              </div>
            </div>

            <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6'>
              <BannerCarousel {...{ images: carousel }}/>
            </div>
          </div>
        </Card>
      </div>

      <div className='col-sm-12 col-md-12 col-lg-12 col-xl-4'>
        <div className='h-100'>
          <Card
            className='customer-card'
            style={{ 
              backgroundColor: PRIMARY_COLOR_YELLOW.bgColor,
              color: PRIMARY_COLOR_YELLOW.txtColor,
              height: '100%',
            }}
          >
            <BannerCarousel {...{ images: carousel }}/>
          </Card>
        </div>
      </div>
    </div>
  </>
};

const ShopByCategory = ({ categories, navigate }) => {
  return <>
    <div id='nav-categories'>
      <Card className='customer-card'>
        <Title text='Shop by Category' color='black'/>

        <div className='mt-5'>
          <SlickSlider>
            {categories && categories.map((i, index) => (
              <Fragment key={index}>
                <Card 
                  className='home-shop-by-category-card mx-4'
                  onClick={() => navigate(`/collections?filterByCategories=${i.name}`)}
                >
                  <h4>
                    <strong>
                      {i.name}
                    </strong>
                  </h4>
                </Card>
              </Fragment>
            ))}
          </SlickSlider>
        </div>
      </Card>
    </div>
  </>
};

const NewArrivals = ({ 
  products,
  addRemoveToWishList,
  addToCart,
}) => {
  return <>
    <div id='nav-new-arrivals'>
      <Card className='customer-card'>
        <Title text='New Arrivals' color='black'/>

        <div className='mt-5'>
          <SlickSlider>
            {products && products.map((product, index) => (
              <Fragment key={index}>
                <div className='mx-4' style={{ padding: 1 }}>
                  <ProductCard {...{ 
                    product, 
                    addRemoveToWishList,
                    addToCart,
                  }}/>
                </div>
              </Fragment>
            ))}
          </SlickSlider>
        </div>
      </Card>
    </div>
  </>
};

const FeaturedProducts = ({ 
  products,
  addRemoveToWishList,
  addToCart,
}) => {
  return <>
    <div id='nav-featured-products'>
      <Card className='customer-card'>
        <Title text='Featured Products' color='black'/>

        <div className='mt-5'>
          <SlickSlider>
            {products && products.map((product, index) => (
              <Fragment key={index}>
                <div className='mx-4' style={{ padding: 1 }}>
                  <ProductCard {...{ 
                    product,
                    addRemoveToWishList,
                    addToCart,
                  }}/>
                </div>
              </Fragment>
            ))}
          </SlickSlider>
        </div>
      </Card>
    </div>
  </>
};

const CustomerPage = () => {
  const {
    categories,
    newArrivalProducts,
    featuredProducts,
    addRemoveToWishList,
    addToCart,
    navigate,
  } = useCustomerHome();

  return <>
    <div>
      <div className='mb-5'>
        <Banner {...{ navigate }}/>
      </div>

      <div className='mb-5'>
        <ShopByCategory {...{ categories, navigate }}/>
      </div>

      <div className='mb-5'>
        <NewArrivals {...{ 
          products: newArrivalProducts,
          addRemoveToWishList,
          addToCart,
        }}/>
      </div>

      <div className='mb-5'>
        <FeaturedProducts {...{ 
          products: featuredProducts,
          addRemoveToWishList,
          addToCart,
        }}/>
      </div>
    </div>
  </>
};

export default CustomerPage;