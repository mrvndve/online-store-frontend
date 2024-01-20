import { Fragment } from 'react';

import { 
  Button,
  Card,
  QuantityTextField,
  ProductCard,
  EmptyBanner,
  SlickSlider,
} from '../../../components';

import { 
  imgBaseUrl, 
  withCommasAndDecimal,
} from '../../../utils';

import { Carousel } from 'react-responsive-carousel';

import { 
  Rating,
  Box,
  Typography,
  Chip,
  IconButton,
} from '@mui/material';

import { isEmpty, isUndefined } from 'lodash';

import useCustomerViewProduct from '../../../hooks/use-customer-view-product';

import { 
  Favorite, 
  FavoriteBorder, 
  ShoppingCart,
} from '@mui/icons-material';

import { useNavigate } from 'react-router';

const PriceWithDiscountComponent = ({sellerPrice, promotion}) => {
  const productDiscount = promotion.discountPercent / 100;
  const priceWithDiscount = withCommasAndDecimal((sellerPrice - (sellerPrice * productDiscount)).toFixed(2));

  return <>
    <Typography 
      color='text.primary' 
      fontWeight={600}
      style={{ fontSize: 20 }}
    >
      <span className='me-2'>₱ {priceWithDiscount}</span> 

      <span style={{ 
        color: 'lightgrey', 
        textDecoration: 'line-through',
      }}>
        ₱ {withCommasAndDecimal(sellerPrice)}
        </span>
    </Typography>
  </>
};

