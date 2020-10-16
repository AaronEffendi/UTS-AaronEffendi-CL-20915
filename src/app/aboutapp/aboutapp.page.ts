import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutapp',
  templateUrl: './aboutapp.page.html',
  styleUrls: ['./aboutapp.page.scss'],
})
export class AboutappPage implements OnInit {
  profileImage = 'https://img.cinemablend.com/filter:scale/quill/f/a/0/0/c/7/fa00c7740d6c4453f6fbf2f81172979b94ea96e8.jpg?mw=600';
  constructor() { }

  ngOnInit() {
  }

}
