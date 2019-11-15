import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';

declare let Culqi: any;

@Injectable({
  providedIn: 'root'
})

export class CulqiService {
  settings: any = {
    title: '',
    currency: '',
    description: '',
    amount: 0
  };

  constructor(private events: Events,
              private clqSrv: CulqiService,
              private strg: Storage) {
   document.addEventListener ('payment_event', (token: any) => {
      // Capturamos el token que se creo
      let token_id = token.detail;
      /*
        Disparamos este evento para que mientras el pago se procese, 
        un loading cargue la pantalla principal y no se pueda hacer nada
      */
      this.events.publish('on_event_loading_pago');

      /*
        Creamos el headers con el token privado que nos da culqi
        * Recuerda que el Token Privado es diferente al Token Publico
      */ 
     
     this.strg.get('id_user').then((val) => {
       console.log('id_user', val);
       var id_user = val;
       this.strg.get('id_membership').then((val) => {
        console.log('id_membership', val);
        var id_membership = val;
         this.sendPayment(token_id,id_user,id_membership);
      });
     });
    }, false);
  }

  initCulqi () {
      // Ingresa tu "Puclic Key" que te da Culqi aqui
      Culqi.publicKey = "PUBLIC_KEY";
  }

  cfgFormulario (descripcion: string, cantidad: number) {
    this.settings.title = 'nameStore';
    this.settings.currency = "PEN";
    this.settings.description = descripcion;
    this.settings.amount = cantidad*100;

    Culqi.settings ({
      title: 'ImageClub', 
      currency: 'PEN',            
      description: descripcion,
      amount: cantidad*100
    });

    Culqi.options({
      lang: 'auto',
      modal: true,
      installments: false,
      customButton:""
    });
  }

  open () {
    Culqi.open ();
  }

  sendPayment(token_id,id_user,id_membership){
    let body = JSON.stringify ({
      token: token_id,
      amount: this.settings.amount,
      currency_code: "PEN",
      id_user: id_user, /* CAMBIAR_USUARIO */
      id_membership:id_membership
    });
  }

  successPayment(response){
    this.events.publish ('on_event_pago', response);
  }

  errorPayment(response){
    this.events.publish ('on_event_pago_error', response);
  }
}