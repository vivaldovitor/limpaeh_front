import api from "../../../services/api";

const ExcluirItem = async (id, endpoint, setData, data) => {
  try {
    const response = await api.delete(`${endpoint}/${id}`);
    if (response.status === 200) {
      setData(data.filter(item => item.id !== id));
      console.log(`${endpoint} excluído com sucesso`);
    }
  } catch (error) {
    console.error(`Erro ao excluir ${endpoint}:`, error);
  }
};

export default ExcluirItem;
