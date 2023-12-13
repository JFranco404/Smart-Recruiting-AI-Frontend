import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PerfilPostulanteDto, ExperienciaDto } from './perfil-postulante.dtos';

@Injectable({
  providedIn: 'root'
})
export class PerfilPostulanteService {

  constructor(private http: HttpClient) { }

  obtenerPerfilPostulante():Observable<PerfilPostulanteDto>{
    return this.http.get<PerfilPostulanteDto>("/perfil-postulante")
  }

  obtenerExperienciaPostulante():Observable<ExperienciaDto[]>{
    return this.http.get<ExperienciaDto[]>("/experiencia")
  }
}
