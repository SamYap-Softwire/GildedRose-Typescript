export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (const currentItem of this.items){

            if (currentItem.name !== 'Sulfuras, Hand of Ragnaros'){
                let newQuality = currentItem.quality - 1;

                if (currentItem.name === 'Aged Brie'){
                    newQuality = currentItem.quality + 1;
                } else if (currentItem.name === 'Backstage passes to a TAFKAL80ETC concert') {
                    if (currentItem.sellIn <= 0) {
                        newQuality = 0;
                    } else if (currentItem.sellIn <= 5) {
                        newQuality = currentItem.quality + 3;
                    } else if (currentItem.sellIn <= 10) {
                        newQuality = currentItem.quality + 2;
                    } else {
                        newQuality = currentItem.quality + 1;
                    }
                } else {
                    if (currentItem.sellIn > 0) {
                        newQuality = currentItem.quality - 1;
                    } else {
                        newQuality = currentItem.quality - 2;
                    }
                }

                if (newQuality >= 0 && newQuality <= 50) {
                    currentItem.quality = newQuality;
                }

                currentItem.sellIn -= 1;
            }
        }
        return this.items;
    }
}
