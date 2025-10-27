import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  message: string = '';
  visible: boolean = false;

  show(msg: string, duration: number = 3000): void {
    this.message = msg;
    this.visible = true;
    setTimeout(() => this.visible = false, duration);
  }
}
