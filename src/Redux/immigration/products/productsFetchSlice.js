import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";

export const fetchProductsDataWithoutUser = createAsyncThunk(
  "fetchProducts/fetchProductsDataWithoutUser",
  async (_, { dispatch }) => {
    // Keine userID notwendig
    try {
      const productsQuery = collection(db, "products");

      const querySnapshot = await getDocs(productsQuery);
      const productsData = [];

      querySnapshot.forEach((doc) => {
        productsData.push(doc.data());
      });
      return productsData;
    } catch (error) {
      // Handle Fehler, z.B. Anzeigen einer Fehlermeldung
      console.error("Fehler beim Abrufen der Produkte:", error);
    }
  }
);
export const fetchProductsData = createAsyncThunk(
  "fetchProducts/fetchProductsData",
  async (restaurantId, { dispatch }) => {
    try {
      const productsQuery = query(
        collection(db, "products"),
        where("restaurantsId", "==", restaurantId)
      );

      const querySnapshot = await getDocs(productsQuery);
      const productsData = [];

      querySnapshot.forEach((doc) => {
        // Füge die Produkt-Daten zusammen mit der Produkt-ID zum Array hinzu
        productsData.push({ id: doc.id, ...doc.data() });
      });
      return productsData;
    } catch (error) {
      // Handle Fehler, z.B. Anzeigen einer Fehlermeldung
      console.error("Fehler beim Abrufen des Products:", error);
    }
  }
);

export const fetchProductsOfOneMenu = createAsyncThunk(
  "fetchProducts/fetchProductsOfOneMenu",
  async (menu, { dispatch }) => {
    try {
      const productsData = [];
      console.log("productId-menu", menu);
      // Überprüfe, ob menu.productIds ein Array ist
      if (Array.isArray(menu.productIds)) {
        console.log("productId-ids", menu.productIds);
        // Iteriere über jede Produkt-ID im Menü
        for (const productId of menu.productIds) {
          try {
            console.log("productId-id", productId);
            // Erstelle eine Referenz auf das Produkt-Dokument
            const productDocRef = doc(db, "products", productId);
            // Rufe das Produkt-Dokument ab
            const productDocSnap = await getDoc(productDocRef);

            // Überprüfe, ob das Produkt-Dokument existiert
            if (productDocSnap.exists()) {
              // Füge die Produkt-Daten zum Array hinzu
              productsData.push({
                id: productDocSnap.id,
                ...productDocSnap.data(),
              });
            } else {
              console.warn(
                `Produkt mit der ID ${productId} wurde nicht gefunden.`
              );
            }
          } catch (error) {
            console.error(
              `Fehler beim Abrufen des Produkts mit der ID ${productId}:`,
              error
            );
          }
        }
      } else {
        // Wandele den einzelnen String in ein Array um
        const productIdArray = [menu.productIds];

        // Iteriere über jede Produkt-ID im Array
        for (const productId of productIdArray) {
          // Die gleiche Logik wie oben ...
        }
      }

      return productsData;
    } catch (error) {
      // Handle Fehler, z.B. Anzeigen einer Fehlermeldung
      console.error("Fehler beim Abrufen der Produkte:", error);
      throw error; // Wirf den Fehler erneut, damit Redux Toolkit ihn fangen kann
    }
  }
);

export const fetchProductsOfOneDeal = createAsyncThunk(
  "fetchProducts/fetchProductsOfOneDeal",
  async (menu, { dispatch }) => {
    try {
      const productsData = [];
      console.log("productId-menu", menu);
      // Überprüfe, ob menu.productIds ein Array ist
      if (Array.isArray(menu.productIds)) {
        console.log("productId-ids", menu.productIds);
        // Iteriere über jede Produkt-ID im Menü
        for (const productId of menu.productIds) {
          try {
            console.log("productId-id", productId);
            // Erstelle eine Referenz auf das Produkt-Dokument
            const productDocRef = doc(db, "products", productId);
            // Rufe das Produkt-Dokument ab
            const productDocSnap = await getDoc(productDocRef);

            // Überprüfe, ob das Produkt-Dokument existiert
            if (productDocSnap.exists()) {
              // Füge die Produkt-Daten zum Array hinzu
              productsData.push({
                id: productDocSnap.id,
                ...productDocSnap.data(),
              });
            } else {
              console.warn(
                `Produkt mit der ID ${productId} wurde nicht gefunden.`
              );
            }
          } catch (error) {
            console.error(
              `Fehler beim Abrufen des Produkts mit der ID ${productId}:`,
              error
            );
          }
        }
      } else {
        // Wandele den einzelnen String in ein Array um
        const productIdArray = [menu.productIds];

        // Iteriere über jede Produkt-ID im Array
        for (const productId of productIdArray) {
          // Die gleiche Logik wie oben ...
        }
      }

      return productsData;
    } catch (error) {
      // Handle Fehler, z.B. Anzeigen einer Fehlermeldung
      console.error("Fehler beim Abrufen der Produkte:", error);
      throw error; // Wirf den Fehler erneut, damit Redux Toolkit ihn fangen kann
    }
  }
);

