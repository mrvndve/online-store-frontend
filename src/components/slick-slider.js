import Slider from 'react-slick';

const SlickSlider = ({
  children,
}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 3,
          autoplay: true,
          pauseOnHover: true,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
          pauseOnHover: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
          pauseOnHover: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
          pauseOnHover: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          pauseOnHover: true,
        }
      }
    ]
  };

  return <>
    <Slider {...settings}>
      {children}
    </Slider>
  </>
};

export default SlickSlider;