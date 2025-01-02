import { AppBar, Toolbar, Typography, Grid2 } from '@mui/material';
import TaskCard from './TaskCard';

const TaskGrid = () => {
    return (
      <Grid2 container spacing={2} sx={{ padding: 2 }}>
        <AppBar position="static" sx={{ marginBottom: 2 }}>
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1, textAlign: 'center' }}>
              Tarefas de Limpeza
            </Typography>
          </Toolbar>
        </AppBar>
  
        <Grid2 xs={12} sm={6} md={4}>
          <TaskCard title="Banheiro - Bloco A" responsible="João" />
        </Grid2>
        <Grid2 xs={12} sm={6} md={4}>
          <TaskCard title="Laboratório de Informática 1" responsible="Maria" />
        </Grid2>
        <Grid2>
          <TaskCard title="Laboratório de Informática 2" responsible="José" />
        </Grid2>
  
      </Grid2>
    );
  };
  
export default TaskGrid;