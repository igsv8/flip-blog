import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { PostsService } from '../services/posts.service';
import * as PostsActions from './posts.actions';

@Injectable()
export class PostsEffects {
    private actions$ = inject(Actions);
    private postsService = inject(PostsService);

    loadPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostsActions.loadPosts),
            mergeMap(() =>
                this.postsService.getAllPosts().pipe(
                    map(posts => PostsActions.loadPostsSuccess({ posts })),
                    catchError(error => of(PostsActions.loadPostsFailure({ error })))
                )
            )
        )
    );

    loadPost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostsActions.loadPost),
            mergeMap(action =>
                this.postsService.getBlogPostById(action.id).pipe(
                    map(post => PostsActions.loadPostSuccess({ post })),
                    catchError(error => of(PostsActions.loadPostFailure({ error })))
                )
            )
        )
    );

    createPost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostsActions.createPost),
            mergeMap(action =>
                this.postsService.createPost(action.post).pipe(
                    map(post => PostsActions.createPostSuccess({ post })),
                    catchError(error => of(PostsActions.createPostFailure({ error })))
                )
            )
        )
    );
}