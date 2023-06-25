import { 
  useState,
  useEffect,
} from 'react';

const useTable = ({
  selected,
  setSelected,
  fetchData,
  rows,
  loading
}) => {
  const [order, setOrder] = useState('');
  const [orderBy, setOrderBy] = useState('');  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setPage(0);
  };

  const handleSelectRow = (e, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleSelectAllRow = (e, rows) => {
    if (e.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClickAction = () => {
    setSelected([]);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';

    setOrder(isAsc ? 'desc' : 'asc');

    setOrderBy(property);
  };

  const handleRefreshPage = () => {
    fetchData();
  };

  const openFilterModal = () => {
    setFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setFilterModalOpen(false);
  };

  const handleFilterSearch = () => {
    fetchData();
    closeFilterModal();
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }

    if (b[orderBy] > a[orderBy]) {
      return 1;
    }

    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);

      if (order !== 0) {
        return order;
      }

      return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (loading) {
      closeFilterModal();
    }
  }, [loading]);

  return {
    handleChangePage,
    handleChangeRowsPerPage,
    handleSelectRow,
    handleSelectAllRow,
    handleClickAction,
    handleRequestSort,
    openFilterModal,
    closeFilterModal,
    handleRefreshPage,
    getComparator,
    stableSort,
    page,
    rowsPerPage,
    order,
    orderBy,
    isSelected,
    emptyRows,
    filterModalOpen,
    handleFilterSearch,
  };
};

export default useTable;