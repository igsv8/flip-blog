import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPostsReducer from './posts.reducer';
import { Blogpost } from '../models/blogpost';

export const selectPostsState = createFeatureSelector<fromPostsReducer.PostsState>('posts');

export const {
    selectIds: selectPostIds,
    selectEntities: selectPostEntities,
    selectAll: selectAllPosts,
    selectTotal: selectTotalPosts,
} = fromPostsReducer.adapter.getSelectors(selectPostsState);

export const selectLoading = createSelector(
    selectPostsState,
    (state: fromPostsReducer.PostsState) => state.loading
);

export const selectError = createSelector(
    selectPostsState,
    (state: fromPostsReducer.PostsState) => state.error
);

export const selectSelectedPostId = createSelector(
    selectPostsState,
    (state: fromPostsReducer.PostsState) => state.selectedPostId
);

export const selectSelectedPost = createSelector(
    selectPostEntities,
    selectSelectedPostId,
    (postEntities, selectedId): Blogpost | undefined =>
        selectedId ? postEntities[selectedId] : undefined
);
