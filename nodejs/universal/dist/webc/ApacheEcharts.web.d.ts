export default class ApacheEChartsComponent extends HTMLElement {
    static configHrefAttrName: string;
    static get observedAttributes(): string[];
    configHref: string | null;
    navigate(data: any, _options: any): void;
    connectedCallbackRender(): void;
    connectedCallback(): void;
}
