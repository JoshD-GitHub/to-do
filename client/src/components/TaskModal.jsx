import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider, Button, TextField } from '@mui/material';

const TaskModal = ({ title, description, setTitle, setDescription, onSave, onClose, changesMade }) => {
  const themeDark = createTheme({
    palette: {
      primary: {
        main: '#1B263B',
      },
    },
  });

  return (
    <div className='modal'>
      <div className='modal-content'>
        <FormControl fullWidth sx={{ m: 1 }}>
          <ThemeProvider theme={themeDark}>
            <TextField
              fullWidth
              className='overflow'
              variant='filled'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label='Task Title *'
              multiline
            />
            <TextField
              fullWidth
              className='overflow'
              variant='filled'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label='Task Description'
              multiline
              rows={18}
              sx={{ mt: 2 }}
            />
            <Button
              size='large'
              variant='contained'
              type='submit'
              id='button bottom'
              onClick={changesMade ? onSave : onClose}
              sx={{ mt: 2 }}
            >
              {changesMade ? 'Save' : 'Exit'}
            </Button>
          </ThemeProvider>
        </FormControl>
      </div>
    </div>
  );
};

export default TaskModal;
