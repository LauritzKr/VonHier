import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [NavbarComponent],
})
export class ProfileComponent implements OnInit {
  currentTime: string | undefined;

  ngOnInit(): void {
    this.updateCurrentTime();
  }

  private updateCurrentTime(): void {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/London',
    };
    this.currentTime = now.toLocaleTimeString('en-GB', options);
    setTimeout(() => this.updateCurrentTime(), 60000); // Update time every minute
  }
}
