import { createContext, useContext, useState, useEffect } from "react";

export type ProductContextType = {
  name: string;
  description: string;
  price: number;
  category: string;
};

export interface ProductContextProps {
  product: ProductContextType | null;
  updateProduct: (product: Partial<ProductContextType>) => void;
  removeProduct: () => void;
}

export const ProductContext = createContext<ProductContextProps>({
  product: null,
  updateProduct: () => {},
  removeProduct: () => {},
});

export function ProductContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [product, setProduct] = useState<ProductContextType | null>(() => {
    if (typeof window !== "undefined") {
      const savedProduct = localStorage.getItem("product");
      return savedProduct ? JSON.parse(savedProduct) : null;
    }
    return null;
  });

  useEffect(() => {
    if (product) {
      localStorage.setItem("product", JSON.stringify(product));
    } else {
      localStorage.removeItem("product");
    }
  }, [product]);

  const updateProduct = (values: Partial<ProductContextType>) => {
    setProduct((prevProduct) => ({
      name: prevProduct?.name || "",
      description: prevProduct?.description || "",
      price: prevProduct?.price || 0,
      category: prevProduct?.category || "",
      ...values,
    }));
  };

  const removeProduct = () => {
    setProduct(null);
    localStorage.removeItem("product");
  };

  return (
    <ProductContext.Provider value={{ product, updateProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProductForm = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useProductForm must be used within a ProductContextProvider"
    );
  }
  return context;
};
