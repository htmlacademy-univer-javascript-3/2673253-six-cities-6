import {createSlice, createAction} from '@reduxjs/toolkit';
import {NameSpace, SortingOption} from '../../const.ts';
import {SettingsProcess} from '../../types/state.ts';
import {City} from '../../types/city.ts';

export const changeCity = createAction<City>('settings/changeCity');
export const changeSorting = createAction<SortingOption>('settings/changeSorting');

const initialState: SettingsProcess = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 12,
    },
  },
  sorting: SortingOption.Popular,
};

export const settingsProcess = createSlice({
  name: NameSpace.Settings,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeCity, (state, action) => {
        state.city = action.payload;
      })
      .addCase(changeSorting, (state, action) => {
        state.sorting = action.payload;
      });
  },
});
