const express = require("express");
const router = express.Router();

const axios = require('axios');
const cheerio = require('cheerio');

const db = require("../../models/index");
const Product = db.tutorials;
const Op = db.Sequelize.Op;


/*web scraping using cheerio*/

const data = require("./bulkdata/data.json");

router.get("/scrape-data", (req, res, next) => {

    var singleObject = {};


    axios.get('https://chaldal.com/grocery')
        .then(function (response) {
            // handle success
            //console.log(response.data);

            const $ = cheerio.load(response.data);
            //var categoryName = $('.categoryName').text();


            const menuLevelZeroNode = $('.level-0');
            menuLevelZeroNode.each(function (i, item) {
                $(item).find('.name').each(function (i, anchorItem) {
                    //console.log(anchorItem);
                    $(anchorItem).find('a').each(function (i, alink) {
                        console.log($(alink).attr('href'));
                    });
                });
            });


        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });


    res.status(200).json({
        sucess: true,
        lastinsert: ''
    });
});





//bulk import products

router.get("/bulk", async (req, res, next) => {
    for (let i = 0; i < data.length; i++) {
        let product = {
            name: data[i].name,
            root_category: data[i].root_category,
            parent_category: data[i].parent_category,
            child_category: data[i].child_category,
            weight: data[i].weight,
            price: data[i].price,
            image: data[i].image,
            href: data[i].href
        }

        try {
            const createProduct = await Product.create(product);
        } catch (err) {
            console.log(err);
        }
    }

    res.status(201).json({
        sucess: true,
        lastinsert: "fresh-vegetable"
    });
});





router.get("/", async (req, res, next) => {
    try {
        const mysqlProduct = await Product.findAll();

        console.log('mysql query executing ...', mysqlProduct);

        res.status(200).json({
            data: mysqlProduct
        });
    } catch (err) {
        console.log(err);
    }
});

router.get("/:parent_category/:child_category", async (req, res, next) => {
    try {

        const parent_category = req.params.parent_category;
        const child_category = req.params.child_category;

        const mysqlProduct = await Product.findAll({ where: { parent_category: parent_category, child_category: child_category } });

        console.log('mysql query executing ...', mysqlProduct.length);

        res.status(200).json({
            data: mysqlProduct
        });
    } catch (err) {
        console.log(err);
    }
});



router.post("/", async (req, res, next) => {
    try {

        let product = {
            name: req.body.name,
            parent_category: req.body.parent_category,
            child_category: req.body.child_category,
            weight: req.body.weight,
            price: req.body.price,
            image_url: req.body.image_url,
            href: req.body.href
        }

        const createProduct = await Product.create(product);

        console.log('mysql creating product ...', createProduct);

        res.status(201).json({
            sucess: true
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;