const ProductSection = ({ 
  product,
  handleSelectVariant,
  selectedVariant,
  addRemoveToWishList,
  addToCart,
  buyNow,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleQuantityChange,
  handleQuantityBlur,
  handleQuantitykeyPress,
  quantity,
}) => {
  const {
    images,
    name,
    subName,
    promotion,
    sellerPrice,
    variations,
    skuCode,
    categories,
    tags,
    stocks,
    branch,
    brand,
    rating,
  } = product;

  const hasVariationPrice = (!isEmpty(selectedVariant) && selectedVariant.addOnsPrice > 0);

  return <>
    <div className='row gx-5 gy-4'>
      <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6'>
        <Carousel
          showArrows={false}
          showStatus={false}
          showThumbs={true}
          infiniteLoop
          autoPlay
          swipeable
          emulateTouch
          dynamicHeight={true}
        >
          {images && images.map((i, index) => (
            <Fragment key={index}>
              <img 
                style={{
                  padding: 20,
                  backgroundColor: 'lightgrey',
                  objectFit: 'fill',
                  objectPosition: 'bottom',
                  maxWidth: '100%',
                }} 
                src={`${imgBaseUrl}/${i.fileName}`} 
              />
            </Fragment>
          ))}
        </Carousel>

        <div className='mt-1'>
          <span 
            style={{ 
              fontWeight: 'bold',
              fontSize: 20,
              cursor: 'pointer',
            }}
            onClick={() => addRemoveToWishList(product)}
          >
            {!product.isAddedToWishLists
              ? (
                <FavoriteBorder className='me-2'/> 
              )
              : (
                <Favorite style={{ color: 'red' }} className='me-2'/> 
              )
            }
            
            Add to Wishlist
          </span>
        </div>
      </div>

      <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6'>
        <div>
          <h4>
            <strong>
              {name}
            </strong>
          </h4>
        </div>

        <div className='mb-4'>
          <h5>
            <span style={{ color: 'grey' }}>
              {subName}
            </span>
          </h5>
        </div>

        <div className='mb-4'>
          <div className='mb-2' style={{ fontWeight: 600, fontSize: 20 }}>
            Ratings:
          </div>

          {!isUndefined(rating) && (
            <div>
              <Rating
                size='medium'
                value={rating}
                precision={0.5}
                readOnly
              />
            </div>
          )}
        </div>

        {(promotion && (!isEmpty(promotion) && promotion.isActive)) 
          ? (
            <>
              <PriceWithDiscountComponent {...{
                sellerPrice: hasVariationPrice ? selectedVariant.addOnsPrice : sellerPrice,
                promotion
              }}/>
            </>
          )
          : (
            <>
              <Typography 
                color='text.primary'
                fontWeight={600}
                style={{ fontSize: 20 }}
              >
                ₱ {withCommasAndDecimal(hasVariationPrice ? selectedVariant.addOnsPrice : sellerPrice)}
              </Typography>
            </>
          )
        }

        {(variations && !isEmpty(variations)) && (
          <div className='mt-4'>
            <div className='mb-3'>
              <span style={{ fontWeight: 600, fontSize: 20 }}>
                Variations:
              </span>
            </div>

            <div className='d-flex align-content-start flex-wrap gap-2'>
              {variations.map((i, index) => (
                <Fragment key={index}>
                  <Chip 
                    sx={{
                      fontWeight: 'bold',
                    }}
                    variant='outlined'
                    color={selectedVariant.name === i.name ? 'tertiary' : 'primary'}
                    label={i.name}
                    onClick={() => handleSelectVariant(i)}
                    disabled={i.stocks === 0}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        )}

        <div className='mt-5 mb-5'>
          <div className='mb-3'>
            <span style={{ fontWeight: 600, fontSize: 20 }}>
              Quantity:
            </span>
          </div>

          <div className='view-prod-quantity-input'>
            <QuantityTextField {...{
              handleIncreaseQuantity,
              handleDecreaseQuantity,
              handleQuantityChange,
              handleQuantityBlur,
              handleQuantitykeyPress,
              quantity,
              stocks: (!isEmpty(variations) && !isEmpty(selectedVariant)) ? selectedVariant.stocks : stocks,
            }}/>

            <div className='mt-2'>
              <span>
                {(!isEmpty(variations) && !isEmpty(selectedVariant)) ? selectedVariant.stocks : stocks} Stocks Available
              </span>
            </div>
          </div>
        </div>

        <div className='mb-4'>
          <div className='d-flex align-content-start flex-wrap gap-2'>
            <Button
              className='view-prod-add-to-cart-btn'
              label='Add To Cart' 
              startIcon={<ShoppingCart/>} 
              disabled={(!isEmpty(variations) && isEmpty(selectedVariant)) || stocks === 0 || quantity === 0}
              onClick={() => addToCart(product)}
            />

            {(variations && !isEmpty(variations))
              ? (
                <Button
                  className='view-prod-buy-now-btn'
                  color='tertiary'
                  label='Buy Now' 
                  startIcon={<ShoppingCart/>}
                  disabled={(!isEmpty(variations) && isEmpty(selectedVariant)) || stocks === 0 || quantity === 0}
                  onClick={() => buyNow(product)}
                />
              )
              : (
                <Button
                  className='view-prod-buy-now-btn'
                  color='tertiary'
                  label='Buy Now' 
                  startIcon={<ShoppingCart/>}
                  disabled={stocks === 0 || quantity === 0}
                  onClick={() => buyNow(product)}
                />
              )
            }
          </div>
        </div>

        <hr/>
      
        <div className='mb-3' style={{  fontWeight: 500, fontSize: 20 }}>
          <span>
            <strong>SKU:</strong> {skuCode}
          </span>
        </div>

        <div className='mb-3' style={{ fontWeight: 500, fontSize: 20 }}>
          <span>
            <strong>Categories:</strong>

            {categories && categories.map((i, index) => (
              <Fragment key={index}>
                <span style={{ marginLeft: 8 }}>
                  {i.name},
                </span>
              </Fragment>
            ))}
          </span>
        </div>

        <div className='mb-3' style={{ fontWeight: 500, fontSize: 20 }}>
          <span>
            <strong>Tags:</strong>

            {tags && tags.map((i, index) => (
              <Fragment key={index}>
                <span style={{ marginLeft: 8 }}>
                  {i.name},
                </span>
              </Fragment>
            ))}
          </span>
        </div>

        <div className='mb-3' style={{ fontWeight: 500, fontSize: 20 }}>
          <span>
            <strong>Brand:</strong> {brand?.name}
          </span>
        </div>

        <div style={{ fontWeight: 500, fontSize: 20 }}>
          <span>
            <strong>Branch:</strong> {branch?.name}
          </span>
        </div>
      </div>
    </div>
  </>
};

const ProductDescriptionSection = ({
  product,
}) => {
  const {
    description
  } = product;

  return <>
    <div className='row gx-5 gy-4'>
      <div className='col-12'>
        <h4>
          <strong>
            Description
          </strong>
        </h4>
      </div>

      <div className='col-12' style={{ fontWeight: 500, fontSize: 20 }}>
        {description}
      </div>
    </div>
  </>
}

const ProductSpecificationSection = ({
  product,
}) => {
  const {
    specifications
  } = product;

  return <>
    <div className='row gx-5 gy-4'>
      <div className='col-12'>
        <h4>
          <strong>
            Specifications
          </strong>
        </h4>
      </div>

      {specifications && specifications.map((obj, index) => (
        <Fragment key={index}>
          <div className='col-12' style={{ fontWeight: 500, fontSize: 20 }}>
            {obj.field}
          </div>

          <hr/>
        </Fragment>
      ))}
    </div>
  </>
}

const ProductRelatedItemsSection = ({
  relatedProducts,
  addRemoveToWishList,
  addToCart,
}) => {
  return <>
    <div className='row g-4'>
      <div className='col-12'>
        <h4>
          <strong>
            Related Items
          </strong>
        </h4>
      </div>

      <div className='col-12'>
        {relatedProducts && !isEmpty(relatedProducts) 
          ? (
            <SlickSlider>
              {relatedProducts.map((product, index) => (
                <Fragment key={index}>
                  <div className='mx-2 p-1'>
                    <ProductCard {...{ 
                      product,
                      addRemoveToWishList,
                      addToCart,
                    }}/>
                  </div>
                </Fragment>
              ))}
            </SlickSlider>
          )
          : (
            <EmptyBanner product={true} text='No Items Found'/>
          )
        }
      </div>
    </div>
  </>
}

const CustomerViewProduct = () => {
  const {
    product,
    relatedProducts,
    handleSelectVariant,
    selectedVariant,
    addRemoveToWishList,
    addToCart,
    buyNow,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleQuantityChange,
    handleQuantityBlur,
    handleQuantitykeyPress,
    quantity,
  } = useCustomerViewProduct();
  
  return <>
    <div className='row g-4'>
      <div className='col-12'>
        <Card className='customer-view-product-card'>
          <ProductSection {...{ 
            product,
            relatedProducts,
            handleSelectVariant, 
            selectedVariant,
            addRemoveToWishList,
            addToCart,
            buyNow,
            handleIncreaseQuantity,
            handleDecreaseQuantity,
            handleQuantityChange,
            handleQuantityBlur,
            handleQuantitykeyPress,
            quantity,
          }}/>
        </Card>
      </div>

      <div className='col-12'>
        <Card className='customer-view-product-card'>
          <ProductDescriptionSection {...{
            product,
          }}/>
        </Card>
      </div>

      {(product.specifications && !isEmpty(product.specifications)) && (
        <div className='col-12'>
          <Card className='customer-view-product-card'>
            <ProductSpecificationSection {...{
              product,
            }}/>
          </Card>
        </div>
      )}

      <div className='col-12'>
        <Card className='customer-view-product-card'>
          <ProductRelatedItemsSection {...{
            relatedProducts,
            addRemoveToWishList,
            addToCart
          }}/>
        </Card>
      </div>
    </div>
  </>
};

export default CustomerViewProduct;