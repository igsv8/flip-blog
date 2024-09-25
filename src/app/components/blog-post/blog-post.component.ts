import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Blogpost } from '../../models/blogpost';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostComponent {
  @Input() blogpost!: Blogpost;

}
