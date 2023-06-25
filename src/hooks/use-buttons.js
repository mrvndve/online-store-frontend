import {
  useState,
} from 'react';

const useButton = () => {
  const [anchor, setAnchor] = useState(null);

  const open = Boolean(anchor);
  
  const handleClick = (e) => {
    e.stopPropagation();
    setAnchor(e.currentTarget);
  };
  
  const handleClose = (e) => {
    e.stopPropagation();
    setAnchor(null);
  };

  return {
    handleClick,
    handleClose,
    anchor,
    open,
  }
};

export default useButton;