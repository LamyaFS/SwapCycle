import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  private dataSubject: ReplaySubject<string> = new ReplaySubject<string>(1);

  setData(emailName: string): void {
    this.dataSubject.next(emailName);
  }

  getData$(): Observable<string> {
    return this.dataSubject.asObservable();
  }

}
