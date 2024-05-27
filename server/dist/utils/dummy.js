"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertProducts = exports.products = void 0;
const faker_1 = require("@faker-js/faker");
const mongoose_1 = __importDefault(require("mongoose"));
const Product_model_1 = __importDefault(require("../models/Product.model"));
function generateProducts() {
    let productsData = [];
    for (let i = 0; i < 100; i++) {
        let product = {
            // _id: {
            //   $oid: faker.database.mongodbObjectId(),
            // },
            name: faker_1.faker.commerce.productName(),
            description: new mongoose_1.default.Types.ObjectId("663f4832c0ee32fe0a18f0d0"),
            price: faker_1.faker.number.int({ min: 100, max: 10000 }),
            category: faker_1.faker.database.mongodbObjectId(),
            images: [
                {
                    url: "https://source.unsplash.com/random?fruits",
                    public_id: "https://source.unsplash.com/random?fruits",
                },
                {
                    url: "https://source.unsplash.com/random?fruits",
                    public_id: "https://source.unsplash.com/random?fruits",
                },
                {
                    url: "https://source.unsplash.com/random?fruits",
                    public_id: "https://source.unsplash.com/random?fruits",
                },
                {
                    url: "https://source.unsplash.com/random?fruits",
                    public_id: "https://source.unsplash.com/random?fruits",
                },
            ],
            colors: [
                {
                    name: "Red",
                    code: "#FF0000",
                },
                {
                    name: "Blue",
                    code: "skyblue",
                },
                {
                    name: "Pink",
                    code: "Pink",
                },
            ],
            sizes: ["M", "L", "XL"],
            stock: faker_1.faker.number.int({ min: 1, max: 1000 }),
            sold: faker_1.faker.number.int({ min: 11, max: 1000 }),
            rating: faker_1.faker.number.int({ min: 0, max: 5 }),
            reviews: [],
        };
        productsData.push(product);
    }
    return productsData;
}
exports.products = generateProducts();
function insertProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Product_model_1.default.insertMany(exports.products);
    });
}
exports.insertProducts = insertProducts;
