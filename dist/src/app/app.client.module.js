"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@ngx-translate/core");
var app_module_1 = require("./app.module");
var http_1 = require("@angular/common/http");
var ngx_translate_router_1 = require("@gilsdav/ngx-translate-router");
var ngx_translate_router_http_loader_1 = require("@gilsdav/ngx-translate-router-http-loader");
var router_1 = require("@angular/router");
var list_component_1 = require("./pages/shop/list/list.component");
var common_1 = require("@angular/common");
exports.routes = [
    {
        path: 'list', component: list_component_1.ListComponent
    },
    {
        path: 'list/:country/:province/:town', component: list_component_1.ListComponent
    }
];
var AppClientModule = /** @class */ (function () {
    function AppClientModule() {
    }
    AppClientModule = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpClientModule,
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: app_module_1.HttpLoaderFactory,
                        deps: [http_1.HttpClient]
                    }
                }),
                ngx_translate_router_1.LocalizeRouterModule.forRoot(exports.routes, {
                    parser: {
                        provide: ngx_translate_router_1.LocalizeParser,
                        useFactory: function (translate, location, settings, http) {
                            return new ngx_translate_router_http_loader_1.LocalizeRouterHttpLoader(translate, location, settings, http);
                        },
                        deps: [core_2.TranslateService, common_1.Location, ngx_translate_router_1.LocalizeRouterSettings, http_1.HttpClient]
                    }
                }),
                router_1.RouterModule.forRoot(exports.routes)
            ],
            exports: [
                router_1.RouterModule,
                ngx_translate_router_1.LocalizeRouterModule,
                core_2.TranslatePipe
            ]
        })
    ], AppClientModule);
    return AppClientModule;
}());
exports.AppClientModule = AppClientModule;
//# sourceMappingURL=app.client.module.js.map