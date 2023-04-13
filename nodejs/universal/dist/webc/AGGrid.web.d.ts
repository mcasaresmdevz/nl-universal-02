export default class AgGridComponent extends HTMLElement {
    static configHrefAttrName: string;
    static domLayoutAttrName: string;
    static displayAfterGridReady: string;
    static get observedAttributes(): string[];
    connectedCallbackRender(): void;
    connectedCallback(): void;
}
