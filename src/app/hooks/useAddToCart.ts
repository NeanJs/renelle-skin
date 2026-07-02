import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAddToCart(onAddComplete?: (item: any) => void) {
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (item: any) => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      onAddComplete?.(item);
      navigate("/checkout", { state: { kit: item } });
    }, 800);
  };

  return { isAdding, handleAddToCart };
}
