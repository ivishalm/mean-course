import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService) {}
  isLoading = false;
  ngOnInit() {}

  onSignup(singupForm: NgForm) {
    if (singupForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(singupForm.value.email, singupForm.value.password);
  }
}
