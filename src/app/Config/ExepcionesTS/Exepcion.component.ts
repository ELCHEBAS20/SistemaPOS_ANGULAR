import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';

@Injectable({
   providedIn: 'root'
})

export class ExepcionApp {

   public ExepDb: String = 'Elemento no encontrado..verifica por favor.';
   public ExepBadRequest: String = 'Peticion no se puede completar porque hubo un poblema con ella.';
   public alphabet: String = 'abcdefghijklmnopqrstuvwxyz';
   public ErrorSintaxis: String = 'Errores de sintaxis.';
   public ErrorValor: String = 'No es adecuado el valor que esta ingresado.';
   public MsgError300: string = '<small><strong>¡Por favor completar la información!</strong></small>';
   public functionCongratulationInserted(resp: any) {
      if (resp[1]) {
         Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Insertado correctamente.',
            showConfirmButton: false,
            timer: 1500
         })
      }
   }

}