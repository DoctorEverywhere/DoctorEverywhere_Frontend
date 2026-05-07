import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/auth.models';

// Cross-field validator
function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const pw = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pw && confirm && pw !== confirm ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  errorMessage = '';
  showPassword = false;
  showConfirm = false;

  readonly roles = [
    { value: UserRole.Patient, label: 'Patient', description: 'Book & manage appointments' },
    { value: UserRole.Doctor, label: 'Doctor', description: 'Manage availability & patients' },
  ];

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName:  ['', [Validators.required, Validators.minLength(2)]],
      email:     ['', [Validators.required, Validators.email]],
      role:      [UserRole.Patient, Validators.required],
      // Doctor extras
      specialty:     [''],
      licenseNumber: [''],
      address:       [''],
      // Password group
      password:        ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]],
      confirmPassword: ['', Validators.required],
    }, { validators: passwordMatchValidator });

    // Dynamically add/remove doctor-specific validators
    this.role.valueChanges.subscribe((role: UserRole) => {
      if (role === UserRole.Doctor) {
        this.specialty.setValidators([Validators.required]);
        this.licenseNumber.setValidators([Validators.required]);
      } else {
        this.specialty.clearValidators();
        this.licenseNumber.clearValidators();
      }
      this.specialty.updateValueAndValidity();
      this.licenseNumber.updateValueAndValidity();
    });
  }

  // ── Field accessors ───────────────────────────────────────────────────────

  get firstName()       { return this.form.get('firstName')!; }
  get lastName()        { return this.form.get('lastName')!; }
  get email()           { return this.form.get('email')!; }
  get role()            { return this.form.get('role')!; }
  get specialty()       { return this.form.get('specialty')!; }
  get licenseNumber()   { return this.form.get('licenseNumber')!; }
  get address()         { return this.form.get('address')!; }
  get password()        { return this.form.get('password')!; }
  get confirmPassword() { return this.form.get('confirmPassword')!; }

  get isDoctor(): boolean { return this.role.value === UserRole.Doctor; }
  get passwordMismatch(): boolean {
    return this.form.hasError('passwordMismatch') && this.confirmPassword.touched;
  }

  // ── Submit ────────────────────────────────────────────────────────────────

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMessage = '';

    const { confirmPassword, ...payload } = this.form.value;

    this.authService.register(payload).subscribe({
      error: (msg: string) => {
        this.errorMessage = msg;
        this.loading = false;
      }
    });
  }

  togglePassword(field: 'password' | 'confirm'): void {
    if (field === 'password') this.showPassword = !this.showPassword;
    else this.showConfirm = !this.showConfirm;
  }
}