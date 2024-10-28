import {IContext, IPlanet, IPlugin} from "../core/types";
import {Manager} from "../plugins/manager";

export type PlanetOption = {
    context: IContext;
    plugins: IPlugin[];
}


export class Planet implements IPlanet {
    private readonly _context: IContext
    private readonly pluginManager: Manager

    constructor(opt: PlanetOption) {
        this._context = opt.context;
        this.pluginManager = new Manager()
        this.pluginManager.beforeInstall()
        this.pluginManager.install(this._context)
        this.pluginManager.afterInstall()
        this.installPlugins(opt.plugins)
    }

    private installPlugins(plugins: IPlugin[]): void {
        this.pluginManager.apply(plugins)
    }

    get context(): IContext {
        return this._context
    }
}