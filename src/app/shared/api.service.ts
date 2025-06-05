import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  // baseurl="https://localhost:7195/api/";
  baseurl="https://sgukpi.bsite.net/api/";
  constructor(private http:HttpClient) {}

  get(api: string) {
    //console.log(this.baseurl + api);
    return this.http.get(this.baseurl + api)
  };

  post(api: string, data: any) {
    return this.http.post(this.baseurl + api, data)
  };

  put(api: string, data: any) {
    return this.http.put(this.baseurl + api, data)
  };

  delete(api: string) {
    return this.http.delete(this.baseurl + api)
  };

  get_Dashboard<T>(url: string): Observable<T> {
  return this.http.get<T>(`${this.baseurl}${url}`);
}


  saveFileForm(api: string,research: any, file: File) {
    const formData = new FormData();

    // Append the file
    formData.append('file', file);

    // Append all research fields individually
    for (const key in research) {
      if (research.hasOwnProperty(key) && research[key] !== undefined && research[key] !== null) {
        formData.append(key, research[key]);
      }
    }

    return this.http.post(`${this.baseurl + api}`, formData);
  }

  downloadFile(api:string,teacherId: string, fileName: string): Observable<Blob> {
    const url = `${this.baseurl + api}/${teacherId}/${encodeURIComponent(fileName)}`;

    return this.http.get(url, { responseType: 'blob' });
  }


  localstorageData() {
  let data: any[] = [];
  if (typeof window !== 'undefined' && window.localStorage) {
    const raw = localStorage.getItem("data");
    if (raw) {
      try {
        data = JSON.parse(raw);
      } catch (e) {
        console.error("Error parsing localStorage data:", e);
        data = [];
      }
    }
  }
  return data;
}


}
