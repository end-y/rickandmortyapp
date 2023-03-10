import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';

let id = 0;
export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites_list: []
  },
  reducers: {
    addFavorites: (state, action) => {
      if(!state.favorites_list.some(e => e.id == action.payload.id)){
        state.favorites_list = [...state.favorites_list, {id: action.payload.id}];
        AsyncStorage.setItem("favoriteList",JSON.stringify(state.favorites_list));
      }
    },
    deleteFavorites: (state, action) => {
      if(state.favorites_list.some(e => e.id == action.payload.id)){
        state.favorites_list = [...state.favorites_list.filter(favorite => favorite.id != action.payload.id)];
        AsyncStorage.setItem("favoriteList",JSON.stringify(state.favorites_list));
      }
    },
    setFavorites: (state, action) => {
      state.favorites_list = action.payload.data;
    }
  },
});

export const { addFavorites, deleteFavorites, setFavorites } = favoritesSlice.actions;

export const selectFavorites = state => state.favorites_list;

export default favoritesSlice.reducer;
