import { getPopularTagsAction, getPopularTagsFailureAction, getPopularTagsSuccessAction } from './actions/getPopularTags.action';
import { Action, createReducer, on } from '@ngrx/store';
import { PopularTagsStateInterface } from './../types/popularTagsState.interface';
import { act } from '@ngrx/effects';
const InitialState: PopularTagsStateInterface = {
  data: null,
  isLoading: false,
  error: null
}

const popularTagsReducer = createReducer(
  InitialState,
  on(
    getPopularTagsAction,
    (state): PopularTagsStateInterface => ({
      ...state,
      isLoading: true
    })
  ),

  on(
    getPopularTagsSuccessAction,
    (state, action): PopularTagsStateInterface => ({
      ...state,
      isLoading: false,
      data: action.popularTags
    })
  ),

  on(
    getPopularTagsFailureAction,
    (state): PopularTagsStateInterface => ({
      ...state,
      isLoading: false
    })
  ),
)

export function reducers(state: PopularTagsStateInterface, action: Action) {
  return popularTagsReducer(state, action)
}
