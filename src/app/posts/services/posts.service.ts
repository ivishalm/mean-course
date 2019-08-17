import { Injectable } from '@angular/core';
import { Post } from '../post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postUpdated = new Subject<Post[]>();
  private posts: Post[] = [];

  url = 'http://localhost:3000/';

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(this.url + 'api/posts')
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            };
          });
        })
      )
      .subscribe(transformedPost => {
        this.posts = transformedPost;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string }>(
      this.url + 'api/posts/' + id
    );
  }

  addPost(title: string, content: string) {
    // tslint:disable-next-line:object-literal-shorthand
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string; postId: string }>(this.url + 'api/posts', post)
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, title: string, content: string) {
    // tslint:disable-next-line:object-literal-shorthand
    const post = { id: id, title: title, content: content };

    this.http.put(this.url + 'api/posts/' + id, post).subscribe(response => {
      const updatedPost = [...this.posts];
      const oldPostIndex = updatedPost.findIndex(p => {
        // tslint:disable-next-line:no-unused-expression
        p.id === post.id;
      });
      updatedPost[oldPostIndex] = post;
      this.posts = updatedPost;
      this.postUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  deletePost(postId: string) {
    this.http.delete(this.url + 'api/posts/' + postId).subscribe(() => {
      const updatedPost = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPost;
      this.postUpdated.next([...this.posts]);
    });
  }
}
