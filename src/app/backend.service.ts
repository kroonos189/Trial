import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl = 'http://localhost:8085/trains';

  constructor(private http:HttpClient) { }

  getTrain(trainNumber: string):any {
    return this.http.get(`${this.baseUrl}/${trainNumber}`);
  }

  getAllTrains(): any {
    return this.http.get(this.baseUrl);
  }

  addTrain(train: any): any{
    return this.http.post(this.baseUrl, train);
  }

  updateTrain(trainNumber: string, train: any): any {
    console.log(train)
    return this.http.put(`${this.baseUrl}/${trainNumber}`, train);
  }

  deleteTrain(trainNumber: string): any{
    return this.http.delete(`${this.baseUrl}/${trainNumber}`);
  }
}
