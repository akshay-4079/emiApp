import { Component, OnInit } from '@angular/core';
import {EmiConstructor} from '../EMI';
declare var google:any;

@Component({
  selector: 'app-emi-calc',
  templateUrl: './emi-calc.component.html',
  styleUrls: ['./emi-calc.component.css']
})

export class EmiCalcComponent implements OnInit {
  
  emiCalc:EmiConstructor;
  mydata:[
    number,
    number
  ];
  myType:'PieChart';
  constructor(){
    this.emiCalc=new EmiConstructor(100000,10,1,11000);
  }
  

  ngOnInit() {
    google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(this.drawChart);

  }
  drawChart(Int,Prin) {
  
    var data = google.visualization.arrayToDataTable([
    ['Option', 'Amount'],
    ['Interest', Int],
    ['Principal', Prin],
  ]);
    var options = {'title':'Split Up',is3D:true}
    var chart = new google.visualization.PieChart(document.getElementById('chartContainer'));
    chart.draw(data, options);
  }
  onUpdate(){
   {
      var r1=this.emiCalc.Interest/100;
      console.log(r1);
      var r2=Math.pow(1+r1,this.emiCalc.Months);
      console.log(r2);
      var r3=this.emiCalc.Principal*r1*r2;
      console.log(r3);
      var r4=r2-1;
      console.log(r4);
      var r5=r3/r4;
      console.log(r5)
      var EMI=r5;
      var Interest=(this.emiCalc.Months*EMI)-this.emiCalc.Principal;  
      this.mydata=[
        Interest,
        this.emiCalc.Principal
      ];
      this.emiCalc.Inst=Math.floor(r5/12);
      this.drawChart(this.mydata[0],this.mydata[1])
      console.log(this.mydata)
      }
  }


}

