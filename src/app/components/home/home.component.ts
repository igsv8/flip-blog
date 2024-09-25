import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostComponent } from '../blog-post/blog-post.component';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { Blogpost } from '../../models/blogpost';
import * as fromPostsActions from '../../store/posts.actions';
import * as fromPostsSelectors from '../../store/posts.selectors';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BlogPostComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  blogposts$: Observable<Blogpost[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.blogposts$ = this.store.select(fromPostsSelectors.selectAllPosts);
    this.loading$ = this.store.select(fromPostsSelectors.selectLoading);
    this.error$ = this.store.select(fromPostsSelectors.selectError);
  }

  ngOnInit() {
    this.store.dispatch(fromPostsActions.loadPosts());
  }

  selectPost(id: number) {
    this.store.dispatch(fromPostsActions.selectPost({ id }))
  }

}