import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../consts';

export const redirectToRoute = createAction<AppRoute>('REDIRECT_TO_ROUTE');

