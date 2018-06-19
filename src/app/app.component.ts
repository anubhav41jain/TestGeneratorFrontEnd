import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyRestService } from './my-rest.service';
import { Question } from './question';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ["../../node_modules/bootstrap/dist/css/bootstrap.min.css", './app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Test Generator';
  model = new Question();
  selectedClass;
  selectedSub;
  selectedChap;
  url = '';
  chapUrl = '';
  classes;
  subjects;
  chapters;
  //constructor(private myservice: MyRestService) {}
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.model.className = "Select";
    this.model.subject = "Select";
    this.model.chapter = "Select";
    this.model.marks = "";
    this.model.ques = "";
    this.model.ans = "";
    console.log("=========URL===========" + this.url);
    //this.myservice.getAllClasses().subscribe(res => this.classes = res);
    this.http.get('http://localhost:8787/test/api/getAllClasses').subscribe(clas => {
      console.log("=========================================clas=======================================" + clas);
      this.classes = clas;
      console.log("=========COMPOONENT CLASSES===========" + this.classes);
      console.log('selected: model =' + this.model.className + 'className: ');
    });

  };

  onInputClass($event) {
    $event.preventDefault();
    console.log('selected: ' + $event.target.value + ' model =' + this.model.className);
    this.selectedClass = $event.target.value;
    this.url = 'http://localhost:8787/test/api/getAllSubjects?className=' + this.selectedClass;
    console.log(this.url);
    this.http.get(this.url).subscribe(data => {
      console.log("=========================================DATA=======================================" + data);
      this.subjects = data;
    });


    //this.selectedClass=$event.target.value;	
    //this.subjects=this.myservice.getAllSubjects(this.selectedClass);
  }
  onInputSub($event) {
    $event.preventDefault();
    console.log('selected: ' + $event.target.value);
    this.selectedSub = $event.target.value;
    this.chapUrl = 'http://localhost:8787/test/api/getAllChapters?className=' + this.selectedClass + '&subjectName=' + this.selectedSub;
    console.log("chapURL === " + this.chapUrl);
    this.http.get(this.chapUrl).subscribe(chaps => {
      console.log("===================================SELECTED======chaps=======================================" + chaps);
      this.chapters = chaps;
      this.selectedChap = this.chapters[0];
    });
  }

  onSubmit(value: Question) {
    console.log("abcdefghi");
    console.log(value);

    var addUrl = 'http://localhost:8787/test/api/add';
    console.log("addUrl === " + addUrl);
    this.http.put(addUrl, value).subscribe(res => {
      console.log("===================================RES=======================================" + res);
    });
  }

}
