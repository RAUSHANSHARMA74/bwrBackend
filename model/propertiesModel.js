const mongoose = require("mongoose");

const PropertiesSchema = mongoose.Schema({
  propertyId: { type: String, required: true},

  title: { type: String, required: false },

  category: { type: String, required: true },

  purpose: { type: String, required: true },

  premium: { type: String, default: false },

  property_type: { type: String, required: true },

  city: { type: String, required: true },

  state: { type: String, required: true },

  zip_code: { type: String, required: false },

  location: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  images: {
    type: Array, // Array of image URLs
    required: false,
  },
  exact_price: {
    type: Number,
    required: true,
  },
  price_range: {
    type: Array,
    required: false,
  },
  area: {
    type: Number,
    required: true,
  },
  area_range: {
    type: Array,
    required: false,
  },
  price_unit: {
    type: String,
    required: true,
  },
  area_unit: {
    type: String,
    required: true,
  },
  carpet_area: {
    type: String,
    required: false,
  },
  size: {
    type: Number,
    required: false,
  },
  rating: {
    type: String,
    required: false,
  },
  googlepin: {
    type: Array,
    required: false,
  },
  furnishing: {
    type: String,
    required: false,
  },
  possession_status: {
    type: String,
    required: false,
  },
  no_of_bedroom: {
    type: Number,
    required: false,
  },
  no_of_living_room: {
    type: Number,
    required: false,
  },
  no_of_balcony: {
    type: Number,
    required: false,
  },
  no_of_bathroom: {
    type: Number,
    required: false,
  },
  no_of_kitchen: {
    type: Number,
    required: false,
  },
  entrance_facing: {
    type: String,
    required: false,
  },
  booking_amount: {
    type: String,
    required: false,
  },
  floor_no: {
    type: String,
    required: false,
  },
  amenities: {
    type: Array, // Array of amenity names
    required: false,
  },
  yearBuilt: {
    type: String,
    required: false,
  },
  ownership: {
    type: String,
    required: false,
  },
  ownerName: {
    type: String,
    required: false,
  },
  ownerContact: {
    type: String,
    required: false,
  },
  availability: {
    type: String,
    required: false,
  },
  propertyFeatures: {
    type: Array, // Array of property feature names
    required: false,
  },
  nearbyFacilities: {
    type: Array, // Array of nearby facility names
    required: false,
  },
  taxInformation: {
    type: String,
    required: false,
  },
  legalInformation: {
    type: String,
    required: false,
  },
  historicalData: {
    type: Array, // Array of historical data
    required: false,
  },
  agentName: {
    type: String,
    required: false,
  },
  agentContact: {
    type: String,
    required: false,
  },
  virtualTourLink: {
    type: String,
    required: false,
  },
  brochure: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const PropertiesModel = mongoose.model("Properties", PropertiesSchema);

module.exports = { PropertiesModel };
