import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../shared/services/auth.service";
import { NgForm } from '@angular/forms';

//  Service 
import { ConsultaService } from '../../../shared/services/consulta.service';
// Model
import { Consulta } from '../../../shared/services/consulta';
import { Mascota } from '../../../shared/services/mascota';
// toastr
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  listadoMascotas: Mascota[];
  opcionSeleccionado:string;
  mascotaSeleccion:string;
  usuario: string;

  constructor(
    public authService: AuthService,
    public consultaService: ConsultaService,
    public toastr: ToastrService 
  ) { }

  ngOnInit(): void {
    this.obtener();
    this.opcionSeleccionado="Selecciona";
    this.mascotaSeleccion="Selecciona tu mascota";
    this.usuario = "montiagudo.daniel@gmail.com"; //this.authService.userData.email

    this.resetForm();
  }

  private obtener(){
    this.consultaService.getMascotas()
      .snapshotChanges().subscribe(item => {
        this.listadoMascotas = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.listadoMascotas.push(x as Mascota);
        });
      });
  }

  public insertarMascota(MascotaForm: NgForm) {
    if (MascotaForm.value.$key == null){
      var nuevaMascota: Mascota;
      nuevaMascota = new Mascota();
      nuevaMascota.dueño = this.authService.userData.email;
      nuevaMascota.nombre = this.opcionSeleccionado;
      nuevaMascota.tipo = MascotaForm.value.tipo;
      nuevaMascota.peso = MascotaForm.value.peso;
      nuevaMascota.fechaNacimiento = MascotaForm.value.fechaNacimiento;
      
      this.consultaService.insertarMascota(nuevaMascota);      
    }

    this.resetForm(MascotaForm);
    this.toastr.success('Operación Exitosa', 'Mascota Registrada');
  }

  public insertarConsulta(ConsultaForm: NgForm) {
    if (ConsultaForm.value.$key == null){
      var nuevaConsulta: Consulta;
      nuevaConsulta = new Consulta();
      nuevaConsulta.dueño = this.authService.userData.email;
      nuevaConsulta.nombre = this.mascotaSeleccion;
      nuevaConsulta.tipo = ConsultaForm.value.tipo;
      nuevaConsulta.descripcion = ConsultaForm.value.descripcion;
      nuevaConsulta.fecha = ConsultaForm.value.fecha;
      
      this.consultaService.insertarConsulta(nuevaConsulta);      
    }

    this.resetForm(ConsultaForm);
    this.toastr.success('Operación Exitosa', 'Consulta Registrada');
  }

  resetForm(MascotaForm?: NgForm) {
    if (MascotaForm != null)
    MascotaForm.reset();

    this.consultaService.getMascotas();
    this.consultaService.getConsultasPorDueño();
    this.consultaService.consultaSeleccionada = new Consulta();
    this.consultaService.mascotaSeleccionada = new Mascota();
  }

}
