// import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import Input from '@mui/material/Input';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import DragHandleIcon from '@mui/icons-material/DragHandle';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Task from './Task';

const Home = () => {

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
      <div id="outer-square">
        <div id="title-container">
          <h1 id="title">To-Do</h1>
          <ThemeProvider theme={themeDark}>
            <Button
              size="large"
              variant="contained"
              type="submit"
              id="button"
            >Log out</Button>
          </ThemeProvider>
        </div>

        <div id="task-container">
          {/* <div id="task">
            <IconButton style={{ color: "#1B263B", marginLeft: "10px" }}>
              <DragHandleIcon />
            </IconButton>
            <div style={{ flex: 1 }}></div>
            <IconButton style={{ color: "#1B263B", marginRight: "10px" }}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </div> */}

          <Task />

          <div id="circle">
            <IconButton style={{ color: "#1B263B" }}>
              <AddCircleIcon style={{ width: "50px", height: "50px" }}/>
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;