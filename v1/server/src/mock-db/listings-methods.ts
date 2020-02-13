import { listings } from "./listings";
import { userFavorites } from "./favorites";
import { Listing } from "../models/listing";

export const doesListingExist = function(id: string): boolean {
  return listings.some(el => el.id === id) === true;
};

export const deleteListing = function(id: string): Listing | undefined {
  for (let i = 0; i < listings.length; i++) {
    if (listings[i].id === id) {
      return listings.splice(i, 1)[0];
    }
  }
};

export const favoriteListing = function(id: string): Record<string, boolean> {
  const obj = {
    success: false,
    added: false
  };
  if (id !== undefined && doesListingExist(id)) {
    let index;
    obj.success = true;
    const result = userFavorites.find((el, idx) => {
      if (el === id) {
        index = idx;
        return true;
      }
    });
    if (result === undefined) {
      userFavorites.push(id);
      obj.added = true;
    } else {
      if (index !== undefined) {
        userFavorites.splice(index, 1);
      }
    }
  }

  console.log(userFavorites);
  return obj;
};

export const getFavorites = function(): Listing[] {
  const result: Listing[] = [];
  const listingsCopy = JSON.parse(JSON.stringify(listings));
  userFavorites.forEach(id => {
    const listingEl = listingsCopy.find((el: Listing) => el.id === id);
    if (listingEl) {
      delete listingEl.bookings;
      result.push(listingEl);
    }
  });
  return result;
};

export const getListings = function(): Listing[] {
  const listingsCopy = JSON.parse(JSON.stringify(listings));
  const listingsWithoutBookings = listingsCopy.map((el: Listing) => {
    delete el.bookings;
    return el;
  });
  return listingsWithoutBookings;
};
