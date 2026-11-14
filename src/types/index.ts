export type Category = {
  id: number;
  name: string;
  createdAt: string;
};

export type Product = {
  id: number;
  sku: string;
  name: string;
  categoryId: number | null;
  price: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type StockMovementType = "in" | "out" | "adjustment";

export type StockMovement = {
  id: number;
  productId: number;
  type: StockMovementType;
  qty: number;
  note: string | null;
  createdAt: string;
};

export type SaleItem = {
  id: number;
  saleId: number;
  productId: number;
  qty: number;
  price: number;
};

export type Sale = {
  id: number;
  total: number;
  paid: number;
  change: number;
  createdAt: string;
  items: SaleItem[];
};
