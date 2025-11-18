import {SortingOption} from '../const.ts';
import {Offer} from '../types/offer.ts';

function getSortedOffers(offers: Offer[], sorting: SortingOption) {
  switch (sorting) {
    case (SortingOption.Popular): {
      return offers;
    }
    case (SortingOption.PriceLowToHigh): {
      return [...offers].sort((a, b) => a.price - b.price);
    }
    case (SortingOption.PriceHighToLow): {
      return [...offers].sort((a, b) => b.price - a.price);
    }
    case (SortingOption.TopRatedFirst): {
      return [...offers].sort((a, b) => b.rating - a.rating);
    }
    default: {
      return offers;
    }
  }
};

export default getSortedOffers;
