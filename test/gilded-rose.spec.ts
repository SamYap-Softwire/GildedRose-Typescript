import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('normal item should approach sell In date everytime updateQuality is called', function() {
        const gildedRose = new GildedRose([new Item('foo', 10, 10)]);
        const originalSellIn = gildedRose.items[0].sellIn;
        const items = gildedRose.updateQuality();

        expect(items[0].sellIn).to.be.lessThan(originalSellIn);
    })

    it('normal quality should decrease as sell In date approaches', function(){
        const gildedRose = new GildedRose([new Item('foo', 10, 10)]);
        const originalQuality = gildedRose.items[0].quality;
        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.be.lessThan(originalQuality);
    });

    it('quality should not be negative when updated', function(){
        const gildedRose = new GildedRose([new Item('foo', 3, 0)]);

        while (gildedRose.items[0].sellIn > 0) {
            const items = gildedRose.updateQuality();
            expect(items[0].quality).to.be.greaterThan(-1);
        }
    });

    it('normal quality should decrease twice as fast after sell In date has passed', function(){
        const gildedRose = new GildedRose([new Item('foo', 1, 10)]);
        const quality1DayBeforeSellIn = gildedRose.items[0].quality;
        const qualityOnDayofSellIn = gildedRose.updateQuality()[0].quality;
        const quality1DayAfterSellIn = gildedRose.updateQuality()[0].quality;

        expect(quality1DayAfterSellIn - qualityOnDayofSellIn).equals(2*(qualityOnDayofSellIn - quality1DayBeforeSellIn));
    });

    it('quality of aged brie increases as sell In date approaches', function(){
        const gildedRose = new GildedRose([new Item('Aged Brie', 10, 20)]);
        const qualityOnPrevDay = gildedRose.items[0].quality;
        const currentQuality = gildedRose.updateQuality()[0].quality;
        expect(currentQuality).to.satisfy((q) => q >= qualityOnPrevDay);
    });

    it('quality of Aged Brie increases as it gets older, even after sell In date has passed', function(){
        const gildedRose = new GildedRose([new Item('Aged Brie', 0, 20)]);
        const qualityOnPrevDay = gildedRose.items[0].quality;
        const currentQuality = gildedRose.updateQuality()[0].quality;
        expect(currentQuality).to.satisfy((q) => q >= qualityOnPrevDay);
    });

    it('quality should not be greater than 50 when updated for Aged Brie', function(){
        const gildedRose = new GildedRose([new Item('Aged Brie', 3, 50)]);
        const currentQuality = gildedRose.updateQuality()[0].quality;
        expect(currentQuality).equals(50);
    });

    it('sulfuras should have sellIn value of -1 that does not change', function(){
        const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', -1, 30)]);
        const sellIn = gildedRose.items[0].sellIn;
        const updatedSellIn = gildedRose.updateQuality()[0].sellIn;
        expect(sellIn).equals(updatedSellIn);
    });

    it('quality of sulfuras does not decrease', function(){
        const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', -1, 30)]);
        let qualityOnPrevDay = gildedRose.items[0].quality;

        for (let day = 0; day < 10; day++) {
            const currentQuality = gildedRose.updateQuality()[0].quality;
            expect(currentQuality).equals(qualityOnPrevDay);
            qualityOnPrevDay = currentQuality;
        }
    });

    it('quality of backstage pass increases by 1 when sell In date approaches with more than 10 days', function(){
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 20, 20)]);
        let qualityOnPrevDay = gildedRose.items[0].quality;
        const currentQuality = gildedRose.updateQuality()[0].quality;
        expect(currentQuality).equals(qualityOnPrevDay+1);
    });

    it('quality of backstage pass increases by 2 when sell In date approaches with 10 days', function(){
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);
        let qualityOnPrevDay = gildedRose.items[0].quality;
        const currentQuality = gildedRose.updateQuality()[0].quality;
        expect(currentQuality).equals(qualityOnPrevDay+2);
    });

    it('quality of backstage pass increases by 2 when sell In date approaches with less than 10 days', function(){
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 8, 20)]);
        let qualityOnPrevDay = gildedRose.items[0].quality;
        const currentQuality = gildedRose.updateQuality()[0].quality;
        expect(currentQuality).equals(qualityOnPrevDay+2);
    });

    it('quality of backstage pass increases by 2 when sell In date approaches with 5 days', function(){
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)]);
        let qualityOnPrevDay = gildedRose.items[0].quality;
        const currentQuality = gildedRose.updateQuality()[0].quality;
        expect(currentQuality).equals(qualityOnPrevDay+3);
    });

    it('quality of backstage pass increases by 2 when sell In date approaches with less than 5 days', function(){
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 3, 20)]);
        let qualityOnPrevDay = gildedRose.items[0].quality;
        const currentQuality = gildedRose.updateQuality()[0].quality;
        expect(currentQuality).equals(qualityOnPrevDay+3);
    });

    it('quality of backstage pass should be 0 when sell In date has passed', function(){
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)]);
        const currentQuality = gildedRose.updateQuality()[0].quality;
        expect(currentQuality).equals(0);
    });

    it('quality should not be greater than 50 when updated for backstage passes', function(){
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 20, 50)]);
        const currentQuality = gildedRose.updateQuality()[0].quality;
        expect(currentQuality).equals(50);
    });
})



/*
TESTS BASED ON SPECIFICATION

    list of 1 item
    check quality decreases as sellin date approaches

    list of 1 item
    sell by date has passed
    check quality degrades twice as fast

    list of 1 item
    set quality to be negative
    check *something should happen -> not valid*

    list of 1 ' Aged Brie'
    check quality increases the older it gets

    list of 1 item
    set quality to be more than 50
    check *something should happen -> not valid*

    list of 1 item 'Sulfuras'
    check sellin value is "whenever" or "infinity" or equivalent

    list of 1 item 'Sulfuras'
    check quality does not decrease

    list of 1 item 'Backstage passes'
    check quality increases by 2 as sellin value <= 10 days

    list of 1 item 'backstage passes'
    check quality increases by 3 when sellin value <= 5 days

    list of 1 item 'backstage passes'
    check quality = 0 after concert
 */