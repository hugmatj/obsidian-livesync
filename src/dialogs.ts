import { ButtonComponent } from "obsidian";
import { App, FuzzySuggestModal, MarkdownRenderer, Modal, Plugin, Setting } from "./deps";
import ObsidianLiveSyncPlugin from "./main";

//@ts-ignore
import PluginPane from "./PluginPane.svelte";

export class PluginDialogModal extends Modal {
    plugin: ObsidianLiveSyncPlugin;
    logEl: HTMLDivElement;
    component: PluginPane = null;
    isOpened() {
        return this.component != null;
    }

    constructor(app: App, plugin: ObsidianLiveSyncPlugin) {
        super(app);
        this.plugin = plugin;
    }

    onOpen() {
        const { contentEl } = this;
        if (this.component == null) {
            this.component = new PluginPane({
                target: contentEl,
                props: { plugin: this.plugin },
            });
        }
    }

    onClose() {
        if (this.component != null) {
            this.component.$destroy();
            this.component = null;
        }
    }
}

export class InputStringDialog extends Modal {
    result: string | false = false;
    onSubmit: (result: string | boolean) => void;
    title: string;
    key: string;
    placeholder: string;
    isManuallyClosed = false;
    isPassword = false;

    constructor(app: App, title: string, key: string, placeholder: string, isPassword: boolean, onSubmit: (result: string | false) => void) {
        super(app);
        this.onSubmit = onSubmit;
        this.title = title;
        this.placeholder = placeholder;
        this.key = key;
        this.isPassword = isPassword;
    }

    onOpen() {
        const { contentEl } = this;

        contentEl.createEl("h1", { text: this.title });
        // For enter to submit
        const formEl = contentEl.createEl("form");
        new Setting(formEl).setName(this.key).setClass(this.isPassword ? "password-input" : "normal-input").addText((text) =>
            text.onChange((value) => {
                this.result = value;
            })
        );
        new Setting(formEl).addButton((btn) =>
            btn
                .setButtonText("Ok")
                .setCta()
                .onClick(() => {
                    this.isManuallyClosed = true;
                    this.close();
                })
        ).addButton((btn) =>
            btn
                .setButtonText("Cancel")
                .setCta()
                .onClick(() => {
                    this.close();
                })
        );
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
        if (this.isManuallyClosed) {
            this.onSubmit(this.result);
        } else {
            this.onSubmit(false);
        }
    }
}
export class PopoverSelectString extends FuzzySuggestModal<string> {
    app: App;
    callback: (e: string) => void = () => { };
    getItemsFun: () => string[] = () => {
        return ["yes", "no"];

    }

    constructor(app: App, note: string, placeholder: string | null, getItemsFun: () => string[], callback: (e: string) => void) {
        super(app);
        this.app = app;
        this.setPlaceholder((placeholder ?? "y/n) ") + note);
        if (getItemsFun) this.getItemsFun = getItemsFun;
        this.callback = callback;
    }

    getItems(): string[] {
        return this.getItemsFun();
    }

    getItemText(item: string): string {
        return item;
    }

    onChooseItem(item: string, evt: MouseEvent | KeyboardEvent): void {
        // debugger;
        this.callback(item);
        this.callback = null;
    }
    onClose(): void {
        setTimeout(() => {
            if (this.callback != null) {
                this.callback("");
            }
        }, 100);
    }
}

export class MessageBox extends Modal {

    plugin: Plugin;
    title: string;
    contentMd: string;
    buttons: string[];
    result: string;
    isManuallyClosed = false;
    defaultAction: string | undefined;
    timeout: number | undefined;
    timer: ReturnType<typeof setInterval> = undefined;
    defaultButtonComponent: ButtonComponent | undefined;

    onSubmit: (result: string | boolean) => void;

    constructor(plugin: Plugin, title: string, contentMd: string, buttons: string[], defaultAction: (typeof buttons)[number], timeout: number, onSubmit: (result: (typeof buttons)[number] | false) => void) {
        super(plugin.app);
        this.plugin = plugin;
        this.title = title;
        this.contentMd = contentMd;
        this.buttons = buttons;
        this.onSubmit = onSubmit;
        this.defaultAction = defaultAction;
        this.timeout = timeout;
        if (this.timeout) {
            this.timer = setInterval(() => {
                this.timeout--;
                if (this.timeout < 0) {
                    if (this.timer) {
                        clearInterval(this.timer);
                        this.timer = undefined;
                    }
                    this.result = defaultAction;
                    this.isManuallyClosed = true;
                    this.close();
                } else {
                    this.defaultButtonComponent.setButtonText(`( ${this.timeout} ) ${defaultAction}`);
                }
            }, 1000);
        }
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.addEventListener("click", () => {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = undefined;
            }
        })
        contentEl.createEl("h1", { text: this.title });
        const div = contentEl.createDiv();
        MarkdownRenderer.renderMarkdown(this.contentMd, div, "/", this.plugin);
        const buttonSetting = new Setting(contentEl);
        for (const button of this.buttons) {
            buttonSetting.addButton((btn) => {
                btn
                    .setButtonText(button)
                    .onClick(() => {
                        this.isManuallyClosed = true;
                        this.result = button;
                        if (this.timer) {
                            clearInterval(this.timer);
                            this.timer = undefined;
                        }
                        this.close();
                    })
                if (button == this.defaultAction) {
                    this.defaultButtonComponent = btn;
                }
                return btn;
            }
            )
        }
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = undefined;
        }
        if (this.isManuallyClosed) {
            this.onSubmit(this.result);
        } else {
            this.onSubmit(false);
        }
    }
}


export function confirmWithMessage(plugin: Plugin, title: string, contentMd: string, buttons: string[], defaultAction?: (typeof buttons)[number], timeout?: number): Promise<(typeof buttons)[number] | false> {
    return new Promise((res) => {
        const dialog = new MessageBox(plugin, title, contentMd, buttons, defaultAction, timeout, (result) => res(result));
        dialog.open();
    });
}
