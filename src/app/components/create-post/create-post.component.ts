import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  newPostForm = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
    tags: new FormControl([]),
    userId: new FormControl(5),
  });

  constructor() { }

  postsService: PostsService = inject(PostsService);

  createPost() {
    this.postsService.createPost({
      title: this.newPostForm.value.title ?? '',
      body: this.newPostForm.value.body ?? '',
      tags: this.newPostForm.value.tags ?? [],
      userId: this.newPostForm.value.userId ?? 5,
    }
    );
  }


}
