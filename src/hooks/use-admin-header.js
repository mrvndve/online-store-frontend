import {
  useEffect,
  useState,
} from 'react';

import { 
  useNavigate,
  useLocation,
} from 'react-router';

import breadCrumbsbUrl from '../utils/breadcrumbs-url';

const useAdminHeader = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [breadCrumbsLink, setBreadCrumbsLink] = useState([]);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate('/admin/login');
  };

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleCloseDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleYes = () => {
    logout();
  };

  useEffect(() => {
    setBreadCrumbsLink(breadCrumbsbUrl(pathname));
  }, [pathname]);

  return {
    handleOpenDialog,
    handleCloseDialog,
    handleYes,
    openDialog,
    breadCrumbsLink,
  }
};

export default useAdminHeader;