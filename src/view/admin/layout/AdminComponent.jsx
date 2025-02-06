import { useState, useEffect } from "react";
import api from "@/services/api";
import TableComponent from "@/components/table/TableComponent";
import Header from "@/components/header/Header";

const fetchData = async (getTipos, setState) => {
  try {
    const response = await api.get(`/${getTipos}`);

    const key = Object.keys(response.data)[0];
    const data = Array.isArray(response.data[key]) ? response.data[key] : response.data;

    setState(data);

  } catch (error) {
    console.error(`Erro ao carregar dados de ${getTipos}:`, error);
  }
};

function AdminComponent({ tipo, getTipos, getTipo }) {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    fetchData(getTipos, setDados);
  }, [getTipos]);

  return (
    <>
      <Header titulo={`Limpaeh - ${tipo}`} />
      <TableComponent
        dados={dados}
        setDados={setDados}
        handleExcluir={`/${getTipo}`}
        tipo={tipo}
        cadastrarUrl={`/admin/${getTipos}/cadastrar`}
        editarUrl={`/admin/${getTipos}/editar`}
        isAdmin={true}
      />
    </>
  );
}

export default AdminComponent;
