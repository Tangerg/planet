import {IContext, IPlanet, IPlugin} from "../core/types";
import {ILogger} from "../logger";
import Options from "../core/options";

export type PlanetOption = {
    options: Options;
    logger: ILogger;
    context: IContext;
    plugins: IPlugin[];
}


class Planet implements IPlanet {
    private readonly _context: IContext

    constructor(opt: PlanetOption) {
        this._context = opt.context;
    }

    get context(): IContext {
        return this._context
    }
}