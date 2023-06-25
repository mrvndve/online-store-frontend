import React, { 
  Fragment,
  useState,
} from 'react';

import { useNavigate } from 'react-router';

import { getUser , PRIMARY_COLOR } from '../../utils';

import { Items as sideBarItems } from './sidebar-items';

import { 
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Avatar,
  Collapse,
} from '@mui/material';

import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';

import { isEmpty } from 'lodash';

const DrawerItems = () => {
  const [isOpen, setOpen] = useState({});

  const navigate = useNavigate();

  const {
    firstName,
    lastName,
    fullName,
    role,
  } = getUser();

  const handleOpenItem = item => {
    setOpen(obj => ({...obj, [item]: !obj[item]}));
  };

  return <>
    <div>
      <List style={{ fontSize: 15, }}>
        <div style={{ padding: 15, wordBreak: 'break-word' }} align='center'>
          <div className='mb-3'>
            <Avatar 
              sx={{ 
                bgcolor: PRIMARY_COLOR.sideBarHoverBgColor,
                width: 65,
                height: 65,
                fontWeight: 'bold',
              }}
            >
              {`${firstName && firstName[0].toUpperCase()}${lastName && lastName[0].toUpperCase()}`}
            </Avatar>
          </div>

          <div className='mb-2'>
            <strong>
              {fullName}
            </strong>
          </div>

          <div>
            <span>
              {role?.name}
            </span>
          </div>
        </div>

        <hr className='m-1'/>
        
        {sideBarItems && sideBarItems.map((i, index) => (
          <>
            {i.subItem && !isEmpty(i.subItem) 
              ?
              <Fragment key={index}>
                <ListItemButton
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: PRIMARY_COLOR.sideBarHoverBgColor,
                      color: PRIMARY_COLOR.sideBarTxtColor,
                      ':hover': {
                        backgroundColor: PRIMARY_COLOR.sideBarHoverBgColor,
                        color: PRIMARY_COLOR.sideBarTxtColor,
                      },
                      '& .MuiListItemIcon-root': {
                        color: PRIMARY_COLOR.sideBarTxtColor,
                      },
                    },
                    ':hover': {
                      backgroundColor: PRIMARY_COLOR.sideBarHoverBgColor,
                      color: PRIMARY_COLOR.sideBarTxtColor,
                      '& .MuiListItemIcon-root': {
                        color: PRIMARY_COLOR.sideBarTxtColor,
                      },
                    },
                    '.MuiListItemIcon-root': {
                      color: PRIMARY_COLOR.txtColor,
                    },
                  }}
                  selected={i.path === window.location.pathname}
                  onClick={() => handleOpenItem(i.id)}
                >
                  <ListItemIcon color='inherit'>
                    {i.icon}
                  </ListItemIcon>
                  
                  <ListItemText primary={<span style={{ fontWeight: 500, fontSize: 15, }}>{i.label}</span>}/>
                  {isOpen[i.id] ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>

                {i.subItem.map((sub, subIndex) => (
                  <Collapse in={isOpen[i.id]} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                      <Fragment key={subIndex}>
                        <ListItemButton 
                          sx={{ 
                            pl: 4,
                            '&.Mui-selected': {
                              backgroundColor: PRIMARY_COLOR.sideBarHoverBgColor,
                              color: PRIMARY_COLOR.sideBarTxtColor,
                              ':hover': {
                                backgroundColor: PRIMARY_COLOR.sideBarHoverBgColor,
                                color: PRIMARY_COLOR.sideBarTxtColor,
                              },
                              '& .MuiListItemIcon-root': {
                                color: PRIMARY_COLOR.sideBarTxtColor,
                              },
                            },
                            ':hover': {
                              backgroundColor: PRIMARY_COLOR.sideBarHoverBgColor,
                              color: PRIMARY_COLOR.sideBarTxtColor,
                              '& .MuiListItemIcon-root': {
                                color: PRIMARY_COLOR.sideBarTxtColor,
                              },
                            },
                            '.MuiListItemIcon-root': {
                              color: PRIMARY_COLOR.txtColor,
                            },
                          }} 
                          selected={sub.path === window.location.pathname}
                          onClick={() => navigate(sub.path)}
                        >
                          <ListItemIcon>
                            {sub.icon}
                          </ListItemIcon>

                          <ListItemText primary={<span style={{ fontWeight: 500, fontSize: 15, }}>{sub.label}</span>} />
                        </ListItemButton>
                      </Fragment>
                    </List>
                  </Collapse>
                ))}
              </Fragment>
              :
              <Fragment key={index}>
                <ListItemButton 
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: PRIMARY_COLOR.sideBarHoverBgColor,
                      color: PRIMARY_COLOR.sideBarTxtColor,
                      ':hover': {
                        backgroundColor: PRIMARY_COLOR.sideBarHoverBgColor,
                        color: PRIMARY_COLOR.sideBarTxtColor,
                      },
                      '& .MuiListItemIcon-root': {
                        color: PRIMARY_COLOR.sideBarTxtColor,
                      },
                    },
                    ':hover': {
                      backgroundColor: PRIMARY_COLOR.sideBarHoverBgColor,
                      color: PRIMARY_COLOR.sideBarTxtColor,
                      '& .MuiListItemIcon-root': {
                        color: PRIMARY_COLOR.sideBarTxtColor,
                      },
                    },
                    '.MuiListItemIcon-root': {
                      color: PRIMARY_COLOR.txtColor,
                    },
                  }}
                  selected={i.path === window.location.pathname}
                  onClick={() => {
                    if (i.onClick) {
                      i.onClick();
                    }

                    navigate(i.path)
                  }}
                >
                  <ListItemIcon>
                    {i.icon}
                  </ListItemIcon>
                  
                  <ListItemText primary={<span style={{ fontWeight: 500, fontSize: 15, }}>{i.label}</span>}/>
                </ListItemButton>
              </Fragment>
            }
          </>
        ))}
      </List>
    </div>
  </>
};

const SideBar = ({
  handleToggleDrawer,
  mobileOpen,
  drawerWidth,
}) => {
  return <>
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={handleToggleDrawer}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none', },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        PaperProps={{
          sx: {
            backgroundColor: PRIMARY_COLOR.bgColor,
            color: PRIMARY_COLOR.txtColor,
          }
        }}
      >
        <DrawerItems/>
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
        PaperProps={{
          sx: {
            backgroundColor: PRIMARY_COLOR.bgColor,
            color: PRIMARY_COLOR.txtColor,
          }
        }}
      >
        <DrawerItems/>
      </Drawer>
    </Box>
  </>
};

export default SideBar;