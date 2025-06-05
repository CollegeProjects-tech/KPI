import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './research.component.html',
  styleUrl: './research.component.css'
})
export class ResearchComponent implements OnInit {

  data!: FormGroup;
  selectedFile: File | null = null;
  Researches: any;
  option: string = '';
  user_data: any;
  fileTouched = false;


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.api.get('Research/Researches').subscribe((res: any) => {
      this.Researches = res;
    });

    this.user_data = this.localstorageData();

    this.data = new FormGroup({
      selected_option: new FormControl('', Validators.required),
      selected_sem: new FormControl('', Validators.required),
      selected_year: new FormControl('', Validators.required),
      details: new FormControl('', Validators.required),
      teacher_id: new FormControl(this.user_data.id),
      date: new FormControl(this.getCurrentDateTime()),
      department: new FormControl(this.user_data.department),
    });
  }

  localstorageData() {
    let data = {};
    if (typeof window !== 'undefined' && window.localStorage) {
      data = JSON.parse(localStorage.getItem("data") || '{}');
    }
    return data;
  }

  selectedOption(event: Event): void {
    this.option = (event.target as HTMLSelectElement).value;
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  getCurrentDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);
    return `${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`;
  }

  getOriginalFileName(path: string): string {
    const fullName = path.split('/').pop();
    if (!fullName) return '';
    return fullName.substring(0, fullName.lastIndexOf('_'));
  }

  download(path: any): void {
    const parts = path.split('/');
    if (parts.length < 3) return;

    const teacherId = parts[2];
    const fullFileName = parts[3];
    const baseName = fullFileName.substring(0, fullFileName.lastIndexOf('_'));

    this.api.downloadFile('Research/Download', teacherId, fullFileName).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = baseName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error downloading the file:', error);
      }
    );
  }

  submit(data: any) {
    if (!this.data.valid) {
      alert('Please fill all required fields.');
      return;
    }

    if (!this.selectedFile) {
      alert('Please select a file.');
      return;
    }

    this.data.patchValue({ date: this.getCurrentDateTime() });

    this.api.saveFileForm("Research/SaveResearch", data, this.selectedFile).subscribe({
      next: () => {
        alert('Upload successful!');
        this.load();
      },
      error: (err) => {
        console.error('Upload failed:', err);
        alert('Error uploading. Please try again.');
      }
    });
  }
}
