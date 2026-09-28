import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
	providedIn: 'root',
})
export class TokenStorage {
	constructor() {}

	signOut(): void {
		if (typeof window !== 'undefined') {
			window.sessionStorage.clear();
		}
	}

	saveToken(token: string): void {
		if (typeof window !== 'undefined') {
			window.sessionStorage.removeItem(TOKEN_KEY);
			window.sessionStorage.setItem(TOKEN_KEY, token);
		}
	}

	getToken(): string | null {
		return typeof window === 'undefined'
			? null
			: window.sessionStorage.getItem(TOKEN_KEY);
	}

	saveUser(id: number): void {
		if (typeof window !== 'undefined') {
			const strId = id.toString();
			window.sessionStorage.removeItem(USER_KEY);
			window.sessionStorage.setItem(USER_KEY, strId);
		}
	}
}
