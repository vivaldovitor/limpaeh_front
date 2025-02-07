import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Box,
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

  // Recuperar horário do localStorage ao carregar a página
  const storedHorarioInicio = localStorage.getItem(`horario_inicio_${atividadeId}`);
  const storedStatus = localStorage.getItem(`status_atividade_${atividadeId}`);

  const [formValues, setFormValues] = useState({
    horario_inicio: storedHorarioInicio ? dayjs(storedHorarioInicio) : "",
    horario_fim: "",
  });

  const [status, setStatus] = useState(storedStatus || "PENDENTE");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (storedHorarioInicio) {
      setFormValues((prevValues) => ({
        ...prevValues,
        horario_inicio: dayjs(storedHorarioInicio),
      }));
    }
    if (storedStatus) {
      setStatus(storedStatus);
    }
  }, [storedHorarioInicio, storedStatus]);

  const handleStart = async () => {
    if (window.confirm("Iniciar atividade?")) {
      const startTime = dayjs();

      setFormValues((prevValues) => ({
        ...prevValues,
        horario_inicio: startTime,
      }));

      localStorage.setItem(`horario_inicio_${atividadeId}`, startTime.toISOString());
      localStorage.setItem(`status_atividade_${atividadeId}`, "EM_ANDAMENTO");

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

  const handleSubmit = async () => {
    if (window.confirm("Tem certeza que deseja finalizar?")) {

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

        // Remover dados do localStorage após finalizar
        localStorage.removeItem(`horario_inicio_${atividadeId}`);
        localStorage.removeItem(`status_atividade_${atividadeId}`);
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Relatório
        </Typography>

        <DateTimePicker
          label="Horário de Início"
          value={formValues.horario_inicio || null}
          disabled
          renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleStart}
          style={{marginLeft: 10}}
          disabled={Boolean(formValues.horario_inicio)}
        >
          Iniciar
        </Button>

        {fields.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            fullWidth
            margin="normal"
            name={field.name}
            value={formValues[field.name]}
            onChange={(e) =>
              setFormValues({ ...formValues, [e.target.name]: e.target.value })
            }
            disabled={status !== "EM_ANDAMENTO"}
          />
        ))}

        {status === "EM_ANDAMENTO" && (
          <>
            <DateTimePicker
              label="Horário de Fim"
              value={formValues.horario_fim || null}
              disabled
              renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{marginLeft: 10}}
              disabled={!formValues.horario_inicio}
            >
              Finalizar
            </Button>
          </>
        )}

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>

      <br />

      <Button variant="contained" color="secondary" onClick={() => goTo("/funcionario/atividades")}>
        Voltar
      </Button>
    </LocalizationProvider>
  );
}

export default ReportsPage;
