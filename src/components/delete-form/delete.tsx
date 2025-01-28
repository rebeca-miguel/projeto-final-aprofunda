import React from "react";
import * as S from "./style";
import http from "../../http";

interface Despesa {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  tipo: string;
  data: string;
}

interface DeleteFormProps {
  despesa: Despesa;
  onClose: () => void;
  onDelete: (id: number) => void;
}

const DeleteForm: React.FC<DeleteFormProps> = ({ despesa, onClose, onDelete }) => {
  const handleDelete = async () => {
    if (!despesa?.id) {
      console.error("Despesa ID inválido.");
      return;
    }

    try {
      
      onDelete(despesa.id);
      onClose();
    } catch (error) {
      console.error("Erro ao deletar despesa:", error);
    }
  };

  return (
    <S.FormContainer>
      <p>Deseja realmente excluir a despesa "{despesa.descricao}"?</p>
      <S.DeleteButton type="button" onClick={handleDelete}>
        Deletar
      </S.DeleteButton>
      <S.Button type="button" onClick={onClose}>
        Cancelar
      </S.Button>
    </S.FormContainer>
  );
};

export default DeleteForm;
