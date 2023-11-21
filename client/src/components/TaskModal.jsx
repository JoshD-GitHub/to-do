import {
  createTheme,
  Button,
  FormControl,
  TextField,
  ThemeProvider,
} from '@mui/material';

const TaskModal = ({
  title,
  description,
  setTitle,
  setDescription,
  onSave,
  onClose,
  changesMade,
}) => {
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
              multiline
              className='overflow'
              label='Task Title *'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              variant='filled'
            />
            <TextField
              fullWidth
              multiline
              className='overflow'
              label='Task Description'
              onChange={(e) => setDescription(e.target.value)}
              rows={18}
              sx={{ mt: 2 }}
              value={description}
              variant='filled'
            />
            <Button
              id='button bottom'
              onClick={changesMade ? onSave : onClose}
              size='large'
              sx={{ mt: 2 }}
              type='submit'
              variant='contained'
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
