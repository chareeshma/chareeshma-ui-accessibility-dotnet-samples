import { Component, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { containDialogFocus } from '../../shared/dialog-focus';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './app.component.html',
})
export class AppComponent {
  @ViewChild('errorSummary') errorSummary?: ElementRef<HTMLDivElement>;
  @ViewChild('reviewDialog') reviewDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('reviewTitle') reviewTitle!: ElementRef<HTMLHeadingElement>;
  @ViewChild('reviewButton') reviewButton!: ElementRef<HTMLButtonElement>;
  submitted = false;
  status = '';
  readonly trapFocus = containDialogFocus;
  readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/\S/)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)],
    }),
  });

  error(field: 'name' | 'email'): string | null {
    const control = this.form.controls[field];
    if (!control.invalid || (!control.touched && !this.submitted)) return null;
    if (field === 'name') return 'Enter your name.';
    return control.hasError('required') ? 'Enter your email address.' : 'Enter an email address such as alex@example.com.';
  }

  review(): void {
    this.submitted = true;
    this.status = '';
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      requestAnimationFrame(() => this.errorSummary?.nativeElement.focus());
      return;
    }
    this.reviewDialog.nativeElement.showModal();
    this.reviewTitle.nativeElement.focus();
  }

  closeReview(): void {
    this.reviewDialog.nativeElement.close();
  }

  restoreFocus(): void {
    this.reviewButton.nativeElement.focus();
  }

  confirm(): void {
    this.closeReview();
    this.status = 'Your details are valid. This demo does not send or store your information.';
  }

  focusField(event: Event, field: HTMLInputElement): void {
    event.preventDefault();
    field.focus();
  }
}
