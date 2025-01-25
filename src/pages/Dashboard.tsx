import React, { useEffect, useState } from 'react';
import * as S from "./styles";
import despesasMock from "../mocks/despesas.json";
import ChatGemini from "../components/chat-gemini/Chat-Gemini";
import http from '../http';
import DeleteForm from '../components/delete-form/delete';

const Dashboard = () => {
  const [despesas, setDespesas] = useState(despesasMock);
  const [despesaToDelete, setDespesaToDelete] = useState(null);
  const [isDeleteFormVisible, setIsDeleteFormVisible] = useState(false);

  useEffect(() => {
    const fetchDespesas = async () => {
      try {
        const response = await http.get('/despesas');
        setDespesas(response.data);
        console.log("Despesas fetched:", response.data);
      } catch (error) {
        console.error("Erro ao buscar despesas:", error);
      }
    };
    fetchDespesas();
  }, []);

  const deleteDespesa = async (despesaId) => {
    try {
      console.log("Deleting despesa with ID:", despesaId);
      await http.delete(`/despesas/${despesaId}`);
      setDespesas(prev => prev.filter(despesa => despesa.id !== despesaId));
    } catch (error) {
      console.error("Erro ao deletar despesa:", error);
    }
  };

  const handleDeleteClick = (despesa) => {
    setDespesaToDelete(despesa);
    setIsDeleteFormVisible(true);
  };

  const handleDeleteFormClose = () => {
    setIsDeleteFormVisible(false);
    setDespesaToDelete(null);
  };

  const calcularTotais = () => {
    const entradas = despesas
      .filter((d) => d.tipo === "entrada")
      .reduce((acc, d) => acc + d.valor, 0);

    const saidas = despesas
      .filter((d) => d.tipo === "saída")
      .reduce((acc, d) => acc + d.valor, 0);
    return { entradas, saidas, saldo: entradas - saidas };
  };

  const { entradas, saidas, saldo } = calcularTotais();

  return (
    <S.TableContainer>
      <S.Title>Dashboard de Finanças</S.Title>
      <S.CardsContainer>
        <S.Card bgColor="#FF8C00">
          <p>Entradas</p>
          <p>R$ {entradas.toFixed(2)}</p>
        </S.Card>
        <S.Card bgColor="#B22222">
          <p>Saídas</p>
          <p>R$ {saidas.toFixed(2)}</p>
        </S.Card>
        <S.Card bgColor="#006400">
          <p>Saldo</p>
          <p>R$ {saldo.toFixed(2)}</p>
        </S.Card>
      </S.CardsContainer>
      
      <S.StyledTable>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Data</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {despesas.map((despesa) => (
            <tr key={despesa.id}>
              <td>{despesa.descricao}</td>
              <td>{despesa.categoria}</td>
              <td>R$ {despesa.valor.toFixed(2)}</td>
              <td>{despesa.tipo}</td>
              <td>{despesa.data}</td>
              <td>
                <button onClick={() => handleDeleteClick(despesa)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </S.StyledTable>
      <ChatGemini despesas={despesas} />
      {isDeleteFormVisible && (
        <DeleteForm
          despesa={despesaToDelete}
          onClose={handleDeleteFormClose}
          onDelete={deleteDespesa}
        />
      )}
    </S.TableContainer>
  );
};

export default Dashboard;