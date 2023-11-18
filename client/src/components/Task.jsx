import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Task = () => {
  const [tasks, setTasks] = useState([]);

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

  return(
    <>
      {
        tasks && tasks.map((task) => (
          <div id="task" key={task.id}>
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
    </>
  );
};

export default Task;