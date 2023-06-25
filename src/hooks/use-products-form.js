import {
  useState,
  useEffect,
} from 'react';

import { useForm } from 'react-hook-form';

import { 
  useNavigate, 
  useParams,
  useLocation,
} from 'react-router';

import axios from 'axios';

import {
  toastError,
  toastSuccess,
  priceFormatter,
} from '../utils';

const useProductsForm = () => {
  const [loading, setLoading] = useState(false);
  const [apiValidationErrors, setApiValidationErrors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [tags, setTags] = useState([]);
  const [productImages, setProductImages] = useState([]);

  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const {
    formMode,
  } = useParams();

  const {
    state: selectedRow,
  } = useLocation();

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
  } = useForm();

  const fetchBrands = async () => {
    await axios.get('/products/brands')
      .then(({data}) => {
        setBrands(data.data);
      })
      .catch(err => {
        err.message
      });
  }

  const fetchCategories = async () => {
    await axios.get('/products/categories')
      .then(({data}) => {
        const filtered = data.data.filter(a => !selectedCategories.some(b => b.id === a.id));
        setCategories(filtered);
      })
      .catch(err => {
        err.message
      });
  }

  const fetchTags = async () => {
    await axios.get('/products/tags')
      .then(({data}) => {
        const filtered = data.data.filter(a => !selectedTags.some(b => b.id === a.id));
        setTags(filtered);
      })
      .catch(err => {
        err.message
      });
  }

  const handleOpenCategoriesModal = () => {
    fetchCategories();
    setIsCategoriesModalOpen(true);
  };

  const handleCloseCategoriesModal = () => {
    setIsCategoriesModalOpen(false);
  };

  const handleAddCategory = (data) => {
    data.map(item => {
      setSelectedCategories(prevState => [...prevState, item])
    });

    handleCloseCategoriesModal()
  };

  const handleRemoveCategory = (index) => {
    const newArr = [...selectedCategories];
    newArr.splice(index, 1);
    setSelectedCategories(newArr);
  };

  const handleOpenTagsModal = () => {
    fetchTags();
    setIsTagsModalOpen(true);
  };

  const handleCloseTagsModal = () => {
    setIsTagsModalOpen(false);
  };

  const handleAddTag = (data) => {
    data.map(item => {
      setSelectedTags(prevState => [...prevState, item])
    });

    handleCloseTagsModal()
  };

  const handleRemoveTag = (index) => {
    const newArr = [...selectedTags];
    newArr.splice(index, 1);
    setSelectedTags(newArr);
  };

  const onSubmit = async data => {
    data['price'] = priceFormatter(data['price']);
    data['sellerPrice'] = priceFormatter(data['sellerPrice']);

    if (data['variations']) {
      data['variations'].map(i => {
        i.addOnsPrice = priceFormatter(i.addOnsPrice)
      });
    }

    if (formMode === 'create') {
      data['promotion'] = {};
    }

    const apiData = {
      ...data,
      images: productImages,
      categories: selectedCategories,
      tags: selectedTags,
    };
  
    setLoading(true);
    const submitMode = formMode === 'create' ? 'create' : `update/${selectedRow.id}`;
    await axios.post(`/products/${submitMode}`, apiData)
      .then(({data}) => {
        setLoading(false);
        toastSuccess(data.message);
        reset();
        navigate('/admin/products');
      })
      .catch(({response}) => {
        if (response.status === 422) {
          setApiValidationErrors(response.data.errors);
          setLoading(false);
        } else if (response.status === 500) {
          toastError(response.data.message);
          setLoading(false);
        }
      });
  };

  // Did Mount
  useEffect(() => {
    fetchBrands();

    if (formMode !== 'create') {
      const {
        categories,
        tags,
        specifications,
        images,
        variations,
      } = selectedRow;

      setSelectedCategories(categories);
      setSelectedTags(tags);
      setProductImages(images);
      setValue('specifications', specifications);
      setValue('variations', variations);
    }
  }, []);

  return {
    navigate,
    formMode,
    register,
    control,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
    selectedRow,
    apiValidationErrors,
    brands,
    categories,
    tags,
    productImages,
    setProductImages,
    isCategoriesModalOpen,
    handleOpenCategoriesModal,
    handleCloseCategoriesModal,
    handleAddCategory,
    handleRemoveCategory,
    selectedCategories,
    isTagsModalOpen,
    handleOpenTagsModal,
    handleCloseTagsModal,
    handleAddTag,
    handleRemoveTag,
    selectedTags,
  };
};

export default useProductsForm;