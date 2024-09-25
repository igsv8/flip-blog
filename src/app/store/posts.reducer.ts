


import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Blogpost } from '../models/blogpost';
import * as PostsActions from './posts.actions';

export interface PostsState extends EntityState<Blogpost> {
    selectedPostId: number | null;
    loading: boolean;
    error: string | null;
}

export const adapter: EntityAdapter<Blogpost> = createEntityAdapter<Blogpost>({
    selectId: (blogpost: Blogpost) => blogpost.id,
    sortComparer: (a: Blogpost, b: Blogpost) => b.id - a.id
});

export const initialState: PostsState = adapter.getInitialState({
    selectedPostId: null,
    loading: false,
    error: null
});

export const postsReducer = createReducer(
    initialState,

    // Load Posts
    on(PostsActions.loadPosts, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(PostsActions.loadPostsSuccess, (state, { posts }) =>
        adapter.upsertMany(posts, { ...state, loading: false })
    ),
    on(PostsActions.loadPostsFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),

    // Load Single Post
    on(PostsActions.loadPost, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(PostsActions.loadPostSuccess, (state, { post }) =>
        adapter.upsertOne(post, {
            ...state,
            selectedPostId: post.id,
            loading: false
        })
    ),
    on(PostsActions.loadPostFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),

    // Create Post
    on(PostsActions.createPost, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(PostsActions.createPostSuccess, (state, { post }) => {
        const updatedState = adapter.addOne({
            ...post,
            reactions: post.reactions ?? { likes: 0, dislikes: 0 }, views: 0,
            tags: post.tags?.length > 0 ? post.tags : ['new']
        },
            state);
        return {
            ...updatedState,
            loading: false
        };
    }),
    on(PostsActions.createPostFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),

    //Select Post
    on(PostsActions.selectPost, (state, { id }) => ({
        ...state,
        selectedPostId: id
    }))
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();