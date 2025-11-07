import { CanDeactivateFn } from '@angular/router';
import { RegisterComponent } from '../../pages/register/register.component';
import { inject } from '@angular/core';
import { ConfirmationServiceService } from '../services/confirmation/confirmation-service.service';

export const registerGuard: CanDeactivateFn<RegisterComponent> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  if (component.formGroup.valid) {
    return component.confirmExit('Are you sure you want to leave? Your changes may not be saved?');
  }
  return true;
};
