import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  createTheme,
  ThemeProvider,
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Login = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
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
      switch (response.status) {
        case 200:
          const data = await response.json();
          localStorage.setItem('token', data.token);
          navigate('/home');
          break;
        case 401:
          setShowWarning(true);
          break;
        default:
          setShowError(true);
      }
    } catch (error) {
      setShowError(true);
    }
  };

  const themeLight = createTheme({
    palette: {
      primary: {
        main: "#778DA9",
      },
    },
  });

  const themeDark = createTheme({
    palette: {
      primary: {
        main: "#1B263B",
      },
    },
  });

  return(
    <>
      {showWarning && 
        <Stack sx={{ width: "30%", position: "absolute", zIndex: 9999 }} spacing={2}>
          <Alert severity="warning"><strong>Incorrect Username or Password</strong></Alert>
        </Stack>
      }

      {showError && 
        <Stack sx={{ width: "30%", position: "absolute", zIndex: 9999 }} spacing={2}>
          <Alert severity="error"><strong>Something went wrong :&#40;</strong></Alert>
        </Stack>
      }
      
      <div id="outer-square">
        <div id="title-container">
          <h1 id="title">To-Do</h1>
          <ThemeProvider theme={themeDark}>
            <Link to={"/register"}>
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
              <ThemeProvider theme={themeLight}>
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
              <ThemeProvider theme={themeLight}>
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