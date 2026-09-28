import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../../models/post.model';

@Component({
  imports: [],
  selector: 'app-post-detail',
  styleUrl: './post-detail.css',
  templateUrl: './post-detail.html',
})
export class PostDetail implements OnInit {
  private routeSub: Subscription = new Subscription();
  private id: number = 0;

  post?: Post;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private changeDetector: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.routeSub = this.route.params.subscribe((params) => {
          this.id = Number(params['id']);
          this.initData();
        });
      });
    }
  }

  initData(): void {
    this.http.get<Post>(`https://localhost:7076/api/post/${this.id}`).subscribe({
      next: (data: Post) => {
        this.post = data;
        this.changeDetector.detectChanges();
        console.log(this.post);
      },
      error: (error) => {
        console.error('Error loading post:', error);
      },
    });
  }
}
