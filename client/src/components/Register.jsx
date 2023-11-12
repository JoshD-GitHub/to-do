import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  Alert,
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  Stack,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
  });
  const passwordsMatch = formData.password === formData.passwordConfirm;
  

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);

  const handleMouseDownPasswordConfirm = (event) => {
    event.preventDefault();
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = formData;
    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      switch (response.status) {
        case 201:
          const data = await response.json();
          localStorage.setItem('token', data.token);
          navigate('/home');
          break;
        case 409:
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
          <Alert severity="warning"><strong>Username already exists</strong></Alert>
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

            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel style={{ color: "#E0E1DD" }}>Confirm Password</InputLabel>
              <ThemeProvider theme={themeLight}>
                <Input
                  required
                  name="passwordConfirm"
                  onChange={handleChange}
                  value={formData.passwordConfirm}
                  style={{ color: "#E0E1DD" }}
                  type={showPasswordConfirm ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        style={{ color: "#E0E1DD" }}
                        onClick={handleClickShowPasswordConfirm}
                        onMouseDown={handleMouseDownPasswordConfirm}
                      >
                        {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </ThemeProvider>
            </FormControl> <br />

            <Button
              style={passwordsMatch ? { color: "#E0E1DD" } : { color: "#1B263B" }}
              variant="text"
              type="submit"
              disabled={!passwordsMatch}
            >Register</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;