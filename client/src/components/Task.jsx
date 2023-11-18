import { useEffect, useState } from "react";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
  createTheme,
  ThemeProvider,
  Button,
  FormControl,
  IconButton,
  TextField
} from '@mui/material';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/task/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }});
      const data = await response.json();
      setTasks(data);
    };

    fetchTask();
  }, []);

  const openModal = (task) => {
    setSelectedTask(task);
    setEditedTitle(task.taskTitle);
    setEditedDescription(task.taskDescription);
    setIsEditing(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setSelectedTask(null);
  };

  const handleSave = () => {
    // send a request to your server to update the task
    closeModal();
  };

  const themeLight = createTheme({
    palette: {
      primary: {
        main: "#415A77",
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

  const changesMade = selectedTask && (
    editedTitle !== selectedTask.taskTitle ||
    editedDescription !== selectedTask.taskDescription
  );

  return(
    <>
      {
        tasks && tasks.map((task) => (
          <div id="task" key={task.id} onClick={() => openModal(task)}>
            <IconButton style={{ color: "#1B263B", marginLeft: "10px" }}>
              <DragHandleIcon />
            </IconButton>
            <div style={{ flex: 1 }}>
              <p>{task.taskTitle}</p>
            </div>
            <IconButton style={{ color: "#1B263B", marginRight: "10px" }}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </div>
        ))
      }

      {isEditing && (
        <div className="modal">
          <div className="modal-content">            
            <FormControl fullWidth sx={{ m: 1 }}>
              <ThemeProvider theme={themeDark}>
                <TextField
                  fullWidth
                  variant="filled"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  label="Title"
                  multiline
                />
                <TextField
                  fullWidth
                  className="overflow"
                  variant="filled"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  label="Description"
                  multiline
                  rows={18}
                  sx={{ mt: 2 }}
                />
              </ThemeProvider>
              <ThemeProvider theme={themeDark}>
                <Button
                  size="large"
                  variant="contained"
                  type="submit"
                  id="button bottom"
                  onClick={changesMade ? handleSave : closeModal}
                  sx={{ mt: 2 }}>
                  {changesMade ? 'Save' : 'Exit'}
                </Button>
              </ThemeProvider>
            </FormControl>
          </div>
        </div>
      )}
    </>
  );
};

export default Task;