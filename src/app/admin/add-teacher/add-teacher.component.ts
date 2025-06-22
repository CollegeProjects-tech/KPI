import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-teacher.component.html',
  styleUrl: './add-teacher.component.css'
})
export class AddTeacherComponent implements OnInit {

  teacherForm!: FormGroup;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.teacherForm = new FormGroup({
      user_name: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact_no: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      userid: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      usertype: new FormControl('teacher'),
      flag: new FormControl('Active'),
      password:new FormControl('')
     
    });
  }

  onSubmit(data:any): void {
    console.log(data);
    data.password = data.contact_no;
    // if (!this.teacherForm.valid) {
    //   alert('Please fill all required fields correctly.');
    //   this.teacherForm.markAllAsTouched();
    //   return;
    // }
     

    this.api.post('Admin/SaveUser', data).subscribe({
      next: () => {
        console.log("Post");
        
        alert('Teacher added successfully!');
        this.teacherForm.reset();
      },
      // error: (err) => {
      //   console.error('Error adding teacher:', err);
      //   alert('Failed to add teacher. Please try again.');
      // }
    });
  }
}
