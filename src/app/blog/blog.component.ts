import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  blogPosts = [
    {
      title: "Top 5 Wedding Trends for 2024",
      date: "October 15, 2023",
      comments: 75,
      image: "assets/images/Blog-header-Image-blog1.png"
    },
    {
      title: "How to Plan a Successful Corporate Event",
      date: "October 22, 2023",
      comments: 42,
      image: "assets/images/Corporate-meetingblog2.jpg"
    },
    {
      title: "Essential Tips for Event Budgeting",
      date: "August 17, 2023",
      comments: 38,
      image: "assets/images/GettyImages-budget.jpg"
    }
  ];
}
