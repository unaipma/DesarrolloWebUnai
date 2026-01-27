import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/users';

    constructor(private router: Router) { }

    async login(username: string, password: string): Promise<boolean> {
        try {
            const response = await fetch(`${this.apiUrl}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const user = await response.json();
                localStorage.setItem('currentUser', JSON.stringify(user));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error', error);
            return false;
        }
    }

    async register(username: string, password: string): Promise<boolean> {
        try {
            const response = await fetch(`${this.apiUrl}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            return response.ok;
        } catch (error) {
            console.error('Register error', error);
            return false;
        }
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }

    getCurrentUser(): any {
        const userStr = localStorage.getItem('currentUser');
        return userStr ? JSON.parse(userStr) : null;
    }

    isLoggedIn(): boolean {
        return !!this.getCurrentUser();
    }

    isAdmin(): boolean {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    }
}
