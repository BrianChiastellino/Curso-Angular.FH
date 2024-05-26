import { Injectable } from '@angular/core';
import { CanActivateFn, CanMatchFn } from '@angular/router';

@Injectable({providedIn: 'root'})

export class AuthGuard {

  constructor() {}

  public canMatch: CanMatchFn = (route, segments) => {

    console.log('canMatch', { route, segments });

    return true;

  };

  public canActivate: CanActivateFn = (route, state) => {

    console.log('canActivate', { route, state });

    return true;

  };

}
