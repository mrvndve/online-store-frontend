import React from 'react';

import {
  Breadcrumbs as MUIBreadCrumbs,
  Stack,
  Link,
} from '@mui/material';

import {
  NavigateNext,
} from '@mui/icons-material';

import { useNavigate } from 'react-router';


const BreadCrumbs = ({ links }) => {
  const navigate = useNavigate();

  return <>
    <Stack spacing={2}>
      <MUIBreadCrumbs>
        {links && links.map((link, i) => (
          <div key={i}>
            <Link 
              style={{
                fontSize: 12, 
                pointerEvents: link?.active ? 'none' : '',
              }}
              className='breadcrumbs-link'
              role='button'
              key={i}
              underline='hover'
              color={link.color ? link.color : 'inherit'}
              onClick={() => navigate(link.to)}
            >
              <strong>
                <span className='me-1'>
                  {link.icon && 
                    link.icon
                  }
                </span>

                {link.label}
              </strong>
            </Link>
          </div>
        ))}
      </MUIBreadCrumbs>
    </Stack>
  </>
};

export default BreadCrumbs;