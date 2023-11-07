import { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#778DA9",
      },
    },
  });
  const theme2 = createTheme({
    palette: {
      primary: {
        main: "#1B263B",
      },
    },
  });
  return(
    <>
      <div id="outer-square">
        <div id="title-container">
          <h1 id="title">To-Do</h1>
          <ThemeProvider theme={theme2}>
            <Button
              size="large"
              variant="contained"
              type="submit"
              id="button"
            >Log out</Button>
          </ThemeProvider>
        </div>

        <div id="container">
          
        </div>
      </div>
    </>
  );
};

export default Login;