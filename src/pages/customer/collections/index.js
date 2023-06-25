import { Fragment } from 'react';

import { 
  Card,
  CheckBoxField,
  SelectField,
  TextField,
  ProductCard,
  EmptyBanner,
  Loading,
} from '../../../components';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Rating,
  Pagination,
} from '@mui/material';

import { 
  ExpandMore,
  FilterAltOutlined,
} from '@mui/icons-material';

import useCollections from '../../../hooks/use-customer-collections';
import { isEmpty } from 'lodash';

const FilterAccordion = ({
  expanded,
  onChange,
  title,
  children,
}) => (
  <Accordion
    expanded={expanded}
    onChange={onChange}
  >
    <AccordionSummary expandIcon={<ExpandMore/>}>
      <Typography fontWeight='bold'>
        <FilterAltOutlined/> {title}
      </Typography>
    </AccordionSummary>

    <AccordionDetails>
      {children}
    </AccordionDetails>
  </Accordion>
);

const FilterBy = ({
  filterExpand,
  handleExpandChange,
  categories,
  tags,
  brands,
  prices,
  ratings,
  availabilities,
  handleCheckboxFilterChange,
  filters,
}) => {
  return <>
    <div>
      <FilterAccordion {...{
        title: 'Categories',
        expanded: filterExpand.categories,
        onChange: () => handleExpandChange('categories'),
      }}>
        <div className='row g-0'>
          {categories && categories.map((i, index) => (
            <Fragment key={index}>
              <div className='col-12'>
                <CheckBoxField
                  style={{ fontSize: 16 }}
                  label={i.name} 
                  onChange={(e) => handleCheckboxFilterChange(e, 'categories', i.name)}
                  defaultChecked={!isEmpty(filters) && filters.categories.includes(i.name)}
                />
              </div>
            </Fragment>
          ))}
        </div>
      </FilterAccordion>

      <FilterAccordion {...{
        title: 'Tags',
        expanded: filterExpand.tags,
        onChange: () => handleExpandChange('tags'),
      }}>
        <div className='row g-0'>
          {tags && tags.map((i, index) => (
            <Fragment key={index}>
              <div className='col-12'>
                <CheckBoxField
                  style={{ fontSize: 16 }}
                  label={i.name} 
                  onChange={(e) => handleCheckboxFilterChange(e, 'tags', i.name)}
                  defaultChecked={!isEmpty(filters) && filters.tags.includes(i.name)}
                />
              </div>
            </Fragment>
          ))}
        </div>
      </FilterAccordion>

      <FilterAccordion {...{
        title: 'Brands',
        expanded: filterExpand.brands,
        onChange: () => handleExpandChange('brands'),
      }}>
        <div className='row g-0'>
          {brands && brands.map((i, index) => (
            <Fragment key={index}>
              <div className='col-12'>
                <CheckBoxField
                  style={{ fontSize: 16 }}
                  label={i.name}
                  onChange={(e) => handleCheckboxFilterChange(e, 'brands', i.id)}
                  defaultChecked={!isEmpty(filters) && filters.brands.includes(i.id)}
                />
              </div>
            </Fragment>
          ))}
        </div>
      </FilterAccordion>

      <FilterAccordion {...{
        title: 'Prices',
        expanded: filterExpand.prices,
        onChange: () => handleExpandChange('prices'),
      }}>
        <div className='row g-0'>
          {prices && prices.map((i, index) => (
            <Fragment key={index}>
              <div className='col-12'>
                <CheckBoxField
                  style={{ fontSize: 16 }}
                  label={i}
                  onChange={(e) => handleCheckboxFilterChange(e, 'prices', i)}
                  defaultChecked={!isEmpty(filters) && filters.prices.includes(i)}
                />
              </div>
            </Fragment>
          ))}
        </div>
      </FilterAccordion>

      <FilterAccordion {...{
        title: 'Ratings',
        expanded: filterExpand.ratings,
        onChange: () => handleExpandChange('ratings'),
      }}>
        <div className='row g-0'>
          {ratings && ratings.map((i, index) => (
            <Fragment key={index}>
              <div className='col-12'>
                <CheckBoxField
                  style={{ fontSize: 16 }}
                  label={(<Rating value={i.replace('Star', '')} readOnly />)}
                  onChange={(e) => handleCheckboxFilterChange(e, 'ratings', i)}
                  defaultChecked={!isEmpty(filters) && filters.ratings.includes(i)}
                />
              </div>
            </Fragment>
          ))}
        </div>
      </FilterAccordion>

      <FilterAccordion {...{
        title: 'Availability',
        expanded: filterExpand.availability,
        onChange: () => handleExpandChange('availability'),
      }}>
        <div className='row g-0'>
          {availabilities && availabilities.map((i, index) => (
            <Fragment key={index}>
              <div className='col-12'>
                <CheckBoxField
                  style={{ fontSize: 16 }}
                  label={i}
                  onChange={(e) => handleCheckboxFilterChange(e, 'availability', i)}
                  defaultChecked={!isEmpty(filters) && filters.availability.includes(i)}
                />
              </div>
            </Fragment>
          ))}
        </div>
      </FilterAccordion>
    </div>
  </>
};

