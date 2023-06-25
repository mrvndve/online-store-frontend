import React from 'react';

import { 
  Box, 
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
} from "@mui/material";

import { isEmpty } from "lodash";

import { 
  CloudUpload,
  Delete,
  FolderCopy,
} from '@mui/icons-material';

import useUploader from '../hooks/use-uploader';
import { apiDomain, PRIMARY_COLOR } from '../utils';

const Uploader = ({
  type,
  files,
  setFiles,
}) => {
  const {
    handleUpload,
    handleRemoveUpload,
    acceptedFileTypes,
  } = useUploader({
    type,
    files,
    setFiles,
  })

  return <>
    <div align='right'>
      <Paper className='p-3' variant='outlined'>
        <div className='row g-4'>
          {!isEmpty(files) && (
            <div className='col-12'>
              {files.map((i, index) => (
                <List 
                  dense
                  sx={{
                    '& > :not(style)': {
                      '&:hover': {
                        backgroundColor: 'whitesmoke',
                      },
                    },
                  }}
                >
                  <ListItem 
                    secondaryAction={
                      <IconButton 
                        style={{ marginRight: 0.5 }} 
                        edge='end'
                        onClick={() => handleRemoveUpload(index)}
                        size='small'
                      >
                        <Delete/>
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar src={i.base64 ? i.base64 : `${apiDomain}/uploads/${i.fileName}`}>
                        <FolderCopy/>
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText primary={<strong>{i.fileName}</strong>}/>          
                  </ListItem>
                </List>
              ))}
            </div>
          )}

          <div className='col-12'>
            <Box
              sx={{
                '& > :not(style)': {
                  width: '100%',
                  color: 'lightgrey',
                  cursor: 'pointer',
                  borderStyle: 'dashed',
                  borderWidth: 3,
                  borderColor: 'lightgrey',
                  '&:hover': {
                    color: PRIMARY_COLOR.bgColor,
                    borderColor: PRIMARY_COLOR.bgColor,
                  },
                },
              }}
            >
              <Paper 
                variant='outlined' 
                square 
                component='label'
                sx={{
                  padding: 1
                }}
              >
                <div align='center'>
                  <div>
                    <CloudUpload className='mx-2' style={{ fontSize: 20, marginBottom: 4 }}/>

                    <strong>
                      Upload File
                    </strong>
                  </div>

                  <input 
                    hidden 
                    accept={acceptedFileTypes}
                    multiple 
                    type='file'
                    onChange={handleUpload}
                  />
                </div>
              </Paper>
            </Box>
          </div>
        </div>
      </Paper>
    </div>
  </>
};

export {
  Uploader,
}