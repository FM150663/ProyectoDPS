import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { NgForm } from '@angular/forms';

//  Service 
import { ConsultaService } from '../../shared/services/consulta.service';
// Model
import { Consulta } from '../../shared/services/consulta';
// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public consultaService: ConsultaService,
    public toastr: ToastrService 
  ) { }

  ngOnInit(): void {
  }

}