const SortAndSearch = ({
  handleSortByChange,
  sortBy,
  handleSearchChange,
  search,
}) => {
  return <>
    <Card padding={16}>
      <div className='row g-4'>
        <div className='col-sm-12 col-md-4 col-lg-4 col-xl-3'>
          <SelectField
            name='sortBy'
            label='Sort By'
            options={[
              { label: 'A-Z', value: 'Ascending' },
              { label: 'Z-A', value: 'Descending' },
              { label: 'Latest', value: 'Latest' },
              { label: 'Reviews: Low to High', value: 'Reviews Low To High' },
              { label: 'Reviews: High to Low', value: 'Reviews High To Low' },
              { label: 'Price: Low to High', value: 'Price Low To High' },
              { label: 'Price: High to Low', value: 'Price High To Low' },
            ]}
            value={sortBy}
            onChange={(e) => handleSortByChange(e.target.value)}
          />
        </div>

        <div className='col-sm-12 col-md-8 col-lg-8 col-xl-9'>
          {/* <TextField 
            label='Search' 
            onChange={(e) => handleSearchChange(e.target.value)}
            value={search}
          /> */}
        </div>
      </div>
    </Card>
  </>
};

const Collections = () => {
  const {
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
  } = useCollections();

  return <>
    <div className='row g-4'>
      <div className='col-sm-12 col-md-12 col-lg-12 col-xl-2'>
        <FilterBy {...{ 
          filterExpand, 
          handleExpandChange,
          categories,
          tags,
          brands,
          prices,
          ratings,
          availabilities,
          handleCheckboxFilterChange,
          filters,
        }}/>
      </div>
      
      <div className='col-sm-12 col-md-12 col-lg-12 col-xl-10'>
        <div className='row g-4'>
          <div className='col-12'>
            <SortAndSearch {...{
              handleSortByChange,
              sortBy,
              handleSearchChange,
              search,
            }}/>
          </div>

          <div className='col-12'>
            <Card padding={30}>
              {!loading 
                ? (
                  <div className='row g-4'>
                    {!isEmpty(collections)
                      ? (
                        <>
                          {collections.map((product, index) => (
                            <Fragment key={index}>
                              <div className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>
                                <ProductCard {...{ 
                                  product,
                                  addRemoveToWishList,
                                  addToCart,
                                }} />
                              </div>
                            </Fragment>
                          ))}
                        </>
                      ) : (
                        <EmptyBanner product text='No results found'/>
                      )
                    }
    
                    {!isEmpty(collections) && (
                      <div className='col-12'>
                        <Pagination 
                          style={{ float: 'right' }} 
                          count={totalPages} 
                          variant='outlined' 
                          shape='rounded'
                          showFirstButton
                          showLastButton
                          defaultPage={currentPage}
                          onChange={(e, value) => handlePageChange(e, value)}
                        />
                      </div>
                    )}
                  </div>
                ) 
                : (
                  <Loading/>
                )
              }
            </Card>
          </div>
        </div>
      </div>
    </div>
  </>
};

export default Collections;