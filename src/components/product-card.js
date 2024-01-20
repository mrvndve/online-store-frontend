import { 
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Divider,
  Rating,
  Box,
} from '@mui/material';

import { Favorite, FavoriteBorderOutlined, ShoppingCartOutlined } from '@mui/icons-material';

import { isEmpty } from 'lodash';

import { withCommasAndDecimal, imgBaseUrl, PRIMARY_COLOR_YELLOW } from '../utils';

import useProductCard from '../hooks/use-product-card';

const PriceWithDiscountComponent = ({sellerPrice, promotion}) => {
  const productDiscount = promotion.discountPercent / 100;
  const priceWithDiscount = withCommasAndDecimal((sellerPrice - (sellerPrice * productDiscount)).toFixed(2));

  return <>
    <Typography 
      color='text.primary' 
      fontWeight={600}
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

const ProductCard = ({ 
  product,
  hasWishListButton = true,
  addRemoveToWishList, 
  addToCart,
}) => {
  const {
    id: productId,
    images,
    name,
    subName,
    sellerPrice,
    promotion,
    stocks,
    rating,
  } = product;

  const {
    handleClickProductCard,
    handleClickAddRemoveToWishlist,
    handleClickAddToCart,
  } = useProductCard({
    addRemoveToWishList, 
    addToCart,
  });

  return <>
    <Card
      className='prod-card'
      elevation={2} 
      sx={{ maxWidth: '100%', }}
    >
      <div className='p-3 position-relative'>
        <img
          style={{
            height: 220,
            width: '100%',
            backgroundColor: 'whitesmoke',
            objectFit: 'fill',
            cursor: 'pointer',
          }}
          src={`${imgBaseUrl}/${images[0].fileName}`}
          onClick={(e) => handleClickProductCard(e, name)}
        />
        
        {promotion && (!isEmpty(promotion)) && (
          <div className='product-card-discount-container'>
            <div 
              className='p-2'
              style={{
                backgroundColor: PRIMARY_COLOR_YELLOW.bgColor,
                color: PRIMARY_COLOR_YELLOW.txtColor,
                fontWeight: 'bold',
                fontSize: 13,
              }}
            >
              {`${promotion.discountPercent}% OFF`}
            </div>
          </div>
        )}

        {stocks === 0 && (
          <div className='product-card-no-stocks-container'>
            <div 
              className='p-2'
              style={{
                color: 'red',
                fontWeight: 'bold',
                fontSize: 13,
              }}
            >
              Out of Stocks
            </div>
          </div>
        )}
      </div>

      <Divider/>

      <CardContent sx={{ marginBottom: 0 }}>
        <Typography
          className='product-name-ellipsis'
          fontWeight='bold' 
          variant='body1' 
          component='div'
        >
          {name}
        </Typography>

        <Typography 
          sx={{ mb: 2 }} 
          color='text.secondary' 
          variant='body2'
        >
          <span className='product-name-ellipsis'>
            {subName}
          </span>
        </Typography>

        {(promotion && (!isEmpty(promotion) && promotion.isActive)) 
          ? (
            <>
              <PriceWithDiscountComponent {...{sellerPrice, promotion}}/>
            </>
          )
          : (
            <>
              <Typography 
                color='text.primary'
                fontWeight={600}
              >
                ₱ {withCommasAndDecimal(sellerPrice)}
              </Typography>
            </>
          )
        }

        <Box
          sx={{
            mt: 1,
            width: 200,
            display: 'flex',
            alignItems: 'center',
            fontWeight: 600,
          }}
        >
          <Box sx={{ mr: 1 }}>
            Ratings:
          </Box>

          <Rating
            value={rating}
            precision={0.5}
            readOnly
          />
        </Box>
      </CardContent>

      <CardActions disableSpacing>
        {hasWishListButton && (
          <IconButton onClick={(e) => handleClickAddRemoveToWishlist(e, product)}>
            {product.isAddedToWishLists 
              ? (
                <Favorite style={{ color: 'red' }}/>
              )
              : (
                <FavoriteBorderOutlined/>
              )
            }
            
          </IconButton>
        )}

        <IconButton onClick={(e) => handleClickAddToCart(e, product)} disabled={stocks === 0}>
          <ShoppingCartOutlined/>
        </IconButton>
      </CardActions>
    </Card>
  </>
};

export default ProductCard;