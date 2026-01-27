import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class Login {
    username = '';
    password = '';
    errorMessage = '';

    constructor(private authService: AuthService, private router: Router) { }

    async onLogin() {
        if (this.username && this.password) {
            const result = await this.authService.login(this.username, this.password);
            if (result) {
                this.router.navigate(['/']); // Redirect to home on success
            } else {
                this.errorMessage = 'Invalid username or password';
            }
        } else {
            this.errorMessage = 'Please fill in all fields';
        }
    }

    goToRegister() {
        this.router.navigate(['/register']);
    }
}
