import { HttpClient } from '@angular/common/http';
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

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.CreateForm();
  }

  async GetDistanceAlgorithm() {
    const s1 = this.LevenshteinDistanceForm.value.string1;
    const s2 = this.LevenshteinDistanceForm.value.string2;
    this.ResultDto = await this.http.get(`https://localhost:5001/api/DistanceAlgorithm/${s1}/${s2}`).toPromise() as LevenshteinDistanceDto;
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

}

export interface LevenshteinDistanceDto {
  string1: string;
  string2: string;
  matrix: number[][];
  levenshteinDistance: number;
}
