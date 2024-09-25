import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'
import { BlogPostComponent } from '../blog-post/blog-post.component';
import { Subscription } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { Blogpost } from '../../models/blogpost';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BlogPostComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  blogposts: Blogpost[] = [];
  private subscription: Subscription;

  postsService: PostsService = inject(PostsService);

  constructor() {
    this.subscription = this.postsService.getAllPosts().subscribe(
      (posts: any) => {
        this.blogposts = posts;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
