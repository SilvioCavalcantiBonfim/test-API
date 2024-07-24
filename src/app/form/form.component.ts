import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogoComponent } from '../logo/logo.component';
import { TestService } from '../service/test.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, LogoComponent, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private fb: FormBuilder, public testService: TestService) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      protocol: ['http', Validators.required],
      hostname: ['localhost', Validators.required],
      port: [8080, [Validators.required, Validators.min(1), Validators.max(65535)]]
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.testService.start(this.myForm.value);
    }
  }
}