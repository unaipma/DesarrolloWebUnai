import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-local-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './local-login.html',
    styleUrl: './local-login.css' // Note: Angular 17+ might use styleUrl instead of styleUrls
})
export class LocalLoginComponent {
    username = '';
    password = '';
    errorMessage = '';

    constructor(private router: Router) { }

    onLogin() {
        if (!this.username || !this.password) {
            this.errorMessage = 'Por favor, rellena todos los campos';
            return;
        }

        // Get users from local storage
        const usersStr = localStorage.getItem('local_users');
        const users = usersStr ? JSON.parse(usersStr) : [];

        const user = users.find((u: any) => u.username === this.username && u.password === this.password);

        if (user) {
            localStorage.setItem('local_token', 'true');
            localStorage.setItem('current_user', JSON.stringify(user));
            alert('Login correcto (Local)');
            // this.router.navigate(['/']); // Uncomment to use real navigation
        } else {
            this.errorMessage = 'Usuario o contraseña incorrectos';
        }
    }

    goToRegister() {
        // this.router.navigate(['/local-register']); // Uncomment if you add routing
        console.log('Navigate to local register');
    }
}
