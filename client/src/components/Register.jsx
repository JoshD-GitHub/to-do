import { Link } from "react-router-dom";
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
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
            <Link to={'/'}>
              <Button
                size="large"
                variant="contained"
                type="submit"
                id="button"
              >Log In</Button>
            </Link>
          </ThemeProvider>
        </div>

        <div id="container">
          <div id="form-box">
            <form id="form-box" onSubmit={handleSubmit}>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                <InputLabel style={{ color: "#E0E1DD" }}>Username</InputLabel>
                <ThemeProvider theme={theme}>
                  <Input
                    required
                    style={{ color: "#E0E1DD" }}
                    className="center"
                  />
                </ThemeProvider>
              </FormControl> <br />
              
              <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                <InputLabel style={{ color: "#E0E1DD" }}>Password</InputLabel>
                <ThemeProvider theme={theme}>
                  <Input
                    required
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
                    required
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;