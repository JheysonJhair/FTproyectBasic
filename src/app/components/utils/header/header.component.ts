import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  id: string;
  user: User | undefined;

  isMenuOpen: boolean = false;

  constructor(
    private _userService: UserService,
    private aRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('idLogin')!;
  }

  ngOnInit() {
    this.getUserById(this.id);
  }

  // ---------------------------------------------------- GET USER
  getUserById(id: string) {
    this._userService.getUserById(id).subscribe((data) => {
      this.user = data.value;
    });
  }

  // ---------------------------------------------------- LOGOUT
  logout() {
    localStorage.removeItem('token');
    console.log('Token eliminado en localStorage:');
    this.router.navigate(['/login']);
  }

  // ---------------------------------------------------- EXTRA
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
