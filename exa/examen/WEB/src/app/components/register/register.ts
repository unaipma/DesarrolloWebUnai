import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './register.html',
    styleUrl: './register.css'
})
export class Register {
    username = '';
    password = '';
    errorMessage = '';

    constructor(private authService: AuthService, private router: Router) { }

    async onRegister() {
        if (this.username && this.password) {
            const result = await this.authService.register(this.username, this.password);
            if (result) {
                // Automatically login after register or redirect to login? Let's redirect to login for simplicity
                this.router.navigate(['/login']);
            } else {
                this.errorMessage = 'Registration failed. Username might be taken.';
            }
        } else {
            this.errorMessage = 'Please fill in all fields';
        }
    }

    goToLogin() {
        this.router.navigate(['/login']);
    }
}
