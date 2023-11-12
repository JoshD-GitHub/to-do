import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';x
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
} from '@mui/material';


const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = formData;
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        console.log('Log in failed');
      }
    } catch (error) {
      console.log(error);
    }
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
            <Link to={'/register'}>
              <Button
                size="large"
                variant="contained"
                type="submit"
                id="button"
              >Register</Button>
            </Link>
          </ThemeProvider>
        </div>

        <div id="container">
          <form id="form-box" onSubmit={handleSubmit}>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel style={{ color: "#E0E1DD" }}>Username</InputLabel>
              <ThemeProvider theme={theme}>
                <Input
                  required
                  name="username"
                  onChange={handleChange}
                  value={formData.username}
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
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
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
            >Log In</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;