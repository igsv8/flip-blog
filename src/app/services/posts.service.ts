import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blogpost } from '../models/blogpost';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommentModel } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postsUrl = 'https://dummyjson.com/posts';
  private commentsUrl = 'https://dummyjson.com/comments/post';

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Blogpost[]> {
    return this.http.get<{ posts: Blogpost[] }>(`${this.postsUrl}?sortBy=id&order=desc&limit=0&skip=0`)
      .pipe(
        map(response => response.posts ?? [])
      );
  }

  getBlogPostById(id: number): Observable<Blogpost> {
    return this.http.get<Blogpost>(`${this.postsUrl}/${id}`);
  }

  getCommentsByID(id: number): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(`${this.commentsUrl}/${id}`).pipe(map((response: any) => response.comments));
  }

  createPost(post: Partial<Blogpost>): Observable<Blogpost> {
    return this.http.post<Blogpost>(`${this.postsUrl}/add`, post);
  }
}