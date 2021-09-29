import { createSelector } from "reselect";
import { AppState } from "./reducers/rootReducer";
import { useSelector, TypedUseSelectorHook } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

export const getCart = createSelector(
  (state: AppState) => state.cart,
  (cart) => cart
);

export const getNumberCartItems = createSelector(
  getCart,
  (cart) => cart.length
);

export const getTotalPrice = createSelector(getCart, (cart) => {
  let total = 0;

  if (cart.length !== 0) {
    total = cart
      .map((product) => product.price * product.quantity)
      .reduce((a, b) => a + b);
  }

  return total;
});

export const getProduct = createSelector(
  (state: AppState) => state.product.loading,
  (state: AppState) => state.product.data,
  (state: AppState) => state.product.error,
  (loading, product, error) => ({
    loading,
    product,
    error,
  })
);

const catalogLoadingSelector = (state: AppState) => state.catalog.loading;
const catalogItemsSelector = (state: AppState) => state.catalog.data;
const catalogErrorSelector = (state: AppState) => state.catalog.error;
const catalogOrderBySelector = (state: AppState) => state.filterBy.orderBy;
const catalogFilterByBrandSelector = (state: AppState) => state.filterBy.brand;
const catalogFilterByPriceSelector = (state: AppState) => state.filterBy.price;
const catalogFilterByRAMSelector = (state: AppState) => state.filterBy.ram;
const catalogFilterByInternalStorageSelector = (state: AppState) =>
  state.filterBy.internalStorage;

const catalogItemsFilterBy = createSelector(
  catalogItemsSelector,
  catalogFilterByBrandSelector,
  catalogFilterByPriceSelector,
  catalogFilterByRAMSelector,
  catalogFilterByInternalStorageSelector,
  (
    items,
    filterByBrand,
    filterByPrice,
    filterByRAM,
    filterByInternalStorage
  ) => {
    if (!items || items.length === 0) return [];

    return items.filter((item) => {
      const matchBrand =
        filterByBrand.length !== 0 ? filterByBrand.includes(item.brand) : true;
      const matchRAM =
        filterByRAM.length !== 0 ? filterByRAM.includes(item.ram) : true;
      const matchInternalStorage =
        filterByInternalStorage.length !== 0
          ? filterByInternalStorage.includes(item.internalStorage)
          : true;
      const matchPrice =
        item.price >= filterByPrice[0] && item.price <= filterByPrice[1];

      return matchBrand && matchPrice && matchRAM && matchInternalStorage;
    });
  }
);

const catalogItemsFilterByAndOrderBy = createSelector(
  catalogItemsFilterBy,
  catalogOrderBySelector,
  (items, orderBy) => {
    return items.sort((a, b) => {
      switch (orderBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return b.createdAt.toDate() - a.createdAt.toDate();
      }
    });
  }
);

export const getCatalog = createSelector(
  catalogLoadingSelector,
  catalogItemsFilterByAndOrderBy,
  catalogErrorSelector,
  (loading, products, error: any) => {
    const hasErrorMessage =
      !loading && !products.length && !error
        ? {
            ...error,
            name: "error name",
            message: "error message",
          }
        : error;

    return {
      loading,
      products,
      error: hasErrorMessage,
    };
  }
);

export const getProductsLength = (state: AppState) => state.catalog.data.length;
export const getProductsTotal = (state: AppState) => state.catalog.total;
