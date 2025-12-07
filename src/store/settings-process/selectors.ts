import {State} from '../../types/state.ts';
import {NameSpace} from '../../const.ts';
import {City} from '../../types/city.ts';
import {SortingOption} from '../../const.ts';

export const getCurrentCity = (state: State): City => state[NameSpace.Settings].city;

export const getSorting = (state: State): SortingOption => state[NameSpace.Settings].sorting;