export const fetchDrinksData = createAsyncThunk(
  "productsFetchSlice/fetchDrinksData",
  async (restaurantId, { dispatch }) => {
    try {
      const productsQuery = query(
        collection(db, "products"),
        where("restaurantsId", "==", restaurantId),
        where("tag", "==", "drink")
      );

      const querySnapshot = await getDocs(productsQuery);
      const productsData = [];

      querySnapshot.forEach((doc) => {
        // Füge die Produkt-Daten zusammen mit der Produkt-ID zum Array hinzu
        productsData.push({ id: doc.id, ...doc.data() });
      });
      return productsData;
    } catch (error) {
      // Handle Fehler, z.B. Anzeigen einer Fehlermeldung
      console.error("Fehler beim Abrufen des Products:", error);
    }
  }
);

const fetchProductsSlice = createSlice({
  name: "productsFetchSlice",
  initialState: {
    productsData: null,
    productsDataWithoutUser: null,
    loading: "",
    error: null,
    searchValue: "",
    searchResults: [],
    productsOfMenu: {
      data: null,
      loading: "",
      error: null,
    },
    productsOfDeals: {
      data: null,
      loading: "",
      error: null,
    },
    productsForMainRestaurantPage: {
      viralProducts: {
        data: null,
        loading: "",
        error: null,
      },
      // combiMenus: {
      //   data: null,
      //   loading: "",
      //   error: null,
      // },
      // saleMenus: {
      //   data: null,
      //   loading: "",
      //   error: null,
      // },
      combiProducts: {
        data: null,
        loading: "",
        error: null,
      },
      saleProducts: {
        data: null,
        loading: "",
        error: null,
      },
      // weeklyMenus: {
      //   data: null,
      //   loading: "",
      //   error: null,
      // },
      weeklyProducts: {
        data: null,
        loading: "",
        error: null,
      },
    },
    drinks: {
      data: null,
      loading: "",
      error: null,
    },
  },
  reducers: {
    searchProducts: (state, action) => {
      const searchTerm = state.searchValue;
      let results;

      // Andernfalls filtern Sie die Produkte nach dem Suchbegriff
      results = state.productsData.filter((product) =>
        Object.values(product).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

      // Aktualisieren Sie die Suchergebnisse im Redux-Zustand
      state.searchResults = results;
    },
    resetSearchResults: (state, action) => {
      state.searchResults = [];
    },
    setsearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    updateProduct(state, action) {
      state.productsOfDeals.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsData.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.productsData = action.payload;
        state.error = null;
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload;
      })
      .addCase(fetchProductsDataWithoutUser.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(fetchProductsDataWithoutUser.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.productsDataWithoutUser = action.payload;
        state.error = null;
      })
      .addCase(fetchProductsDataWithoutUser.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload;
      })
      .addCase(fetchProductsOfOneMenu.pending, (state) => {
        state.productsOfMenu.loading = "loading";
        state.productsOfMenu.error = null;
      })
      .addCase(fetchProductsOfOneMenu.fulfilled, (state, action) => {
        state.productsOfMenu.loading = "fulfilled";
        state.productsOfMenu.data = action.payload;
        state.productsOfMenu.error = null;
      })
      .addCase(fetchProductsOfOneMenu.rejected, (state, action) => {
        state.productsOfMenu.loading = "rejected";
        state.productsOfMenu.error = action.payload;
      })
      .addCase(fetchProductsOfOneDeal.pending, (state) => {
        state.productsOfDeals.loading = "loading";
        state.productsOfDeals.error = null;
      })
      .addCase(fetchProductsOfOneDeal.fulfilled, (state, action) => {
        state.productsOfDeals.loading = "fulfilled";
        state.productsOfDeals.data = action.payload;
        state.productsOfDeals.error = null;
      })
      .addCase(fetchProductsOfOneDeal.rejected, (state, action) => {
        state.productsOfDeals.loading = "rejected";
        state.productsOfDeals.error = action.payload;
      })
      .addCase(fetchDrinksData.pending, (state) => {
        state.drinks.loading = "loading";
        state.drinks.error = null;
      })
      .addCase(fetchDrinksData.fulfilled, (state, action) => {
        state.drinks.loading = "fulfilled";
        state.drinks.data = action.payload;
        state.drinks.error = null;
      })
      .addCase(fetchDrinksData.rejected, (state, action) => {
        state.drinks.loading = "rejected";
        state.drinks.error = action.payload;
      });
  },
});

export const { searchProducts, setsearchValue, resetSearchResults } =
  fetchProductsSlice.actions;

export default fetchProductsSlice.reducer;
