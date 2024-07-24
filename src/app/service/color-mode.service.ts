import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorModeService implements OnInit {

  private darkModeSubject = new BehaviorSubject<boolean>(false)
  darkMode$ = this.darkModeSubject.asObservable();
  constructor(){
  }
  
  ngOnInit(): void {
    this.darkModeSubject.next(this.detectSystemTheme());
    this.darkMode$.subscribe(dark => {
      if (dark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    })
  }
  
  toggleMode() {
    this.darkModeSubject.next(!this.darkModeSubject.value);
  }
  
  private detectSystemTheme(): boolean {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }


}
