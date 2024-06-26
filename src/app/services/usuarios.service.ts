import { Injectable, inject } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private path: string = "usuarios";
  private firestore: Firestore = inject(Firestore);
  private usuarios: Observable<Usuario[]>;

  constructor() {
    this.usuarios = collectionData(collection(this.firestore, this.path)) as Observable<Usuario[]>;
  }

  agregarUsuario(usuario: Usuario) {
    const usuarios = collection(this.firestore, this.path);
    return addDoc(usuarios, usuario);
  }

  getUsuarios() {
    return this.usuarios;
  }

  getUsuario(email: string) {
    return new Promise<Usuario>((resolve, reject)=>{
      this.usuarios.subscribe(
        (next: Usuario[]) => {
          for (const item of next) {
            if (item.email == email) {
              resolve(item);
            }
          }
        },
        (error) => {
          reject(error)
        }
      );
    });
  }

}