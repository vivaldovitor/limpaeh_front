import React, { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';

const TaskCard = ({ title, responsible }) => {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => setCompleted(true);

  return (
    <Box
      sx={{
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: completed ? '#d4edda' : '#fff',
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1" sx={{ marginY: 1 }}>
        {completed ? 'Tarefa concluída' : `Responsável: ${responsible}`}
      </Typography>
      {!completed && (
        <Button variant="contained" color="primary" onClick={handleComplete}>
          Concluir
        </Button>
      )}
    </Box>
  );
};

export default TaskCard;