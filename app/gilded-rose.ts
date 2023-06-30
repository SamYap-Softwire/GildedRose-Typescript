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
                let qualityChange = -1;

                if (currentItem.name === 'Aged Brie'){
                    qualityChange = 1;
                } else if (currentItem.name === 'Backstage passes to a TAFKAL80ETC concert') {
                    if (currentItem.sellIn <= 0) {
                        qualityChange = -currentItem.quality;
                    } else if (currentItem.sellIn <= 5) {
                        qualityChange = 3;
                    } else if (currentItem.sellIn <= 10) {
                        qualityChange = 2;
                    } else {
                        qualityChange = 1;
                    }
                } else {
                    if (currentItem.sellIn > 0) {
                        qualityChange = - 1;
                    } else {
                        qualityChange = - 2;
                    }

                    if (currentItem.name === 'Conjured'){
                        qualityChange *= 2;
                    }
                }

                const newQuality = currentItem.quality + qualityChange;
                if (newQuality >= 0 && newQuality <= 50) {
                    currentItem.quality = newQuality;
                }

                currentItem.sellIn -= 1;
            }
        }
        return this.items;
    }
}
