import { useEffect, useState, useRef } from "react";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
  createTheme,
  ThemeProvider,
  Button,
  FormControl,
  IconButton,
  TextField,
  Stack,
  Alert,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const Task = () => {
  const [showError, setShowError] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [createTitle, setCreateTitle] = useState('');
  const [createDescription, setCreateDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const isFuncInProgress = useRef(false);

  const changesMade = selectedTask && (
    editedTitle !== selectedTask.taskTitle ||
    editedDescription !== selectedTask.taskDescription
  );

  const createChangesMade = (
    createTitle !== '' ||
    createDescription !== ''
  );

  const openCreateModal = () => {
    setCreateTitle('');
    setCreateDescription('');
    setIsCreating(true);
  };

  const closeCreateModal = () => {
    setIsCreating(false);
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const openModal = (task) => {
    if (!isFuncInProgress.current) {
      setSelectedTask(task);
      setEditedTitle(task.taskTitle);
      setEditedDescription(task.taskDescription);
      setIsEditing(true);
    }
  };

  const closeModal = () => {
    setIsEditing(false);
    setSelectedTask(null);
  };

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

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/task/${selectedTask.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskTitle: editedTitle,
          taskDescription: editedDescription,
        }),
      });

      switch (response.status) {
        case 200:
          fetchTask();
          closeModal();
          break;
        case 400:
          setShowWarning(true);
          setTimeout(() => {setShowWarning(false)}, 5000);
          break;
        default:
          setShowError(true);
          setTimeout(() => {setShowError(false)}, 5000);
      }
    } catch (error) {
      setShowError(true);
      setTimeout(() => {setShowError(false)}, 5000);
    }
  };

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/task/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskTitle: createTitle,
          taskDescription: createDescription,
        }),
      });

      switch (response.status) {
        case 201:
          fetchTask();
          closeCreateModal();
          break;
        case 400:
          setShowWarning(true);
          setTimeout(() => {setShowWarning(false)}, 5000);
          break;
        default:
          setShowError(true);
          setTimeout(() => {setShowError(false)}, 5000);
      }
    } catch (error) {
      setShowError(true);
      setTimeout(() => {setShowError(false)}, 5000);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      isFuncInProgress.current = true;
      setTimeout(() => {isFuncInProgress.current = false}, 500);
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/task/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      switch (response.status) {
        case 200:
          fetchTask();
          closeCreateModal();
          break;
        case 404:
          setShowWarning(true);
          setTimeout(() => {setShowWarning(false)}, 5000);
          break;
        default:
          setShowError(true);
          setTimeout(() => {setShowError(false)}, 5000);
      }
    } catch (error) {
      setShowError(true);
      setTimeout(() => {setShowError(false)}, 5000);
    }
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
  
  return(
    <>
      {showWarning && 
        <Stack sx={{ width: "25%", position: "absolute", zIndex: 9999 }} spacing={2}>
          <Alert severity="warning"><strong>* Title required</strong></Alert>
        </Stack>
      }

      {showError && 
        <Stack sx={{ width: "25%", position: "absolute", zIndex: 9999 }} spacing={2}>
          <Alert severity="error"><strong>Something went wrong :&#40;</strong></Alert>
        </Stack>
      }


      {tasks && 
        tasks.map((task) => (
          <div id="task" key={task.id} onClick={() => openModal(task)}>
            <IconButton style={{ color: "#1B263B", marginLeft: "10px" }}>
              <DragHandleIcon />
            </IconButton>
            <div style={{ flex: 1 }}>
              <p>{task.taskTitle}</p>
            </div>
            <IconButton style={{ color: "#1B263B", marginRight: "10px" }} onClick={() => handleDelete(task.id)}>
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
                  label="Task Title *"
                  multiline
                />
                <TextField
                  fullWidth
                  className="overflow"
                  variant="filled"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  label="Task Description"
                  multiline
                  rows={18}
                  sx={{ mt: 2 }}
                />
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

      {isCreating && (
        <div className="modal">
          <div className="modal-content">            
            <FormControl fullWidth sx={{ m: 1 }}>
              <ThemeProvider theme={themeDark}>
                <TextField
                  fullWidth
                  variant="filled"
                  value={createTitle}
                  onChange={(e) => setCreateTitle(e.target.value)}
                  label="Task Title *"
                  multiline
                />
                <TextField
                  fullWidth
                  className="overflow"
                  variant="filled"
                  value={createDescription}
                  onChange={(e) => setCreateDescription(e.target.value)}
                  label="Task Description"
                  multiline
                  rows={18}
                  sx={{ mt: 2 }}
                />
                <Button
                  size="large"
                  variant="contained"
                  type="submit"
                  id="button bottom"
                  onClick={createChangesMade ? handleCreate : closeCreateModal}
                  sx={{ mt: 2 }}>
                  {createChangesMade ? 'Create' : 'Exit'}
                </Button>
              </ThemeProvider>
            </FormControl>
          </div>
        </div>
      )}

      <div id="circle">
        <IconButton style={{ color: "#1B263B" }} onClick={() => openCreateModal()}>
          <AddCircleIcon style={{ width: "50px", height: "50px" }} />
        </IconButton>
      </div>
    </>
  );
};

export default Task;