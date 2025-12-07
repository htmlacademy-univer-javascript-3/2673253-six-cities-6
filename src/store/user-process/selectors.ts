import {State} from '../../types/state.ts';
import {AuthorizationStatus, NameSpace} from '../../const.ts';
import {UserData} from '../../types/user-data.ts';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getUser = (state: State): UserData | null => state[NameSpace.User].user;

export const getFavoritesCount = (state: State): number | null => state[NameSpace.User].userFavoritesCount;
