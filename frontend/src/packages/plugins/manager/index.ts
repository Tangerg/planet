import Plugin from "../plugin";
import {IContext, IPlugin} from "../../core/types";
import {Manager as Store} from "../../model";

declare module "../../core/events" {
    interface EventMap {
        remove_plugin: string
        plugin_removed: string
    }
}

export class Manager extends Plugin {
    private store: Store<IPlugin> | undefined;
    private static id = "model";
    get id(): string {
        return Manager.id;
    }

    constructor() {
        super();
    }

    install(ctx: IContext) {
        super.install(ctx);
        this.store = new Store(ctx.logger)
    }

    afterInstall() {
        super.afterInstall();
        this.context.hooks.on("remove_plugin", this.remove.bind(this), this);
    }

    apply(plugins: IPlugin[]): void {
        this.store?.apply(plugins);
    }

    add(plugin: IPlugin): void {
        this.store?.put(plugin)
    }

    remove(id: string): void {
        if (this.store?.has(id)) {
            this.store?.delete(id);
            this.context.hooks.emit("plugin_removed", id);
        }
    }

    clear(): void {
        this.store?.clear();
    }

    all(): IPlugin[] {
        return this.store?.items() as unknown as IPlugin[]
    }

}