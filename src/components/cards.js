import React from 'react';

import { 
  Paper,
  Card as MUICard,
  CardHeader,
  CardMedia,
  CardContent,
} from '@mui/material';

import { 
  apiDomain, 
} from '../utils';

const Card = ({
  className = '',
  style = {},
  padding,
  elevation = 1,
  square = true,
  children,
  onClick,
  ...rest
}) => {
  return <>
    <Paper
      className={className}
      style={{...{
        padding: padding,
      }, ...style}}
      square={square}
      elevation={elevation}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Paper>
  </>
};

const CardWithMedia = ({
  className,
  style = {},
  contentStyle = {},
  title,
  subheader,
  children,
}) => {
  return <>
    <MUICard
      className={className}
      style={{...{}, ...style}}
    >
      <CardHeader
        title={title}
        subheader={subheader}
      />

      <CardMedia
        component='img'
        height='150'
        image={`${apiDomain}/uploads/book-lessons.jpeg`}
        alt=''
      />

      <CardContent style={{...{}, ...contentStyle}}>
        <div>
          {children}
        </div>
      </CardContent>
    </MUICard>
  </>
}

export {
  Card,
  CardWithMedia,
};