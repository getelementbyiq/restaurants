import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  queryEqual,
  startAfter,
  where,
} from "firebase/firestore";

export const fetchSaleMenus = createAsyncThunk(
  "saleProducts/fetchSaleMenus",
  async (_, { rejectWithValue }) => {
    try {
      const saleMenuRef = collection(db, "menus");
      const q = query(saleMenuRef, where("categoryType", "==", "sale"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const fetchProductsOfSaleMenu = createAsyncThunk(
//   "saleProducts/fetchProductsOfOneMenu",
//   async ({menu,startAfterDocumentSale}, { rejectWithValue }) => {
//     try {
//       const productsData = [];

//       if (Array.isArray(menu.productIds)) {
//         for (const productId of menu.productIds) {
//           try {
//             const productDocRef = doc(db, "products", productId);
//             const productDocSnap = await getDoc(productDocRef);
//             if (productDocSnap.exists()) {
//               productsData.push({
//                 id: productDocSnap.id,
//                 ...productDocSnap.data(),
//               });
//             } else {
//               console.warn(`Product with ID ${productId} not found.`);
//             }
//           } catch (error) {
//             console.error(
//               `Error fetching product with ID ${productId}:`,
//               error
//             );
//           }
//         }
//       }
//       return productsData;
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const fetchProductsOfSaleMenu = createAsyncThunk(
  "saleProducts/fetchProductsOfSaleMenu",
  async ({ menu, startAfterDocument }, { rejectWithValue }) => {
    try {
      const productsData = [];
      const productRefs = menu.productIds.map((productId) =>
        doc(db, "products", productId)
      );

      let startIndex = 0;
      if (startAfterDocument) {
        startIndex =
          productRefs.findIndex((ref) => ref.id === startAfterDocument.id) + 1;
      }

      const paginatedProductRefs = productRefs.slice(
        startIndex,
        startIndex + 4
      );

      for (const productRef of paginatedProductRefs) {
        try {
          const productDocSnap = await getDoc(productRef);
          if (productDocSnap.exists()) {
            productsData.push({
              id: productDocSnap.id,
              ...productDocSnap.data(),
            });
          } else {
            console.warn(`Product with ID ${productRef.id} not found.`);
          }
        } catch (error) {
          console.error(
            `Error fetching product with ID ${productRef.id}:`,
            error
          );
        }
      }

      const lastDocument = productsData.length
        ? productsData[productsData.length - 1]
        : null;

      return {
        products: productsData,
        lastDocument: lastDocument,
        hasMore: startIndex + 4 < productRefs.length,
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Thunk action

// Slice
const initialState = {
  data: [],
  lastDocument: null,
  hasMore: true,
  loading: false,
  error: null,
  saleMenus: [],
};

const saleProductsSlice = createSlice({
  name: "saleProducts",
  initialState,
  reducers: {
    resetSaleProducts: (state) => {
      state.data = [];
      state.lastDocument = null;
      state.hasMore = true;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSaleMenus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSaleMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.saleMenus = action.payload;
        // Automatically fetch products of the first menu
      })
      .addCase(fetchSaleMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductsOfSaleMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsOfSaleMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, ...action.payload.products];
        state.lastDocument = action.payload.lastDocument;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchProductsOfSaleMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSaleProducts } = saleProductsSlice.actions;

export const selectSaleProducts = (state) => state.saleProducts.data;
export const selectSaleMenus = (state) => state.saleProducts.saleMenus;
export const selectSaleLoading = (state) => state.saleProducts.loading;
export const selectSaleError = (state) => state.saleProducts.error;
export const selectLastDocument = (state) => state.saleProducts.lastDocument;

export default saleProductsSlice.reducer;
