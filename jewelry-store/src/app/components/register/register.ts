import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
  if (!this.username || !this.email || !this.password) {
    alert('Please fill in all fields.');
    return;
  }

  this.auth.register(this.username, this.email, this.password).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/']);
    },
    error: (err) => {
      alert('Registration failed: ' + err.error);
    }
  });
}

}
