import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import * as fromPostActions from '../../store/posts.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePostComponent {
  newPostForm = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
    tags: new FormControl([]),
    userId: new FormControl(5),
  });

  constructor(private store: Store) { }

  postsService: PostsService = inject(PostsService);

  createPost() {
    console.log(this.newPostForm.value);
    this.store.dispatch(fromPostActions.createPost({
      post: {
        title: this.newPostForm.value.title ?? '',
        body: this.newPostForm.value.body ?? '',
        tags: this.newPostForm.value.tags ?? [],
        userId: this.newPostForm.value.userId ?? 5, // TODO: Get user id from user logged in
      }
    }));
  }

}
