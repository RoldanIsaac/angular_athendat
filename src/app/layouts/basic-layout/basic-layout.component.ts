import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-basic-layout',
  imports: [
    AsyncPipe,
    MatButtonModule,
    RouterOutlet,
    MatSidenavModule,
    SidebarComponent,
    MatIconModule,
  ],
  templateUrl: './basic-layout.component.html',
  styleUrl: './basic-layout.component.scss'
})
export class BasicLayoutComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
 
  }
}
