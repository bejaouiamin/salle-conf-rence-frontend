import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  galleryImages = [
    { src: 'assets/images/female-wedding.jpg', alt: 'Wedding Event' },
    { src: 'assets/images/istockphoto-coroprate.jpg', alt: 'Corporate Conference' },
    { src: 'assets/images/istockphoto-birthday.jpg', alt: 'Birthday Celebration' },
    { src: 'assets/images/Memorable-Gala-Dinner.jpg', alt: 'Gala Dinner' }
  ];
}
