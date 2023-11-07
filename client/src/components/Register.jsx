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
      <div id="square">
        <div id="title-container">
          <h1 id="title">To-Do</h1>
          <ThemeProvider theme={theme2}>
            <Button
              size="large"
              variant="contained"
              type="submit"
              id="register-button"
            >Log In</Button>
          </ThemeProvider>
        </div>

        <div id="form-container">
          <div id="form-box">
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel style={{ color: "#E0E1DD" }}>Username</InputLabel>
              <ThemeProvider theme={theme}>
                <Input style={{ color: "#E0E1DD" }} className="center"/>
              </ThemeProvider>
            </FormControl> <br />
            
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel style={{ color: "#E0E1DD" }}>Password</InputLabel>
              <ThemeProvider theme={theme}>
                <Input
                  style={{ color: "#E0E1DD" }}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        style={{ color: "#E0E1DD" }}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </ThemeProvider>
            </FormControl> <br />

            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel style={{ color: "#E0E1DD" }}>Confirm Password</InputLabel>
              <ThemeProvider theme={theme}>
                <Input
                  style={{ color: "#E0E1DD" }}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        style={{ color: "#E0E1DD" }}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </ThemeProvider>
            </FormControl> <br />

            <Button
              style={{ color: "#E0E1DD" }}
              variant="text"
              type="submit"
            >Register</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;