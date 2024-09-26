import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BlogPostComponent } from '../blog-post/blog-post.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Blogpost } from '../../models/blogpost';
import { filter, Observable, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectSelectedPost } from '../../store/posts.selectors';
import * as fromPostsActions from '../../store/posts.actions';
import * as fromPostsSelectors from '../../store/posts.selectors';
import { ActivatedRoute } from '@angular/router';
import { CommentComponent } from "../comment/comment.component";
import { CommentModel } from '../../models/comment.model';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, BlogPostComponent, AsyncPipe, CommentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent implements OnInit {
  blogpost$: Observable<Blogpost>;
  loading$: Observable<Boolean>;
  error$: Observable<string | null>;
  comments$: Observable<CommentModel[]>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {
    this.blogpost$ = this.store.select(selectSelectedPost).pipe(filter(Boolean));
    this.loading$ = this.store.select(fromPostsSelectors.selectLoading);
    this.error$ = this.store.select(fromPostsSelectors.selectError);
    this.comments$ = this.blogpost$.pipe(switchMap(blogpost => this.postsService.getCommentsByID(blogpost.id)));
  }

  ngOnInit(): void {
    this.store.select(fromPostsSelectors.selectAllPosts).pipe(
      take(1)
    ).subscribe(posts => {
      if (posts.length === 0) {
        this.route.paramMap.pipe(
          take(1)
        ).subscribe(params => {
          const postId = params.get('id');
          if (postId) {
            this.store.dispatch(fromPostsActions.loadPost({ id: Number(postId) }));
          }
        });
      }
    });



  }

}
