import { useEffect, useRef, useState } from 'react';
import { Alert, IconButton, Stack } from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TaskList from './TaskList';
import TaskModal from './TaskModal';

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

  const changesMade =
    selectedTask &&
    (editedTitle !== selectedTask.taskTitle ||
      editedDescription !== selectedTask.taskDescription);

  const createChangesMade = createTitle !== '' || createDescription !== '';

  const openCreateModal = () => {
    setCreateTitle('');
    setCreateDescription('');
    setIsCreating(true);
  };

  const closeCreateModal = () => {
    setIsCreating(false);
  };

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
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setTasks(data);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/task/${selectedTask.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
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
          setTimeout(() => {
            setShowWarning(false);
          }, 5000);
          break;
        default:
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 5000);
      }
    } catch (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  };

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/task/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
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
          setTimeout(() => {
            setShowWarning(false);
          }, 5000);
          break;
        default:
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 5000);
      }
    } catch (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      isFuncInProgress.current = true;
      setTimeout(() => {
        isFuncInProgress.current = false;
      }, 500);
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/task/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
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
          setTimeout(() => {
            setShowWarning(false);
          }, 5000);
          break;
        default:
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 5000);
      }
    } catch (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  };
  
  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <>
      {showWarning && (
        <Stack
          sx={{ width: '25%', position: 'absolute', zIndex: 9999 }}
          spacing={2}
        >
          <Alert severity='warning'>
            <strong>* Title required</strong>
          </Alert>
        </Stack>
      )}

      {showError && (
        <Stack
          sx={{ width: '25%', position: 'absolute', zIndex: 9999 }}
          spacing={2}
        >
          <Alert severity='error'>
            <strong>Something went wrong :&#40;</strong>
          </Alert>
        </Stack>
      )}

      <TaskList
        tasks={tasks}
        openModal={openModal}
        handleDelete={handleDelete}
      />

      {isEditing && (
        <TaskModal
          title={editedTitle}
          description={editedDescription}
          setTitle={setEditedTitle}
          setDescription={setEditedDescription}
          onSave={handleSave}
          onClose={closeModal}
          changesMade={changesMade}
        />
      )}

      {isCreating && (
        <TaskModal
          title={createTitle}
          description={createDescription}
          setTitle={setCreateTitle}
          setDescription={setCreateDescription}
          onSave={handleCreate}
          onClose={closeCreateModal}
          changesMade={createChangesMade}
        />
      )}

      <div id='circle'>
        <IconButton
          style={{ color: '#1B263B' }}
          onClick={() => openCreateModal()}
        >
          <AddCircleIcon style={{ width: '50px', height: '50px' }} />
        </IconButton>
      </div>
    </>
  );
};

export default Task;
