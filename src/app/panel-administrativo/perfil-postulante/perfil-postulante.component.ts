import { DatosUsuario } from './../../shared/dtos/usuario-dtos';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InfoUsuarioService } from '../../shared/services/info-usuario.service';
import { firstValueFrom } from 'rxjs';
import { PerfilPostulanteService } from './perfil-postulante.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil-postulante',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './perfil-postulante.component.html',
  styleUrl: './perfil-postulante.component.scss',
})
export class PerfilPostulanteComponent implements OnInit {
  constructor(private infoUsuario: InfoUsuarioService, private postulanteService: PerfilPostulanteService) {}

  form = new FormGroup({
    nombre: new FormControl('', Validators.minLength(1)),
    idiomas: new FormControl('', Validators.minLength(1)),
    habilidades: new FormControl('', Validators.minLength(1)),
    nombre_empresa: new FormControl('', Validators.minLength(1)),
    contacto: new FormControl('', Validators.minLength(1)),
    tipo_cargo: new FormControl('', Validators.minLength(1)),
    fecha_inicio: new FormControl('', Validators.minLength(1)),
    fecha_finalizacion: new FormControl('', Validators.minLength(1)),
    responsabilidades: new FormControl('', Validators.minLength(1)),
    titulo_obtenido: new FormControl('', Validators.minLength(1)),
    institucion: new FormControl('', Validators.minLength(1)),
    area_de_estudio: new FormControl('', Validators.minLength(1)),
    fecha_inicio_estudio: new FormControl('', Validators.minLength(1)),
    fecha_finalizacion_estudio: new FormControl('', Validators.minLength(1)),
    promedio_ponderado: new FormControl(0, Validators.min(1)),
    reconocimientos: new FormControl('', Validators.minLength(1)),
  });

  habilitarBotonGuardarCambios = true;

  async ngOnInit() {
    await this.cargarTodosLosDatosDelPostulante();
  }

  private async cargarTodosLosDatosDelPostulante() {
    await this.obtenerNombreUsuario();
    await this.obtenerDatosPostulante();
    await this.obtenerDatosExperiencia();
    await this.obtenerDatosEducacion();
  }

  private async obtenerNombreUsuario() {
    const nombre = (await firstValueFrom(this.infoUsuario.obtenerUsuarioDeBaseDeDatos())).nombres;
    this.form.get('nombre')?.setValue(nombre);
  }

  private async obtenerDatosPostulante() {
    const postulante = await firstValueFrom(this.postulanteService.obtenerPerfilPostulante());
    this.form.get('habilidades')?.setValue(postulante.habilidades);
    this.form.get('idiomas')?.setValue(postulante.idiomas);
  }

  private async obtenerDatosExperiencia() {
    const respuesta = await firstValueFrom(this.postulanteService.obtenerExperienciaPostulante());
    const experiencia = respuesta[0];
    this.form.get('nombre_empresa')?.setValue(experiencia.nombre_empresa);
    this.form.get('contacto')?.setValue(experiencia.contacto);
    this.form.get('tipo_cargo')?.setValue(experiencia.tipo_cargo);
    this.form.get('fecha_inicio')?.setValue(experiencia.fecha_inicio);
    this.form.get('fecha_finalizacion')?.setValue(experiencia.fecha_finalizacion);
    this.form.get('responsabilidades')?.setValue(experiencia.responsabilidades);
  }

  private async obtenerDatosEducacion() {
    const respuesta = await firstValueFrom(this.postulanteService.obtenerEducacionPostulante());
    const educacion = respuesta[0];
    this.form.get('titulo_obtenido')?.setValue(educacion.titulo_obtenido);
    this.form.get('institucion')?.setValue(educacion.titulo_obtenido);
    this.form.get('area_de_estudio')?.setValue(educacion.titulo_obtenido);
    this.form.get('fecha_inicio_estudio')?.setValue(educacion.fecha_inicio);
    this.form.get('fecha_finalizacion_estudio')?.setValue(educacion.fecha_finalizacion);
    this.form.get('promedio_ponderado')?.setValue(educacion.promedio_ponderado);
    this.form.get('reconocimientos')?.setValue(educacion.reconocimientos);
  }

  async guardarPerfilPostulante() {
    console.log(this.form.valid);
    console.log(this.form.value);
    await this.actualizarUsuario();
    await this.cargarTodosLosDatosDelPostulante();
  }

  private async actualizarUsuario() {
    const usuario: DatosUsuario = {
      id: this.infoUsuario.obtenerInfoUsuario().id,
      cedula: 0,
      nombres: this.form.get('nombre')?.value || '',
      apellidos: '',
      fecha_nacimiento: '',
      lugar_residencia: 0,
      correo: '',
      rol: 0,
      passwd: '',
    };
    await firstValueFrom(this.infoUsuario.actualizarUsuario(usuario));
  }
}