import {createSlice, createAction} from '@reduxjs/toolkit';
import {DEFAULT_CITY, DEFAULT_SORTING, NameSpace, SortingOption} from '../../const.ts';
import {SettingsProcess} from '../../types/state.ts';
import {City} from '../../types/city.ts';

export const changeCity = createAction<City>('settings/changeCity');
export const changeSorting = createAction<SortingOption>('settings/changeSorting');

const initialState: SettingsProcess = {
  city: DEFAULT_CITY,
  sorting: DEFAULT_SORTING,
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
