import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    MatIconModule,
    NgIf,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

	iconsUrl = "icons/round-stroke"
	isIcon: boolean = false;
	actionIconNames = [
		'home',
		'product-loading',
		'security-check',
	 ]

  constructor(
		private _matIconRegistry: MatIconRegistry,
		private _domSanitizer: DomSanitizer
	) { }

  ngOnInit(): void {
		// Registering Icons
		for (let index = 0; index < this.actionIconNames.length; index++) {
			const iconName = this.actionIconNames[index];
			
			this._matIconRegistry.addSvgIcon(iconName, 
					this._domSanitizer.bypassSecurityTrustResourceUrl(`${this.iconsUrl}/${iconName}.svg`)
			);
		}
		this.isIcon = true
  }
}
