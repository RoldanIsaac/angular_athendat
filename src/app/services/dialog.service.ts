import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { filter, map, Observable, Subject, Subscription, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private readonly _dialog = inject(MatDialog);
  private dialogResultSubject = new Subject<any>();

  closeModal(): void {
    this._dialog.closeAll();
  }

  openModalUpgrade<CT, T>(componentRef: ComponentType<CT>, data?: T, isEditing = false, minWidth: string = '500px'): Observable<any> {
    const config = { data, isEditing };
    let dialogRef = this._dialog.open(componentRef, {
      data: config,
      maxHeight: '650px',
      minWidth
    })

    return dialogRef.afterClosed().pipe(
      take(1),
      map(result => result ?? null)
    )
  }

  openModal<CT, T>(componentRef: ComponentType<CT>, data?: T, isEditing = false, minWidth: string = '500px'): Observable<any> {
    const config = { data, isEditing };
    let dialogRef = this._dialog.open(componentRef, {
      data: config,
      maxHeight: '650px',
      minWidth
    })

    /**
     * Subscribe to result afterClosed()
     */
    dialogRef
      .afterClosed()
      .subscribe((newFormData: any) => {
          if(!newFormData) {
            // console.log('[DialogService.openModal]: No data');
            this.dialogResultSubject.next(null)
          } else {
            // console.log('[DialogService.openModal]:', newFormData);
            this.dialogResultSubject.next(newFormData)
          }
        }
      )

    return this.dialogResultSubject.asObservable();
  }
}
