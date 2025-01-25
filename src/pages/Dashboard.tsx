import React, { useEffect, useState } from 'react';
import * as S from "./styles";
import despesasMock from "../mocks/despesas.json";
import ChatGemini from "../components/chat-gemini/Chat-Gemini";
import http from '../http';

const Dashboard = () => {
  const [despesas, setDespesas] = useState(despesasMock);

  useEffect(() => {
  const fetchDespesas = async () => {
      try {
      const response = await http.get('/despesas');
         setDespesas(response.data);
         console.log(response.data)
      } catch (error) {
         console.error("Erro ao buscar despesas:", error);
       }
     };
     fetchDespesas();
   }, []);


   const deleteDespesa =  async (despesaId) => {
    console.log(despesaId)

    try {
      const response = await http.delete(`/despesas/${despesaId}`);
      setDespesas(prev => prev.filter(despesa => despesa.id !== despesaId))
      } catch (error) {
         console.error("Erro ao buscar despesas:", error);
       }
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
      {/* Totais de Entradas, Saídas e Saldo */}
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
      
      {/* Tabela com os dados das despesas */}
      <S.StyledTable>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Data</th>
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
              <button onClick={() =>{ deleteDespesa(despesa.id)}}>X</button>
            </tr>
          ))}
        </tbody>
      </S.StyledTable>
      <ChatGemini despesas={despesas} />
    </S.TableContainer>
  );
};

export default Dashboard;