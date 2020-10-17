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
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  listadoConsultas: Consulta[];

  constructor(
    public authService: AuthService,
    public consultaService: ConsultaService,
    public toastr: ToastrService 
  ) { }

  ngOnInit() {    
    return this.consultaService.getConsultasPorDueño()
      .snapshotChanges().subscribe(item => {
        this.listadoConsultas = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.listadoConsultas.push(x as Consulta);
        });
      });
  }
}
