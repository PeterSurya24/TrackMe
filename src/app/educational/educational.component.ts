import { Component, OnInit } from '@angular/core';
import { ContentService, Content } from '../services/content.service';
@Component({
  selector: 'app-educational',
  templateUrl: './educational.component.html',
  styleUrls: ['./educational.component.css']
})
export class EducationalComponent implements OnInit {
  articles: any[] = [];
  videos: any[] = [];

  constructor(private contentService: ContentService) { 
  }

  ngOnInit(): void {
    this.loadArticles();
    this.loadVideos();
    this.loadContents();
  }

  loadArticles(): void {
    this.contentService.getArticles().subscribe(data => {
      this.articles = data;
    }, error => {
      console.error('Error fetching articles:', error);
    });
  }

  loadVideos(): void {
    this.contentService.getVideos().subscribe(data => {
      this.videos = data;
    }, error => {
      console.error('Error fetching videos:', error);
    });
  }


  loadContents() {
    this.contentService.getContents().subscribe({
      next: (data: Content[]) => { // Specify type for 'data'
        this.articles = data.filter((item: Content) => item.contentType === 'Article'); // Specify type for 'item'
        this.videos = data.filter((item: Content) => item.contentType === 'Video');
      },
      error: (err: any) => console.error(err) // Specify type for 'err'
    });
  }
}
