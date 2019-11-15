var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
var CulqiService = (function () {
    function CulqiService(events, clqSrv, strg) {
        var _this = this;
        this.events = events;
        this.clqSrv = clqSrv;
        this.strg = strg;
        this.settings = {
            title: '',
            currency: '',
            description: '',
            amount: 0
        };
        document.addEventListener('payment_event', function (token) {
            var token_id = token.detail;
            _this.events.publish('on_event_loading_pago');
            _this.strg.get('id_user').then(function (val) {
                console.log('id_user', val);
                var id_user = val;
                _this.strg.get('id_membership').then(function (val) {
                    console.log('id_membership', val);
                    var id_membership = val;
                    _this.sendPayment(token_id, id_user, id_membership);
                });
            });
        }, false);
    }
    CulqiService.prototype.initCulqi = function () {
        Culqi.publicKey = "PUBLIC_KEY";
    };
    CulqiService.prototype.cfgFormulario = function (descripcion, cantidad) {
        this.settings.title = 'nameStore';
        this.settings.currency = "PEN";
        this.settings.description = descripcion;
        this.settings.amount = cantidad * 100;
        Culqi.settings({
            title: 'ImageClub',
            currency: 'PEN',
            description: descripcion,
            amount: cantidad * 100
        });
        Culqi.options({
            lang: 'auto',
            modal: true,
            installments: false,
            customButton: ""
        });
    };
    CulqiService.prototype.open = function () {
        Culqi.open();
    };
    CulqiService.prototype.sendPayment = function (token_id, id_user, id_membership) {
        var body = JSON.stringify({
            token: token_id,
            amount: this.settings.amount,
            currency_code: "PEN",
            id_user: id_user,
            id_membership: id_membership
        });
    };
    CulqiService.prototype.successPayment = function (response) {
        this.events.publish('on_event_pago', response);
    };
    CulqiService.prototype.errorPayment = function (response) {
        this.events.publish('on_event_pago_error', response);
    };
    CulqiService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Events,
            CulqiService,
            Storage])
    ], CulqiService);
    return CulqiService;
}());
export { CulqiService };
//# sourceMappingURL=CulqiService.js.map