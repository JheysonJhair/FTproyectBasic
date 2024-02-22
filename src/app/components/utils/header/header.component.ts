import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(
    private _userService: UserService,
    private aRoute: ActivatedRoute
  ) {
    this.aRoute.snapshot.paramMap.get('id');
    this.id = this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.getUserById(this.id);
  }

  // ---------------------------------------------------- GET User
  getUserById(id: string) {
    this._userService.getUserById(id).subscribe((data) => {
      this.user = data;
    });
  }
}
