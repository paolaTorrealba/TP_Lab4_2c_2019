import { Injectable } from '@angular/core';
import { Perfil } from '../clases/enum';
import { UsuarioService } from './usuario.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService {
  constructor(private usuarioService: UsuarioService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    let logeado: boolean = this.usuarioService.isUserLoggedIn();

    if (url == '/loguearse' || url == '/registrarse') {
      if (!logeado)
        return true;
      else
        return false;
    }

    if (logeado) {
      if (url == '/administracion' || url.includes('estadisticas') ) {
        if (this.usuarioService.usuario.perfil == Perfil.socio) {
          return true;
        }
      }

      if (url == '/turnos') {
        if (this.usuarioService.usuario.perfil != Perfil.socio) {
          return true;
        }
      }

      if (url == '/saladeespera') {
        if (this.usuarioService.usuario.perfil == Perfil.socio) {
          return true;
        }
      }
    }

    this.router.navigate([this.usuarioService.getInicioUrl()]);
    return false;
  }
}