export type Category = {
  id: string;
  name: string;
  createdAt: string;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  categoryId: string | null;
  price: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type StockMovementType = "in" | "out" | "adjustment";

export type StockMovement = {
  id: string;
  productId: string;
  type: StockMovementType;
  qty: number;
  note: string | null;
  createdAt: string;
};

export type SaleItem = {
  id: string;
  saleId: string;
  productId: string;
  qty: number;
  price: number;
};

export type Sale = {
  id: string;
  total: number;
  paid: number;
  change: number;
  createdAt: string;
  items: SaleItem[];
};
