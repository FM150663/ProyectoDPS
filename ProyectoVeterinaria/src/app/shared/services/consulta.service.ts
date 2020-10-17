import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// Model
import { Mascota } from '../services/mascota';
import { Consulta } from '../services/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  // Traer los datos de firebase
  mascotaList: AngularFireList<any>;
  consultaList: AngularFireList<any>;

  // Una variable temporal, para guardar los datos seleccionados
  mascotaSeleccionada: Mascota = new Mascota();
  consultaSeleccionada: Consulta = new Consulta();

  constructor(private firebase: AngularFireDatabase) { }
  /*Inician métodos para mascotas*/
  getMascotas() {
    return this.mascotaList = this.firebase.list('mascotas');    
  }

  insertarMascota(mascota: Mascota) {
    this.mascotaList.push({
        dueño: mascota.dueño,
        nombre: mascota.nombre,
        tipo: mascota.tipo,
        peso: mascota.peso,
        fechaNacimiento: mascota.fechaNacimiento
    });
  }

  /*Finalizan métodos para mascotas*/

  /*Inician métodos para consultas*/
  getConsultasPorDueño() {
    return this.consultaList = this.firebase.list('consulta');
  }

  insertarConsulta(consulta: Consulta) {
    this.consultaList.push({
        dueño: consulta.dueño,
        nombre: consulta.nombre,
        tipo: consulta.tipo,
        descripcion: consulta.descripcion,
        fecha: consulta.fecha,
        estado: "Pendiente"
    });
  }
  /*Finalizan métodos para consultas*/
}
