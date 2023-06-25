import React, { Fragment } from 'react';

import { entries, isEmpty, startCase } from 'lodash';

import { 
  Table,
  TextField,
  SelectField,
  Button,
  Modal,
} from '../../../components';

import useHistoryLogs from '../../../hooks/use-history-logs';

import moment from 'moment';

const HistoryLogsPage = () => {
  const {
    loading,
    rows,
    tableRowsHeaders,
    tableHeaderActions,
    selected,
    setSelected,
    setSearchBy,
    setSearch,
    fetchData,

    auditModules,
    auditActions,
    setFilterByModule,
    setFilterByAction,
    filterByModule,
    filterByAction,

    selectedAuditData,
    viewAuditModalOpen,
    handleCloseViewAuditModal,
  } = useHistoryLogs();

  const entriesNotToShow = [
    'branch',
    'user',
    'data',
    'id',
    '_id',
    '__v',
  ];

  const getDataObjects = (obj) => {
    return <>
      {Object.keys(obj).map(i => {
        if (!entriesNotToShow.includes(i)) { 
          return <>
            <div>
              <span style={{ fontWeight: 500 }}>
                {`${startCase(i)}:`}
              </span>

              &nbsp;

              <span>
                {i === 'createdAt' || i === 'updatedAt' 
                  ? (
                    <>
                    {`${moment(obj[i]).format('MMMM DD YYYY hh:mm A')},`}
                    </>
                  )
                  : (
                    <>
                      {`${obj[i]},`}
                    </>
                  )
                }
              </span>

              &nbsp; &nbsp;
            </div>
          </>
        }
      })}
    </>;
  };

  return <>
    <div>
      <Table {...{
        loading,
        rows,
        tableRowsHeaders,
        tableHeaderActions,
        selected,
        setSelected,
        fetchData,
        filterComponent: (
          <div className='row g-3'>
            <div className='col-12'>
              <SelectField
                name='by_module'
                label='Module'
                options={auditModules.map(data => ({
                  label: data,
                  value: data,
                }))}
                onChange={e => setFilterByModule(e.target.value)}
              />
            </div>

            <div className='col-12'>
              <SelectField
                  name='by_action'
                  label='Action'
                  options={!isEmpty(filterByModule) ? auditActions[filterByModule].map(data => ({
                    label: data,
                    value: data,
                  })) : []}
                  disabled={isEmpty(filterByModule)}
                  onChange={e => setFilterByAction(e.target.value)}
                />
            </div>

            <div className='col-12'>
              <SelectField
                name='search_by'
                label='Search By'
                options={tableHeaderActions.filterByOptions.map(data => ({
                  label: data.label,
                  value: data.value,
                }))}
                onChange={e => setSearchBy(e.target.value)}
                defaultValue={tableHeaderActions.filterByOptions[0]['value']}
              />
            </div>
      
            <div className='col-12'>
              <TextField
                name='search'
                label='Search'
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className='col-12'>
              <Button
                type='submit'
                label='Search'
                style={{ width: '100%' }}
                onClick={() => {
                  if (!isEmpty(filterByModule) && isEmpty(filterByAction)) {
                    return null;
                  }

                  fetchData();
                  setSearch('');
                  setFilterByModule('');
                  setFilterByAction('');
                }}
              />
            </div>
          </div>
        ),
      }}/>
    </div>

    <Modal {...{
      isOpen: viewAuditModalOpen,
      handleClose: handleCloseViewAuditModal,
      title: 'View Data',
      width: 800,
    }}>
      <div className='row g-4' style={{ wordBreak: 'break-all' }}>
        {selectedAuditData && Object.keys(selectedAuditData).map((i, index) => {
          if (!entriesNotToShow.includes(i)) {
            return <>
              <Fragment key={index}>
                <div className='col-12'>
                  <span style={{ fontWeight: 600 }}>
                    {`${startCase(i)}:`}
                  </span>

                  &nbsp; &nbsp;

                  {i === 'data' 
                    ? (
                      <>
                        {isEmpty(selectedAuditData[i]) 
                          ? (
                            <>
                              --
                            </>
                          )
                          : getDataObjects(selectedAuditData[i])
                        }
                      </>
                    )
                    : (
                      <span>
                        {i === 'createdAt' || i === 'updatedAt'
                          ? (
                            <>
                              {moment(selectedAuditData[i]).format('MMMM DD YYYY hh:mm A')}
                            </>
                          ) : (
                            <>
                              {selectedAuditData[i]}
                            </>
                          )
                        }
                      </span>
                    )
                  }
                </div>
              </Fragment>
            </>
          }
        })}

        <div className='col-12' align='right'>
          <Button
            label='Close'
            onClick={() => handleCloseViewAuditModal()}
          />
        </div>
      </div>
    </Modal>
  </>
};

export default HistoryLogsPage;