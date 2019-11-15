import { Events } from '@ionic/angular';
export declare class CulqiService {
    private events;
    private clqSrv;
    private strg;
    settings: any;
    constructor(events: Events, clqSrv: CulqiService, strg: Storage);
    initCulqi(): void;
    cfgFormulario(descripcion: string, cantidad: number): void;
    open(): void;
    sendPayment(token_id: any, id_user: any, id_membership: any): void;
    successPayment(response: any): void;
    errorPayment(response: any): void;
}
