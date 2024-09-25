import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroHandThumbUp, heroHandThumbDown, heroEye } from '@ng-icons/heroicons/outline';
import { Blogpost } from '../../models/blogpost';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ heroHandThumbUp, heroHandThumbDown, heroEye })],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostComponent {
  @Input() blogpost!: Blogpost;

}
