import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const TaskList = ({ tasks, openModal, handleDelete }) => {
  return (
    <>
      {tasks &&
        tasks.map((task) => (
          <div id='task' key={task.id} onClick={() => openModal(task)}>
            <div style={{ flex: 1 }}>
              <p>{task.taskTitle}</p>
            </div>
            <IconButton
              style={{ color: '#1B263B', marginRight: '10px' }}
              onClick={() => handleDelete(task.id)}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </div>
        ))}
    </>
  );
};

export default TaskList;
