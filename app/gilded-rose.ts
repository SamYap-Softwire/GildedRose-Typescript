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
            if (currentItem.name === 'Aged Brie' || currentItem.name === 'Backstage passes to a TAFKAL80ETC concert'){
                if (currentItem.quality < 50) {
                    currentItem.quality = currentItem.quality + 1
                    if (currentItem.name == 'Backstage passes to a TAFKAL80ETC concert') {
                        if (currentItem.sellIn < 11) {
                            // implements the backstage pass increase in quality by 2 (in 2 parts)
                            if (currentItem.quality < 50) {
                                currentItem.quality = currentItem.quality + 1
                            }
                        }
                        if (currentItem.sellIn < 6) {
                            // implements the backstage pass increase in quality by 3 (in 3 parts)
                            if (currentItem.quality < 50) {
                                currentItem.quality = currentItem.quality + 1
                            }
                        }
                    }
                }
            } else {
                // everything else which by default decreases in quality
                if (currentItem.quality > 0) {
                    if (currentItem.name != 'Sulfuras, Hand of Ragnaros') {
                        // sulfuras has different behaviours: quality doesn't decrease
                        currentItem.quality = currentItem.quality - 1
                    }
                }
            }

            if (currentItem.name != 'Sulfuras, Hand of Ragnaros') {
                // every item other than sulfuras has a sellin day
                currentItem.sellIn = currentItem.sellIn - 1;
                // decrements sellin day globally (i.e. for all items) to show time passing
            }
            if (currentItem.sellIn < 0) {
                // behaviour past 'expiry'
                if (currentItem.name != 'Aged Brie') {
                    if (currentItem.name != 'Backstage passes to a TAFKAL80ETC concert') {
                        if (currentItem.quality > 0) {
                            // if quality is still > 0 after expired, quality degrades twice as fast
                            if (currentItem.name != 'Sulfuras, Hand of Ragnaros') {
                                // since sulfuras is included here, it shows sulfuras sellin is set to -1 for non-existent
                                currentItem.quality = currentItem.quality - 1
                            }
                        }
                    } else {
                        // if backstage passes, quality = 0
                        currentItem.quality = currentItem.quality - currentItem.quality
                    }
                } else {
                    // if aged brie, quality keeps increasing: even after expiry. This means max is 50.
                    if (currentItem.quality < 50) {
                        currentItem.quality = currentItem.quality + 1
                    }
                }
            }
        }
        return this.items;
    }
}
