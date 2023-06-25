import './App.css';

import AppRoutes from './routes';

import { ToastContainer, Flip, } from 'react-toastify';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { PRIMARY_COLOR, PRIMARY_COLOR_YELLOW, SECONDARY_COLOR } from './utils';

const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR.bgColor,
      contrastText: PRIMARY_COLOR.txtColor,
    },
    secondary: {
      main: SECONDARY_COLOR.bgColor,
      contrastText: SECONDARY_COLOR.txtColor,
    },
    tertiary: {
      main: PRIMARY_COLOR_YELLOW.bgColor,
      contrastText: PRIMARY_COLOR_YELLOW.txtColor,
    }
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 16,
  },
});

function App() {
  return <>
    <div className='App'>
      <ThemeProvider {...{ theme }}>
        <AppRoutes/>
      </ThemeProvider>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
        transition={Flip}
      />
    </div>
  </>
};

export default App;
