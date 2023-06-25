import { isEmpty } from "lodash";

const FormError = ({ errors }) => (
  <div>
    {!isEmpty(errors) && (
      <div
        className='mb-4'
        style={{ 
          backgroundColor: '#e74c3c', 
          color: 'white', 
          padding: '10px 25px 10px 25px', 
          fontSize: 14, 
        }}
        align='left'
      >
        {errors.map(err => (
          <div>
            {`* ${err[Object.keys(err)]}`}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default FormError;