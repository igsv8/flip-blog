import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BlogPostComponent } from '../blog-post/blog-post.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Blogpost } from '../../models/blogpost';
import { filter, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectSelectedPost } from '../../store/posts.selectors';
import * as fromPostsActions from '../../store/posts.actions';
import * as fromPostsSelectors from '../../store/posts.selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, BlogPostComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent implements OnInit {
  blogpost$: Observable<Blogpost>;
  loading$: Observable<Boolean>;
  error$: Observable<string | null>;

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.blogpost$ = this.store.select(selectSelectedPost).pipe(filter(Boolean));
    this.loading$ = this.store.select(fromPostsSelectors.selectLoading);
    this.error$ = this.store.select(fromPostsSelectors.selectError);
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
