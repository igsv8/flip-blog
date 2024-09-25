import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'create', component: CreatePostComponent },
    { path: 'post/:id', component: PostDetailComponent },
];