import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  LevenshteinDistanceForm: FormGroup;
  string1: string;
  string2: string;
  ResultDto: LevenshteinDistanceDto;
  s1Arr: string[];
  s2Arr: string[];
  validationMassage: string;
  token: string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.CreateForm();
    this.getJwtToken();
  }

  async GetDistanceAlgorithm() {
    this.ResultDto = undefined;
    this.validationMassage = undefined;
    if (!this.LevenshteinDistanceForm.valid) {
      this.validationMassage = '* Strings can not be empty. Both strings are required';
      return;
    }
    const s1 = this.LevenshteinDistanceForm.value.string1;
    const s2 = this.LevenshteinDistanceForm.value.string2;

    const header = { Authorization: this.token };

    this.ResultDto = await this.http.get(`https://localhost:5001/api/DistanceAlgorithm/${s1}/${s2}`,
      { headers: header }).toPromise() as LevenshteinDistanceDto;
    console.log(this.ResultDto);
    this.s1Arr = this.ResultDto.string1.split('');
    this.s2Arr = this.ResultDto.string2.split('');
  }

  CreateForm() {
    this.LevenshteinDistanceForm = this.formBuilder.group({
      string1: [this.string1, [Validators.required]],
      string2: [this.string2, [Validators.required]]
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  async getJwtToken() {
    const response = await this.http.post('https://dev-ap3hkf0m.us.auth0.com/oauth/token',
      {
        client_id: '14IhghDGnPuSrqLIP0VtakawEJ5xeF2U',
        client_secret: 'v7gyONI9DLw5Rib5oGz-UUhxl9n3_-2XH5ae9Xn9FiLo1bUCe3OdG0jTXp5AD7Zu',
        audience: 'https://localhost:5100',
        grant_type: 'client_credentials'
      }).toPromise() as any;
    console.log(response);
    this.token = 'Bearer ' + response.access_token;
  }

}

export interface LevenshteinDistanceDto {
  string1: string;
  string2: string;
  matrix: number[][];
  levenshteinDistance: number;
}
