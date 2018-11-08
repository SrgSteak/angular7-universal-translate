"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var app_component_1 = require("./app.component");
var shop_module_1 = require("./pages/shop/shop.module");
var app_client_module_1 = require("./app.client.module");
var beta_component_1 = require("./beta.component");
var core_2 = require("@ngx-translate/core");
// AoT requires an exported function for factories
function HttpLoaderFactory(http) {
    return new http_loader_1.TranslateHttpLoader(http);
}
exports.HttpLoaderFactory = HttpLoaderFactory;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule.withServerTransition({ appId: 'angular7-universal-translate' }),
                app_client_module_1.AppClientModule,
                shop_module_1.ShopModule,
                core_2.TranslateModule,
            ],
            declarations: [app_component_1.AppComponent, beta_component_1.BetaComponent],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map