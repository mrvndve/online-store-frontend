import {  FileOpen, Inventory2 } from '@mui/icons-material';

const EmptyBanner = ({
  text = 'No Records Found',
  product = false,
}) => {
  return <>
    <div 
      style={{
        height: '100%',
        width: '100%',
        color: 'lightgrey',
      }}
    >
      <div className='d-flex align-items-center justify-content-center h-100'>
        <h4>
          {!product 
            ? (
              <FileOpen className='me-2' style={{ fontSize: 50 }}/>
            )
            : (
              <Inventory2 className='me-2' style={{ fontSize: 50 }}/>
            )
          }
        
          {text}
        </h4>
      </div>
    </div>
  </>
}

export default EmptyBanner;