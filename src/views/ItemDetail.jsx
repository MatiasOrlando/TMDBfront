import React from "react";
import { useParams } from "react-router-dom";
import ItemDetailContainer from "../components/ItemDetailContainer/ItemDetailContainer";

const ItemDetail = () => {
  const { categoryId, id } = useParams();
  return <ItemDetailContainer id={id} categoryId={categoryId} />;
};

export default ItemDetail;
