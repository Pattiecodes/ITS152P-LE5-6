import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Post } from '../../models/post.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorage } from '../../services/token-storage';

@Component({
  imports: [CommonModule],
  selector: 'app-list-posts',
  styleUrl: './list-posts.css',
  templateUrl: './list-posts.html',
})
export class ListPosts implements OnInit {
  posts: Post[] = [];

  constructor(
    private http: HttpClient,
    private changeDetector: ChangeDetectorRef,
    private tokenStorage: TokenStorage,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initData();
    }
  }

  initData(): void {
    this.http.get<Post[]>('https://localhost:7076/api/post/list').subscribe({
      next: (data: Post[]) => {
        this.posts = data;
        this.changeDetector.detectChanges();
        console.log(this.posts);
      },
      error: (error) => {
        console.error('Error loading posts:', error);
      },
    });
  }

  logout(): void {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }
}
