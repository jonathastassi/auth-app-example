import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  
  readonly API_URL = 'https://localhost:5001/api/auth/';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<User>(`${this.API_URL}me`)
      .subscribe(data => {
        console.log(data);
      },
      err => {
        console.error(err);
      })
  }

}
