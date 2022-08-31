import {combineReducers} from '@reduxjs/toolkit';

import {userProcess} from './user-process/user-process';
import {NameSpace} from '../consts';
import {filmsProcess} from './films-process/films-process';

export const rootReducer = combineReducers({
  [NameSpace.Films]: filmsProcess.reducer,
  [NameSpace.User]: userProcess.reducer
});
