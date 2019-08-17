import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: 'First Post', content: 'This is first posts content' },
  //   { title: 'Second Post', content: 'This is second posts content' },
  //   { title: 'Third Post', content: 'This is third posts content' }
  // ];

  isLoading = false;

  posts: Post[] = [];
  postSubscription: Subscription;
  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postSubscription = this.postService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
      this.isLoading = false;
    });
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

}
