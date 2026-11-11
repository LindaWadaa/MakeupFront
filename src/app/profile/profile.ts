import { Component } from '@angular/core';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
})
export class Profile {
  constructor(public authService: AuthService) {}
}
