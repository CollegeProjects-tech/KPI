import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Workbook } from 'exceljs';


@Component({
  selector: 'app-principle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './principle.component.html',
  styleUrl: './principle.component.css'
})
export class PrincipleComponent implements OnInit {

  teachers: any;
  details: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  getTeacher(event: Event): void {
    this.teachers = "";
    this.details = null;
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log(selectedValue);  // e.g., "CSE"

    this.api.get('Principle/DipartmentsWiseTeachers/' + selectedValue).subscribe((res: any) => {
      this.teachers = res;
      console.log(res);

    });
  }
  getData(event: Event): void {
    this.details = null;

    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log(selectedValue);  // e.g., "CSE"

    this.api.get('Principle/ViewDetails/' + selectedValue).subscribe((res: any) => {
      this.details = res;
      console.log(res);

    });
  }

  getOriginalFileName(path: string): string {
    const fullName = path.split('/').pop(); // e.g., Demo - Gamepad (7)_20250512191714.png
    if (!fullName) return '';

    const nameOnly = fullName.substring(0, fullName.lastIndexOf('_')); // Remove timestamp
    return nameOnly;
  }
  download(path: any): void {
    const parts = path.split('/');
    if (parts.length < 3) {
      console.warn('Invalid file path.');
      return;
    }

    const teacherId = parts[2]; // e.g., '2'
    const fullFileName = parts[3]; // e.g., 'Demo - Gamepad (7)_20250512191714.png'

    const baseName = fullFileName.substring(0, fullFileName.lastIndexOf('_'));

    this.api.downloadFile('Research/Download', teacherId, fullFileName).subscribe(
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

  exportToStyledExcel(data: any[]): void {
    const wb = new Workbook();
    const ws = wb.addWorksheet('Sheet1');

    // 1) Group your data by source_table
    const grouped = data.reduce((g, item) => {
      const src = item.source_table || 'Unknown';
      (g[src] = g[src] || []).push(item);
      return g;
    }, {} as Record<string, any[]>);

    let rowIndex = 1;
    Object.entries(grouped).forEach(([source, rows]) => {
      // --- Group title row ---
      const titleRow = ws.getRow(rowIndex);
      titleRow.getCell(1).value = source;
      titleRow.height = 30;
      // merge across all columns (say your data has 8 cols: A–H)
      ws.mergeCells(rowIndex, 1, rowIndex, 8);
      titleRow.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
      titleRow.getCell(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFF00' } // yellow
      };
      titleRow.getCell(1).font = {
        bold: true,
        size: 14
      };
      rowIndex++;

      // --- Header row ---
      const headers = ['id', 'teacher_id', 'selected_option', 'selected_sem', 'selected_year', 'details', 'file_path', 'date'];
      const headerRow = ws.getRow(rowIndex);
      headers.forEach((h, i) => {
        const cell = headerRow.getCell(i + 1);
        cell.value = h;
        cell.font = { bold: true };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'C0C0C0' }  // Yellow background
        };
        cell.alignment = { horizontal: 'center', vertical: 'middle'  };
      });
      headerRow.height = 18;
      rowIndex++;

      // --- Data rows ---
      (rows as any[]).forEach((item: any) => {
        const dataRow = ws.getRow(rowIndex);
        headers.forEach((h, i) => {
          dataRow.getCell(i + 1).value = item[h];
        });
        rowIndex++;
      });

      // blank row between groups
      rowIndex++;
    });

    // Auto-width columns
    ws.columns.forEach((col: any) => {
      let max = 10;
      col.eachCell({ includeEmpty: true }, (c: any) => {
        const v = c.value ? c.value.toString().length : 0;
        if (v > max) max = v;
      });
      col.width = max + 2;
    });

    // Write & save
    wb.xlsx.writeBuffer().then((buffer: any) => {
      const blob = new Blob([buffer], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      FileSaver.saveAs(blob, `TeacherData_${Date.now()}.xlsx`);
    });
  }

}
