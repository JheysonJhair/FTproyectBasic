import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-seeuser',
  templateUrl: './seeuser.component.html',
  styleUrls: ['./seeuser.component.css'],
})
export class SeeuserComponent implements OnInit {
  id: string;
  user: User | undefined;

  constructor(
    private _userService: UserService,
    private aRoute: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id')!;
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

  // ---------------------------------------------------- BACK
  goBack(): void {
    this.location.back();
  }

  // ---------------------------------------------------- DATE
  formatDate(birthDate: string | undefined): string {
    if (!birthDate) return '';

    const date = new Date(birthDate);
    const year = date.getFullYear();
    const month = this.addZero(date.getMonth() + 1);
    const day = this.addZero(date.getDate());

    return `${year}-${month}-${day}`;
  }

  private addZero(num: number): string {
    return num < 10 ? '0' + num : '' + num;
  }
}
