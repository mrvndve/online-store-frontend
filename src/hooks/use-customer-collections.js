import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router';

import { useSearchParams } from 'react-router-dom';

import axios from 'axios';

import { isEmpty } from 'lodash';

import { toastError, getCustomer, toastSuccess } from '../utils';

const useCollections = () => {
  const [filterExpand, setFilterExpand] = useState({
    categories: true,
    tags: false,
    brands: false,
    prices: false,    
    ratings: false,
    availability: false,
  });

  const [categories, setCategories] = useState([]);

  const [tags, setTags] = useState([]);

  const [brands, setBrands] = useState([]);

  const [prices, setPrices] = useState([]);

  const [ratings, setRatings] = useState([]);

  const [availabilities, setAvailabilities] = useState([]);

  const [filters, setFilters] = useState({
    categories: [],
    tags: [],
    brands: [],
    prices: [],
    ratings: [],
    availability: [],
  });

  const [collections, setCollections] = useState([]);
  
  const [sortBy, setSortBy] = useState('');

  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(null);

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  const handleExpandChange = (item) => {
    setFilterExpand({ 
      ...filterExpand, 
      [item]: !filterExpand[item],
    });
  };

  const fetchCategories = async () => {
    await axios.get('/customer/categories')
      .then(({data}) => {
        setCategories(data.data);
      })
      .catch(err => {
        toastError(err.message);
      });
  };

  const fetchTags = async () => {
    await axios.get('/customer/tags')
      .then(({data}) => {
        setTags(data.data);
      })
      .catch(err => {
        toastError(err.message);
      });
  };

  const fetchBrands = async () => {
    await axios.get('/customer/brands')
      .then(({data}) => {
        setBrands(data.data);
      })
      .catch(err => {
        toastError(err.message);
      });
  };

  const fetchPrices = async () => {
    setPrices([
      '₱50 - ₱1000', 
      '₱1000 - ₱10000', 
      '₱10000 - ₱20000', 
      '₱20000 - ₱50000',
    ]);
  };

  const fetchRatings = () => {
    setRatings(['1 Star', '2 Star', '3 Star', '4 Star', '5 Star']);
  };

  const fetchAvailability = () => {
    setAvailabilities(['In Stocks', 'Out Of Stocks']);
  }

  const fetchCollections = async () => {
    setLoading(true);
    
    const apiData = {
      filters,
      search,
      sortBy,
      currentPage,
      customer: token ? getCustomer().id : null,
    };

    await axios.post('/customer/collections', apiData)
      .then(({data}) => {
        setCollections(data.data);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch(err => {
        toastError(err.message);
        setLoading(false);
      });
  };

  const handleCheckboxFilterChange = (e, item, value) => {
    let tempObj = {...filters};

    const isChecked = e.target.checked;

    if (isChecked) {
      tempObj[item].push(value);
    } else {
      const filterIndex = tempObj[item].findIndex(i => i === value);
      tempObj[item].splice(filterIndex, 1);
    }

    setCurrentPage(1);
    setFilters(tempObj);
  };

  const handleSortByChange = (value) => {
    setSortBy(value);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  const setSearchParams = () => {
    const {
      categories,
      tags,
      brands,
      prices,
      ratings,
      availability,
    } = filters;

    const isFilterEmpty = isEmpty(categories) && isEmpty(tags) && isEmpty(brands)
      && isEmpty(prices) && isEmpty(ratings) && isEmpty(availability);

    let queryString = `/collections?`;

    if (!isFilterEmpty) {
      if (!isEmpty(categories)) {
        queryString = `${queryString}filterByCategories=${categories.toString()}&`;
      }

      if (!isEmpty(tags)) {
        queryString = `${queryString}filterByTags=${tags.toString()}&`;
      }

      if (!isEmpty(brands)) {
        queryString = `${queryString}filterByBrands=${brands.toString()}&`;
      }

      if (!isEmpty(prices)) {
        queryString = `${queryString}filterByPrices=${prices.toString()}&`;
      }

      if (!isEmpty(ratings)) {
        queryString = `${queryString}filterByRatings=${ratings.toString()}&`;
      }

      if (!isEmpty(availability)) {
        queryString = `${queryString}filterByAvailability=${availability.toString()}&`;
      }  
    }

    if (!isEmpty(sortBy)) {
      queryString = `${queryString}sortBy=${sortBy}&`;
    }
    
    if (!isEmpty(search)) {
      queryString = `${queryString}search=${search}&`;
    }

    navigate(queryString);
  };

  const getSearchParams = () => {
    const newSortBy = searchParams.get('sortBy');
    setSortBy(newSortBy);

    const newSearch = searchParams.get('search');
    setSearch(newSearch);

    const newCategories = searchParams.get('filterByCategories');
    const newTags = searchParams.get('filterByTags');
    const newBrands = searchParams.get('filterByBrands');
    const newPrices = searchParams.get('filterByPrices');
    const newRatings = searchParams.get('filterByRatings');
    const newAvailability = searchParams.get('filterByAvailability');

    setFilterExpand({
      ...filterExpand,
      categories: true,
      tags: !isEmpty(newTags),
      brands: !isEmpty(newBrands),
      prices: !isEmpty(newPrices),    
      ratings: !isEmpty(newRatings),
      availability: !isEmpty(newAvailability),
    })
    
    setFilters({
      ...filters,
      categories: !isEmpty(newCategories) ? newCategories.split(',') : [],
      tags: !isEmpty(newTags) ? newTags.split(',') : [],
      brands: !isEmpty(newBrands) ? newBrands.split(',') : [],
      prices: !isEmpty(newPrices) ? newPrices.split(',') : [],
      ratings: !isEmpty(newRatings) ? newRatings.split(',') : [],
      availability: !isEmpty(newAvailability) ? newAvailability.split(',') : [],
    });
  };

  const addRemoveToWishList = async (product) => {
    if (!token) {
      navigate('/login');
    } else {
      const apiData = {
        customer: getCustomer().id,
        product: product.id,
      };

      await axios.post(`/customer/${!product.isAddedToWishLists ? 'add-to-wishlist' : 'remove-to-wishlist'}`, apiData)
        .then(({data}) => {
          const tempCollections = [...collections];
          tempCollections.map(obj => {
            if (obj.id === product.id) {
              obj.isAddedToWishLists = !product.isAddedToWishLists ? true : false;
            }
            return obj;
          })
          setCollections(tempCollections);
        })
        .catch(err => {
          toastError(err.message);
        });
    }
  };

  const addToCart = async (product) => {
    if (!token) {
      navigate('/login');
    } else {
      const apiData = {
        customer: getCustomer().id,
        product: product.id,
        quantity: 1,
        variant: product.variations.length > 0 ? product.variations[0] : null,
      };

      await axios.post('/customer/add-to-cart', apiData)
        .then(({data}) => {
          toastSuccess(data.message);
        })
        .catch(err => {
          toastError(err.message);
        });
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    fetchCategories();
    fetchTags();
    fetchBrands();
    fetchPrices();
    fetchRatings();
    fetchAvailability();
    getSearchParams();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setSearchParams();
    fetchCollections();
  }, [filters, sortBy, search, currentPage]);

  return {
    filterExpand,
    handleExpandChange,
    categories,
    tags,
    brands,
    prices,
    ratings,
    availabilities,
    collections,
    handleCheckboxFilterChange,
    filters,
    handleSortByChange,
    sortBy,
    handleSearchChange,
    search,
    handlePageChange,
    currentPage,
    totalPages,
    loading,
    addRemoveToWishList,
    addToCart,
  };
};

export default useCollections;