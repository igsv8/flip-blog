import { createAction, props } from '@ngrx/store';
import { Blogpost } from '../models/blogpost';

export const loadPosts = createAction('[Posts] Load Posts');
export const loadPostsSuccess = createAction('[Posts] Load Posts Success', props<{ posts: Blogpost[] }>());
export const loadPostsFailure = createAction('[Posts] Load Posts Failure', props<{ error: any }>());

export const loadPost = createAction('[Posts] Load Post', props<{ id: number }>());
export const loadPostSuccess = createAction('[Posts] Load Post Success', props<{ post: Blogpost }>());
export const loadPostFailure = createAction('[Posts] Load Post Failure', props<{ error: any }>());

export const createPost = createAction('[Posts] Create Post', props<{ post: Partial<Blogpost> }>());
export const createPostSuccess = createAction('[Posts] Create Post Success', props<{ post: Blogpost }>());
export const createPostFailure = createAction('[Posts] Create Post Failure', props<{ error: any }>());

export const selectPost = createAction('[Posts] Select Post', props<{ id: number }>());