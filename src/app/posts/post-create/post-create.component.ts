import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  constructor(private postService: PostsService) {}

  ngOnInit() {}

  onAddPost(postForm) {
    this.postService.addPost(postForm.value.title, postForm.value.content);
    postForm.resetForm();
  }
}
