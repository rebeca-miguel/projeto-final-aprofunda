import React from "react";
import * as S from "./styles";
import Despesa from "../../pages/Dashboard";
import http from "../../http";

interface DeleteFormProps {
  despesa: Despesa;
  onClose: () => void;
  onDelete: (id: number) => void;
}

const DeleteForm: React.FC<DeleteFormProps> = ({ despesa, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      await http.delete(`/despesas/${despesa.id}`);
      onDelete(despesa.id); // Remove o item da lista
      onClose();
    } catch (error) {
      console.error("Erro ao deletar despesa:", error);
    }
  };

  return (
    <S.FormContainer>
      <S.DeleteButton type="button" onClick={handleDelete}>
        Deletar
      </S.DeleteButton>
      <S.Button type="button" onClick={onClose}>Cancelar</S.Button>
    </S.FormContainer>
  );
};

export default DeleteForm;