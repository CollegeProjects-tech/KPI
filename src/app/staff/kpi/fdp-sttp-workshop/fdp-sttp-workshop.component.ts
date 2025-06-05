import { CommonModule} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/api.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-fdp-sttp-workshop',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './fdp-sttp-workshop.component.html',
  styleUrl: './fdp-sttp-workshop.component.css'
})
export class FdpSttpWorkshopComponent implements OnInit {

 data : any;
 selectedFile: File | null = null;
 fdp_sttp_workshops : any;
 option:any;

 constructor(private api:ApiService){}

  ngOnInit(): void {
   this.load();
  }

   load(){
    this.getCurrentDateTime();
    this.api.get('fdp_sttp_workshop/fdp_sttp_workshops').subscribe((res:any)=>{
      this.fdp_sttp_workshops=res;
      console.log(res)
    })

    this.data = new FormGroup({
      // TEST_NAME: new FormControl('',Validators.compose([Validators.required])),
      selected_option : new FormControl(''),
      selected_sem: new FormControl(''),
      selected_year: new FormControl(''),
      details: new FormControl(''),
      teacher_id: new FormControl(),
      date: new FormControl()
    });
  }

  selectedOption(event: Event): void {
    this.option = (event.target as HTMLSelectElement).value;
  }

  getOriginalFileName(path: string): string {
  const fullName = path.split('/').pop(); // e.g., Demo - Gamepad (7)_20250512191714.png
  if (!fullName) return '';

  const nameOnly = fullName.substring(0, fullName.lastIndexOf('_')); // Remove timestamp
  return nameOnly;
}
download(path:any): void{
const parts = path.split('/');
  if (parts.length < 3) {
    console.warn('Invalid file path.');
    return;
  }

  const teacherId = parts[2]; // e.g., '2'
  const fullFileName = parts[3]; // e.g., 'Demo - Gamepad (7)_20250512191714.png'

  const baseName = fullFileName.substring(0, fullFileName.lastIndexOf('_'));

    this.api.downloadFile('Research/Download',teacherId, fullFileName).subscribe(
      (blob: Blob) => {
        // Create a URL for the blob and trigger the download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = baseName;  // Specify the file name for download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);  // Clean up the DOM
        window.URL.revokeObjectURL(url);  // Clean up the URL object
      },
      error => {
        console.error('Error downloading the file:', error);
      }
    );
}

  getCurrentDateTime(): string {
  const now = new Date();

  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);
  const hours = ('0' + now.getHours()).slice(-2);
  const minutes = ('0' + now.getMinutes()).slice(-2);
  const seconds = ('0' + now.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }
  submit(data:any) {
    if (!this.selectedFile) {
      alert('Please select a file');
      return;
    }
    this.data.date = this.getCurrentDateTime();

    this.api.saveFileForm("Research/SaveResearch",data, this.selectedFile)
      .subscribe({
        next: (res) => console.log('Upload successful:', res),
        error: (err) => console.error('Upload failed:', err)
      });
  }

}
