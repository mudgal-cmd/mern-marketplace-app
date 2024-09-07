import { createSlice } from "@reduxjs/toolkit";

const initialListingState = {
  currentListing: null,
  loadingListing: false,
  error: null
}

const listingSlice = createSlice({
  name: "listing",
  initialState: initialListingState, // we can define the initial state with a different name but ensure that when passing the initial state in the createSlice, the property is initialState, and the custom initial state should be passed as a value.
  reducers: {
    createListingStart : (state) => {
      state.loadingListing = true;
    }, // defined the reducer functions for the listing page

    createListingSuccess : (state, action) => {
      state.currentListing = action.payload;
      state.loadingListing = false;
      state.error = null;
    },

    createListingFailure : (state, action) => {
      state.error = action.payload;
      state.loadingListing = false;
    }
  }
});

export const {createListingStart, createListingSuccess, createListingFailure} = listingSlice.actions;

export default listingSlice.reducer; //exported the reducer auto-generated by the redux toolkit that includes all the reducer functions. 