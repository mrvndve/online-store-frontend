import {
  Table as MUITable,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TableSortLabel,
  Box,
  Checkbox,
  List,
  IconButton,
} from '@mui/material';

import { visuallyHidden } from "@mui/utils";

import React, { 
  Fragment,
} from 'react';

import { 
  Card,
} from './cards';

import useTable from '../hooks/use-table';

import moment from 'moment';

import { 
  Button, 
  DropdownButton,
  DropdownIconButton,
} from './buttons';

import {
  TextField,
  SelectField,
  EmptyBanner,
  Loading,
  Modal,
} from '../components';

import { 
  FilterList, 
  LinearScale, 
  Refresh,
} from '@mui/icons-material';
import { withCommasAndDecimal } from '../utils/numbers-helper';
import { PRIMARY_COLOR } from '../utils';

const EnhancedTableHead = ({
  tableRowsHeaders,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  }

  return <>
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>

        {tableRowsHeaders.map((tblRh, i) => (
          <Fragment key={i}>
            {tblRh.id !== 'id' && (
              <TableCell
                style={{ fontSize: 13 }}
                key={tblRh.id}
                align={'left'}
                sortDirection={orderBy === tblRh.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === tblRh.id}
                  direction={orderBy === tblRh.id ? order : 'asc'}
                  onClick={createSortHandler(tblRh.id)}
                >
                  <strong style={{ color: PRIMARY_COLOR.bgColor }}>
                    {tblRh.label}
                  </strong>

                  {orderBy === tblRh.id ? (
                    <Box component='span' sx={visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )}
          </Fragment>
        ))}
      </TableRow>
    </TableHead>
  </>
}

const TableCellChildren = ({
  row, 
  tblRh,
  handleClickAction,
}) => {
  if (tblRh.isBoolean) {
    // If Row is a Boolean
    return row[tblRh.id] === true ? 'Yes' : 'No';
  } else if (tblRh.isDate) {
    // If Row is a Date
    return moment(row[tblRh.id]).format('MMMM DD YYYY');
  } else if (tblRh.isPrice) {
    // If Row is Price
    return `₱ ${withCommasAndDecimal(row[tblRh.id])}`;
  } else if (tblRh.isDateTime) {
    // If Row is a Date & Time
    return moment(row[tblRh.id]).format('MMMM DD YYYY hh:mm A');
  } else if (tblRh.id === 'action') {
    // If Row is an Action
    return <>
      <DropdownButton
        style={{ fontSize: 13 }}
        menuItemStyle={{ fontSize: 13 }}
        color='secondary'
        variant='text'
        buttonId='table-action-btn'
        menuId='table-action-menu'
        label='Action'
        size='normal'
        onClick={handleClickAction}
        onClose={handleClickAction}
        menuItems={row.isDefault ? tblRh?.actionItems.filter(i => i.label === 'Edit') : tblRh?.actionItems}
        rowData={row}
      />
    </>
  } else if (tblRh.isObject) {
    return row[tblRh.id] && row[tblRh.id][tblRh.objectDisplay];
  } else {
    return row[tblRh.id];
  }
};

const WebView = ({
  dense,
  tableHeaderActions,
  tableRowsHeaders,
  rows,
  handleChangePage,
  handleChangeRowsPerPage,
  page,
  rowsPerPage,
  rowsPerPageOptions,
  handleSelectAllRow,
  handleSelectRow,
  selected,
  handleClickAction,
  loading,
  handleRequestSort,
  getComparator,
  stableSort,
  order,
  orderBy,
  isSelected,
  emptyRows,
  hasFilter,
  openFilterModal,
  closeFilterModal,
  handleRefreshPage,
}) => {
  return <>
    <Card style={{ width: '100%', }}>
      <div
        align='left'
        style={{ 
          padding: '15px 15px 15px 15px',
          borderBottom: '1px solid rgba(224, 224, 224, 1)'
        }}
      >
        {hasFilter && (
          <Button
            className='me-3'
            variant='text'
            color='secondary'
            startIcon={<FilterList/>}
            label='Filter'
            onClick={openFilterModal}
          />
        )}

        <Button
          className='me-3'
          variant='text'
          color='success'
          startIcon={<Refresh/>}
          label='Refresh'
          onClick={handleRefreshPage}
        />

        {tableHeaderActions.actionButtons && tableHeaderActions.actionButtons.map((tblHeaderAction, i) => (
          <Fragment key={i}>
            <Button
              className='me-3'
              variant='text'
              size={tblHeaderAction.size ? tblHeaderAction.size : 'small'}
              color={tblHeaderAction.color ? tblHeaderAction.color : 'primary'}
              startIcon={tblHeaderAction.icon}
              label={tblHeaderAction.label ? tblHeaderAction.label : ''}
              disabled={tblHeaderAction.disabled || loading || rows.length === 0}
              onClick={tblHeaderAction.onClick && tblHeaderAction.onClick}
            />
          </Fragment>
        ))}
      </div>

      <TableContainer style={{ height: 550 }}>
        <MUITable style={(rows.length === 0 || loading) ? { height: '100%' } : {}} stickyHeader size={dense ? 'small' : 'medium'}>
          {!loading 
            ?
            <Fragment>
              {rows.length > 0
                ?
                <>
                  <EnhancedTableHead
                    tableRowsHeaders={tableRowsHeaders}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={(e) => handleSelectAllRow(e, rows.filter(i => !i.isDefault))}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />

                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, rowIndex) => (
                        <TableRow
                          hover
                          onClick={(e) => row.isDefault ? null : handleSelectRow(e, row.id)}
                          role='checkbox'
                          aria-checked={isSelected(row.id)}
                          tabIndex={-1}
                          key={rowIndex}
                          selected={isSelected(row.id)}
                        >
                          <TableCell padding='checkbox'>
                            <Checkbox
                              color='primary'
                              checked={isSelected(row.id)}
                              inputProps={{
                                'aria-labelledby': `enhanced-table-checkbox-${rowIndex}`,
                              }}
                              disabled={row.isDefault}
                            />
                          </TableCell>

                          {tableRowsHeaders.map((tblRh, i) => (
                            <Fragment key={i}>
                              {tblRh.id !== 'id' &&
                                <TableCell sx={{ fontWeight: 500, fontSize: 13, color: PRIMARY_COLOR.bgColor }} align="left">
                                  <TableCellChildren {...{
                                    row,
                                    tblRh,
                                    handleClickAction
                                  }}/>
                                </TableCell>
                              }
                            </Fragment>
                          ))}
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                      <TableRow style={{ height: (dense ? 33 : 53) * emptyRows, }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </>
                :
                <div style={{ padding: 50, height: '100%' }}>
                  <EmptyBanner/>
                </div>
              }
            </Fragment>
            :
            <div style={{ padding: 50, height: '100%' }}>
              <Loading/>
            </div>
          }
        </MUITable>
      </TableContainer>

      {!loading &&
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          showFirstButton
          showLastButton
          labelRowsPerPage='Show Entries'
        />
      }
    </Card>
  </>
}

const MobileView = ({
  tableHeaderActions,
  tableRowsHeaders,
  rows,
  handleChangePage,
  handleChangeRowsPerPage,
  page,
  rowsPerPage,
  rowsPerPageOptions,
  handleSelectAllRow,
  handleSelectRow,
  selected,
  handleClickAction,
  loading,
  handleRequestSort,
  getComparator,
  stableSort,
  order,
  orderBy,
  isSelected,
  hasFilter,
  handleRefreshPage,
  openFilterModal,
}) => {
  return <>
    {rows.length > 0
      ?
      <Fragment>
        <div className='mb-4'>
          <Card style={{ padding: 10 }}>
            <div>
              {hasFilter && (
                <span>
                  <IconButton onClick={openFilterModal} color='secondary'>
                    <FilterList/>
                  </IconButton>
                </span>
              )}

              <span>
                <IconButton onClick={handleRefreshPage} color='success'>
                  <Refresh/>
                </IconButton>
              </span>

              {tableHeaderActions.actionButtons && tableHeaderActions.actionButtons.map((tblHeaderAction, i) => (
                <span key={i}>
                  <IconButton 
                    color={tblHeaderAction.color ? tblHeaderAction.color : 'primary'}
                    disabled={tblHeaderAction.disabled || loading || rows.length === 0}
                    onClick={tblHeaderAction.onClick ? tblHeaderAction.onClick : alert('No Function')}
                  >
                    {tblHeaderAction.icon}
                  </IconButton>
                </span>
              ))}
            </div>
          </Card>
        </div>

        <div className='mb-4'>
          <Card style={{ padding: 5, }}>
            <div className='d-flex justify-content-between'>
              <div>
                <Checkbox
                  color='primary'
                  indeterminate={selected.length > 0 && selected.length < rows.length}
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={(e) => handleSelectAllRow(e, rows.filter(i => !i.isDefault))}
                />
    
                <strong>
                  Select All
                </strong>
              </div>

              <div>
                
              </div>
            </div>
          </Card>
        </div>

        <div>
          {stableSort(rows, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, rowIndex) => (
              <div key={rowIndex} className='mb-4'>
                <Card
                  onClick={(e) => row.isDefault ? null : handleSelectRow(e, row.id)}
                  style={{ 
                    backgroundColor: isSelected(row.id) ? '#e1e8ee' : '', 
                    padding: 5,
                  }}
                >
                  <div>
                    <Checkbox
                      color='primary'
                      checked={isSelected(row.id)}
                      inputProps={{
                        'aria-labelledby': `enhanced-table-checkbox-${rowIndex}`,
                      }}
                      disabled={row.isDefault}
                    />
                  </div>

                  <div className='row g-3 mt-1 mx-2'>
                    {tableRowsHeaders && tableRowsHeaders.map((tblRh, tblRhIndex) => (
                      <Fragment key={tblRhIndex}>
                        {(tblRh.id !== 'id' && tblRh.id !== 'action') &&
                          <div className='mb-2 col-sm-6 col-md-4 col-lg-4 col-xl-4'>
                            <strong>{`${tblRh.label}: `}</strong>

                            <br/>

                            <span>
                              <TableCellChildren {...{
                                row,
                                tblRh,
                                handleClickAction,
                              }}/>
                            </span>
                          </div>
                        }

                        {tblRh.id === 'action' && 
                          <div align='right' className='mb-3'>
                            <DropdownButton
                              buttonId='table-action-btn'
                              menuId='table-action-menu'
                              label='Action'
                              size='normal'
                              onClick={handleClickAction}
                              onClose={handleClickAction}
                              menuItems={row.isDefault ? tblRh?.actionItems.filter(i => i.label === 'Edit') : tblRh?.actionItems}
                              rowData={row}
                            />
                          </div>
                        }
                      </Fragment>
                    ))}
                  </div>
                </Card>
              </div>
          ))}
        </div>

        {!loading &&
          <div>
            <Card>
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component='div'
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                showFirstButton
                showLastButton
                labelRowsPerPage='Rows'
              />
            </Card>
          </div>
        }
      </Fragment>
      :
      <Card>
        <div style={{ padding: 50, height: '100%' }}>
          <EmptyBanner/>
        </div>
      </Card>
    }
  </>
};

const Table = ({
  dense = true,
  tableHeaderActions = [],
  tableRowsHeaders = [],
  rows = [],
  rowsPerPageOptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100],
  hasFilter = true,
  setSelected,
  selected,
  loading,
  fetchData,
  filterComponent,
}) => {
  const {
    handleChangePage,
    handleChangeRowsPerPage,
    handleSelectAllRow,
    handleSelectRow,
    handleClickAction,
    page,
    rowsPerPage,
    handleRequestSort,
    getComparator,
    stableSort,
    order,
    orderBy,
    isSelected,
    emptyRows,
    filterModalOpen,
    openFilterModal,
    closeFilterModal,
    handleRefreshPage,
    handleFilterSearch,
  } = useTable({
    selected,
    setSelected,
    rows,
    fetchData,
    loading,
  });

  return <>
    <div className='d-none d-xl-block h-100'>
      <WebView {...{
        dense,
        tableHeaderActions,
        tableRowsHeaders,
        rows,
        handleChangePage,
        handleChangeRowsPerPage,
        page,
        rowsPerPage,
        rowsPerPageOptions,
        handleSelectAllRow,
        handleSelectRow,
        selected,
        handleClickAction,
        loading,
        handleRequestSort,
        getComparator,
        stableSort,
        order,
        orderBy,
        isSelected,
        emptyRows,
        openFilterModal,
        handleRefreshPage,
        hasFilter,
      }}/>
    </div>

    <div className='d-xl-none h-100'>
      <MobileView {...{
        tableHeaderActions,
        tableRowsHeaders,
        rows,
        handleChangePage,
        handleChangeRowsPerPage,
        page,
        rowsPerPage,
        rowsPerPageOptions,
        handleSelectAllRow,
        handleSelectRow,
        selected,
        handleClickAction,
        loading,
        handleRequestSort,
        getComparator,
        stableSort,
        order,
        orderBy,
        isSelected,
        emptyRows,
        hasFilter,
        handleRefreshPage,
        openFilterModal,
      }}/>
    </div>

    <Modal
      title='Filter' 
      isOpen={filterModalOpen}
      handleClose={closeFilterModal}
    >
      {filterComponent}
    </Modal>
  </>
};

export default Table;