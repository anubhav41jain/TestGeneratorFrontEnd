import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyRestService {
  url='';  
  classes;
  subjects;
  serviceproperty = "Service Created";
   
  	constructor(private http: HttpClient){
	}
   getAllClasses() {
      
	  this.http.get('http://localhost:8787/test/api/getAllClasses').subscribe(data => {
      console.log("=========================================DATA======================================="+data);
	  this.classes=data;
	  });
      return this.classes;
   }
   getAllSubjects(selectedClass) {
	   this.url='http://localhost:8787/test/api/getAllSubjects?className='+selectedClass;
	 console.log(this.url);
	 this.http.get(this.url).subscribe(data => {
      console.log("=========================================DATA======================================="+data);
	  this.subjects=data;
    });
	return this.subjects;
   }
}
