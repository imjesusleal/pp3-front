import { Injectable } from '@angular/core';
import { HttpCoreService } from '../http-core/http-core.service';
import { enviroment } from '../../../../../app/src/enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  private url: string = enviroment.urlDownload;

  constructor(private http: HttpCoreService) { }

  upload$(file: File): Observable<string>{
    const fullUrl = this.url + 'save_img';
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post$(fullUrl, formData);
  }

  download$(img_name: string): Observable<any>{
    const fullUrl = this.url + 'download';
    const cmd = {
      img_name: img_name
    };
    return this.http.download$(fullUrl, cmd);
  }
}
