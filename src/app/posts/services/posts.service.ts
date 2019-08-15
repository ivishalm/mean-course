import { Injectable } from '@angular/core';
import { Post } from '../post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postUpdated = new Subject<Post[]>();
  private posts: Post[] = [];

  url = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: Post[] }>(this.url + 'api/posts')
      .subscribe(postData => {
        this.posts = postData.posts;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    // tslint:disable-next-line:object-literal-shorthand
    const post: Post = { id: null, title: title, content: content };
    this.http.post(this.url + 'api/posts', post).subscribe(responseData => {
      console.log(responseData.message);
    });
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);
  }
}
