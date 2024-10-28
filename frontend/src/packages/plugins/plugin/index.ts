import {IContext, IPlugin} from "../../core/types";

export abstract class Plugin implements IPlugin {
    private installed: boolean = false;
    private _context: IContext | undefined = undefined;

    abstract get id(): string

    get context(): IContext {
        if (!this.installed || !this._context) {
            throw new Error('context can only be obtained after the plugin is installed');
        }
        return this._context
    }

    beforeInstall(): void {
    }

    install(ctx: IContext): void {
        if (this.installed) {
            ctx.logger.warn(`the plugin ${this.id} should be install only once`)
            return
        }
        this._context = ctx
        this.installed = true;
    }

    afterInstall(): void {

    }

    beforeUninstall(): void {

    }

    uninstall(): void {
        this._context = undefined
        this.installed = false
    }

    afterUninstall(): void {

    }


    dispose(): void {

    }
}

export default Plugin