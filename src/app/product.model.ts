export interface Product {
    id: string;
    ImageURL: string;
    merek: string;
    model: string;
    price: number;
    stock: number;
    type: string;
    baseClock: number; //CPU
    boostClock: number; //CPU
    core: number; //CPU
    thread: number; //CPU
    speed: number; //RAM
    size: number; //RAM
    chipset: string; //Motherboard
    support: string; //Motherboard
}