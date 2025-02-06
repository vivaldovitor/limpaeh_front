import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import useCustomNavigate from "../hooks/useCustomNavigate";
import { useAuth } from "../context/AuthContext.jsx";
import useLoadOptions from "../hooks/useLoadOptions.js";
import { useParams } from "react-router-dom";

function ReportsPage({ fields, submitUrl }) {
  const { goTo } = useCustomNavigate();
  const { atividadeId } = useParams();
  const { user } = useAuth();
  const { enviarRelatorio, atualizarStatusAtividade } = useLoadOptions();
  
  const funcionario_id = user?.id;

  const [formValues, setFormValues] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {})
  );
  const [status, setStatus] = useState("PENDENTE");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleStart = async () => {
    if (window.confirm("Iniciar atividade?")) {
      const startTime = dayjs();

      setFormValues((prevValues) => ({
        ...prevValues,
        horario_inicio: startTime,
      }));

      try {
        await atualizarStatusAtividade(atividadeId, "EM_ANDAMENTO");
        setStatus("EM_ANDAMENTO");

        setSnackbarMessage("Atividade iniciada!");
        setSnackbarSeverity("info");
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarMessage("Erro ao atualizar status da atividade.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  const handleCancel = () => {
    if (window.confirm("Tem certeza que deseja voltar? (O relatório será reiniciado!)")) {
      goTo("/funcionario/atividades");
    }
  };

  const handleSubmit = async () => {
    if (window.confirm("Tem certeza que deseja finalizar?")) {
      if (!formValues.horario_inicio) {
        setSnackbarMessage("Você precisa iniciar a atividade antes de finalizar!");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      const endTime = dayjs();

      const report = {
        ...formValues,
        funcionario_id,
        atividade_id: Number(atividadeId),
        horario_inicio: formValues.horario_inicio.format("HH:mm:ss"),
        horario_fim: endTime.format("HH:mm:ss"),
      };

      try {
        await enviarRelatorio(report, submitUrl);
        await atualizarStatusAtividade(atividadeId, "FINALIZADO");

        setSnackbarMessage("Relatório enviado com sucesso!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);

        setFormValues((prevValues) => ({
          ...prevValues,
          horario_fim: endTime,
        }));
        setStatus("FINALIZADO");
      } catch (error) {
        setSnackbarMessage("Erro ao enviar relatório.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Relatório
        </Typography>

        {fields.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            fullWidth
            margin="normal"
            name={field.name}
            value={formValues[field.name]}
            onChange={handleChange}
            disabled={status !== "EM_ANDAMENTO"}
          />
        ))}

        <DateTimePicker
          label="Horário de Início"
          value={formValues.horario_inicio || null}
          disabled
          renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
        />

        <DateTimePicker
          label="Horário de Fim"
          value={formValues.horario_fim || null}
          disabled
          renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleStart}
          style={{ marginRight: 10 }}
          disabled={Boolean(formValues.horario_inicio)}
        >
          Iniciar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!formValues.horario_inicio || Boolean(formValues.horario_fim)}
          style={{ marginRight: 10 }}
        >
          Finalizar
        </Button>
        <Button variant="contained" color="secondary" onClick={handleCancel}>
          Voltar
        </Button>

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
}

export default ReportsPage;
