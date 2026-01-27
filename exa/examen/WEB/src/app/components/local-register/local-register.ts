import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-local-register',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './local-register.html',
    styleUrl: './local-register.css'
})
export class LocalRegisterComponent {
    username = '';
    password = '';
    errorMessage = '';
    successMessage = '';

    constructor(private router: Router) { }

    onRegister() {
        if (!this.username || !this.password) {
            this.errorMessage = 'Por favor, rellena todos los campos';
            return;
        }

        // Get existing users
        const usersStr = localStorage.getItem('local_users');
        const users = usersStr ? JSON.parse(usersStr) : [];

        // Check if user exists
        if (users.find((u: any) => u.username === this.username)) {
            this.errorMessage = 'El usuario ya existe';
            return;
        }

        // Add new user
        users.push({ username: this.username, password: this.password });
        localStorage.setItem('local_users', JSON.stringify(users));

        this.successMessage = 'Registro exitoso! Redirigiendo al login...';
        this.errorMessage = '';

        setTimeout(() => {
            // this.router.navigate(['/local-login']); // Uncomment to use real navigation
            console.log('Navigate to local login');
        }, 1500);
    }

    goToLogin() {
        // this.router.navigate(['/local-login']); // Uncomment to use real navigation
        console.log('Navigate to local login');
    }
}
