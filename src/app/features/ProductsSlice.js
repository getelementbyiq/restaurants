import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../../firebase';

// const storage = getStorage();
const createdAt = serverTimestamp();

//Main Page without User
export const fetchProducts = createAsyncThunk('fetchProducts/fetchProducts', async (uid) => {
  try {
    //! MAKE MIDDLEWARES
    //! Must handle: no uid
    let productsQuery;
    if (uid) {
      productsQuery = query(collection(db, 'products'), where('uid', '==', uid));
    }
    if (!uid) {
      productsQuery = query(collection(db, 'products'));
    }

    const querySnapshot = await getDocs(productsQuery);

    const productsData = [];

    querySnapshot.forEach((doc) => {
      productsData.push(doc.data());
    });
    return productsData;
  } catch (error) {
    // Handle Fehler, z.B. Anzeigen einer Fehlermeldung
    console.error('Fehler beim Abrufen des Products:', error);
  }
});

//Main Page with Normal User
//Main Page with Owner User

// созвоны база, не зря говорят что 70% работы это созвоны :D

const initialState = {
  allProducts: [], // FOR MANIPULATION
  filteredProducts: [], // FOR RENDER <-- этом ключе
  productMocup: {
    name: '',
    price: '',
    description: '',
    comments: '',
    likes: '',
    background: null,
    createdAt,
    restaurantsId: null,
    items: {},
  },
  pending: null,
  error: null,
};

const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // filterBy: (state, action) => {
    //   let menus = action.payload.menus;
    //   let depencies = action.payload.searchDependencies;

    //   for (const menyKey in menus) {
    //     const menusValue = menus[menyKey]; // arrays of food, drinks and stuff

    //     menusValue.map((selectedMenu) => {
    //       // Menus filtration (product is now - selectedMenu)
    //       // let productName = product.name.toLowerCase();
    //       // for (const dependencyKey in depencies) {
    //       //   const dependencyValue = depencies[dependencyKey];

    //       //   console.warn(productName, dependencyValue);
    //       //   if (productName.includes(dependencyValue)) {
    //       //     console.warn('OKAY');
    //       //   } else {
    //       //     console.warn('not OKAY');
    //       //   }
    //       // }

    //       selectedMenu.products.map((product) => {
    //         let productName = product.name.toLowerCase();
    //         for (const dependencyKey in depencies) {
    //           const dependencyValue = depencies[dependencyKey];

    //           // console.warn(productName, dependencyValue);
    //           if (productName.includes(dependencyValue)) {
    //             console.warn('OKAY');
    //           }
    //         }
    //       });
    //     });
    //   }
    // },
    filterBy: (state, action) => {
      const search = action.payload.toLowerCase();
      const filteredProducts = state.allProducts.filter(
        (product) =>
          // validation are these keys exist and only then filtering
          (product.name && product.name.toLowerCase().includes(search)) ||
          (product.tag && product.tag.toLowerCase().includes(search)) ||
          (product.categoryType && product.categoryType.toLowerCase().includes(search)),
      );

      return {
        ...state,
        filteredProducts: filteredProducts,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.warn('Action payload:', action.payload);
        state.loading = 'fulfilled';
        state.allProducts = action.payload;
        state.filteredProducts = action.payload;
        state.error = null;
        console.warn('Current state:', state);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload;

        state.allProducts = state.allProducts.length = 0;
        state.filteredProducts = state.filteredProducts.length = 0;
      });
  },
});

export const { filterBy } = ProductSlice.actions;
export default ProductSlice.reducer;
