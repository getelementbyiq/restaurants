import { createSlice } from '@reduxjs/toolkit';
import { serverTimestamp } from 'firebase/firestore';

// const storage = getStorage();
const createdAt = serverTimestamp();

const initialState = {
  testArr: [],
  httpResponce: {},
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
  errors: null,
};

const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterBy: (state, action) => {
      let menus = action.payload.menus;
      let depencies = action.payload.searchDependencies;

      for (const menyKey in menus) {
        const menusValue = menus[menyKey]; // arrays of food, drinks and stuff

        menusValue.map((selectedMenu) => {
          // Menus filtration (product is now - selectedMenu)
          // let productName = product.name.toLowerCase();
          // for (const dependencyKey in depencies) {
          //   const dependencyValue = depencies[dependencyKey];

          //   console.warn(productName, dependencyValue);
          //   if (productName.includes(dependencyValue)) {
          //     console.warn('OKAY');
          //   } else {
          //     console.warn('not OKAY');
          //   }
          // }

          selectedMenu.products.map((product) => {
            let productName = product.name.toLowerCase();
            for (const dependencyKey in depencies) {
            const dependencyValue = depencies[dependencyKey];

            // console.warn(productName, dependencyValue);
            if (productName.includes(dependencyValue)) {
              console.warn('OKAY');
            }
          }
          })
          
        });
      }
    },
  },
});

export const { filterBy } = ProductSlice.actions;
export default ProductSlice.reducer;
