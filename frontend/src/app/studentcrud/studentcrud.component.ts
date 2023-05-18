import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-studentcrud',
  templateUrl: './studentcrud.component.html',
  styleUrls: ['./studentcrud.component.scss']
})
export class StudentcrudComponent {


  StudentArray : any[] = [];
  currentStudentID = "";

  name: string ="";
  address: string ="";
  phone: string ="";


  constructor(private http: HttpClient )
  {
    this.getAllStudent();
  }
  getAllStudent() 
  {
    this.http.get("http://localhost:8000/user/getAll")
    .subscribe((resultData: any)=>
    {
      
        console.log(resultData);
        this.StudentArray = resultData.data;
    });
  }

  setUpdate(_t39: any) 
  {
    this.name = _t39.name;
   this.address = _t39.address;
   this.phone = _t39.phone;
 
   this.currentStudentID = _t39._id;
  
  }
 
  UpdateRecords()
  {
    let bodyData = {
      "name" : this.name,
      "address" : this.address,
      "phone" : this.phone,
 
    };
    
    this.http.patch("http://localhost:8000/user/update"+ "/"+this.currentStudentID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Updateddd")
        this.getAllStudent();
      
    });
  }

  setDelete(_t39: any) {
    this.http.delete("http://localhost:8000/user/delete"+ "/"+ _t39._id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Deletedddd")
        this.getAllStudent();
  
    });
    }
    
  save()
  {
    if(this.currentStudentID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }
    }


  register()
  {
 
    let bodyData = {
      "name" : this.name,
      "address" : this.address,
      "phone" : this.phone,
  };
    this.http.post("http://localhost:8000/user/create",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Successfully")
         //this.getAllEmployee();
        this.name = '';
        this.address = '';
        this.phone  = '';
    });
  }
}


