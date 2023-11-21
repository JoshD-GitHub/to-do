import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Task from "./Task";

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

  return (
    <>
      <div id="outer-square">
        <div id="title-container">
          <h1 id="title">To-Do</h1>
          <ThemeProvider theme={themeDark}>
            <Button size="large" variant="contained" type="submit" id="button">
              Log out
            </Button>
          </ThemeProvider>
        </div>

        <div id="task-container">
          <Task />
        </div>
      </div>
    </>
  );
};

export default Home;
