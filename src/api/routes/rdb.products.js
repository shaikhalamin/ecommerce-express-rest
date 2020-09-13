const express = require("express");
const router = express.Router();

const axios = require('axios');
const cheerio = require('cheerio');

const db = require("../../models/index");
const Product = db.tutorials;
const Op = db.Sequelize.Op;


/*web scraping using cheerio*/

const data = require("./bulkdata/data.json");

const parseDataFunc = require("./bulkdata/dataparser")

router.get("/scrape-data", async (req, res, next) => {

    var baseList = [
        /*"/popular",
       "/babycare",
       "/pet-care",
       "/grocery",
       "/cleaning",
       "/office",
       "/health-and-beauty", 
       "/electric", 
       "/vehicle-essentials"*/
    ];

    for (var i = 0; i < baseList.length; i++) {
        //console.log('https://chaldal.com' + baseList[i]);

        try {
            const response = await axios.get('https://chaldal.com' + baseList[i]);

            const root = baseList[i];

            const $ = cheerio.load(response.data);

            var categoryNode = $('.category-links-wrapper').find('a');

            if (categoryNode.length > 0) {

                categoryNode.each(async function (j, alink) {
                    //console.log(baseList[i] + "-->" + $(alink).attr('href'));

                    const secondBase = $(alink).attr('href');

                    try {

                        const secondResponse = await axios.get('https://chaldal.com' + secondBase);

                        const $ = cheerio.load(secondResponse.data);

                        const secondCategoryNode = $('.category-links-wrapper').find('a');

                        if (secondCategoryNode.length > 0) {
                            secondCategoryNode.each(async function (k, alink) {

                                //console.log(secondBase + " --->" + $(alink).attr('href'));
                                const thirdBase = $(alink).attr('href');

                                try {

                                    const thirdResponse = await axios.get('https://chaldal.com' + thirdBase);
                                    const $ = cheerio.load(thirdResponse.data);
                                    const thirdCategoryNode = $('.category-links-wrapper').find('a');

                                    if (thirdCategoryNode.length > 0) {
                                    } else {

                                        const tdThirdNode = $('.productPane .product').find('.imageWrapper');

                                        /* if (Object.keys(tdThirdNode).length > 0) {
                                            tdThirdNode.each(async function (key, item) {
                                                const singleObject = {};
                                                $(item).find('.name').each(function (i, pdName) {
                                                    singleObject['name'] = $(pdName).text();
                                                    singleObject['root_category'] = root;
                                                    singleObject['parent_category'] = secondBase;
                                                    singleObject['child_category'] = thirdBase;
                                                });

                                                $(item).find('.subText').each(function (i, pdWeight) {
                                                    singleObject['weight'] = $(pdWeight).text();
                                                });

                                                $(item).find('.price').each(function (i, pdPrice) {
                                                    singleObject['price'] = $(pdPrice).text();
                                                });
                                                $(item).find('.imageWrapperWrapper').each(function (i, pdImage) {
                                                    $(pdImage).find('img').each(function (i, image) {
                                                        singleObject['image'] = $(image).attr('src');
                                                    });
                                                });

                                                $(item).find('.overlay').each(function (i, overlay) {
                                                    $(overlay).find('span').each(function (i, spanItem) {
                                                        $(spanItem).find('a').each(function (i, alink) {
                                                            singleObject['href'] = $(alink).attr('href');
                                                        });
                                                    });
                                                });

                                                if (Object.keys(singleObject).length > 0) {
                                                    console.log(singleObject)
                                                    try {
                                                        const product = await Product.create(singleObject);
                                                    } catch (err) {
                                                        console.log(err);
                                                    }
                                                }

                                            });
                                        } */

                                    }

                                } catch (err) {
                                    console.log(err);
                                }

                            })

                        } else {
                            //parse data 
                            const tdNode = $('.productPane .product').find('.imageWrapper');

                            const root_category = root;
                            const parent_category = secondBase;
                            const child_category = secondBase;

                            /*  if (Object.keys(tdNode).length > 0) {
                                 tdNode.each(async function (key, item) {
                                     const singleObject = {};
                                     $(item).find('.name').each(function (i, pdName) {
                                         singleObject['name'] = $(pdName).text();
                                         singleObject['root_category'] = root_category;
                                         singleObject['parent_category'] = parent_category;
                                         singleObject['child_category'] = child_category;
                                     });
 
                                     $(item).find('.subText').each(function (i, pdWeight) {
                                         singleObject['weight'] = $(pdWeight).text();
                                     });
 
                                     $(item).find('.price').each(function (i, pdPrice) {
                                         singleObject['price'] = $(pdPrice).text();
                                     });
                                     $(item).find('.imageWrapperWrapper').each(function (i, pdImage) {
                                         $(pdImage).find('img').each(function (i, image) {
                                             singleObject['image'] = $(image).attr('src');
                                         });
                                     });
 
                                     $(item).find('.overlay').each(function (i, overlay) {
                                         $(overlay).find('span').each(function (i, spanItem) {
                                             $(spanItem).find('a').each(function (i, alink) {
                                                 singleObject['href'] = $(alink).attr('href');
                                             });
                                         });
                                     });
 
                                     if (Object.keys(singleObject).length > 0) {
                                         console.log(singleObject);
                                         try {
                                             const product = await Product.create(singleObject);
                                         } catch (err) {
                                             console.log(err);
                                         }
                                     }
 
                                 });
                             } */
                        }

                    } catch (err) {
                        console.log(err);
                    }

                })
            } else {

                const tdTopNode = $('.productPane .product').find('.imageWrapper');

                const root_category = root;
                const parent_category = root;
                const child_category = root;

                /*  if (Object.keys(tdTopNode).length > 0) {
                     tdTopNode.each(async function (key, item) {
                         const singleObject = {};
                         $(item).find('.name').each(function (i, pdName) {
                             singleObject['name'] = $(pdName).text();
                             singleObject['root_category'] = root_category;
                             singleObject['parent_category'] = parent_category;
                             singleObject['child_category'] = child_category;
                         });
 
                         $(item).find('.subText').each(function (i, pdWeight) {
                             singleObject['weight'] = $(pdWeight).text();
                         });
 
                         $(item).find('.price').each(function (i, pdPrice) {
                             singleObject['price'] = $(pdPrice).text();
                         });
                         $(item).find('.imageWrapperWrapper').each(function (i, pdImage) {
                             $(pdImage).find('img').each(function (i, image) {
                                 singleObject['image'] = $(image).attr('src');
                             });
                         });
 
                         $(item).find('.overlay').each(function (i, overlay) {
                             $(overlay).find('span').each(function (i, spanItem) {
                                 $(spanItem).find('a').each(function (i, alink) {
                                     singleObject['href'] = $(alink).attr('href');
                                 });
                             });
                         });
 
                         if (Object.keys(singleObject).length > 0) {
                             console.log(singleObject);
                             try {
                                 const product = await Product.create(singleObject);
                             } catch (err) {
                                 console.log(err);
                             }
                         }
 
                     });
                 } */

            }

        } catch (err) {
            console.log(err);
        }
    }

    res.status(200).json({
        sucess: true,
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


router.get("/menus", async (req, res, next) => {
    try {

        const menuList = await Product.findAll({ order: [['root_category', 'ASC']], attributes: ['root_category', 'parent_category', 'child_category'], group: ['root_category', 'parent_category', 'child_category'] });

        const baseRoot = menuList.map((item, i) => {
            let newObj = {}
            newObj.root_category = item.root_category;
            newObj.parent_category = item.parent_category;
            newObj.child_category = item.child_category;
            return newObj;
        });

        const uniqueRoot = [...new Set(baseRoot.map(item => item.root_category))];

        //console.log(uniqueRoot);

        let wrapData = uniqueRoot.map((item, idex) => {

            const categoryMain = [...new Set(baseRoot.filter((bitem, index, dataArray) => {

                return bitem.root_category === item && typeof dataArray[index + 1] !== 'undefined' && dataArray[index + 1].parent_category !== bitem.parent_category && dataArray[index + 1].child_category !== bitem.child_category;

            }))];



            let category = categoryMain.map((ssitem, index) => {

                let categoryObj = {}

                categoryObj.parent_category = ssitem.parent_category;

                let subcategory = [...new Set(baseRoot.filter(spitem => spitem.parent_category === ssitem.parent_category && spitem.child_category != spitem.parent_category))];
                //console.log(subcategory);
                let subCategory = subcategory.map((scobj, index) => {
                    return scobj.child_category;
                })

                let newSub = { ...categoryObj, subCategory }

                return newSub
            })

            let finalData = { item, category }
            return finalData;
        });

        res.status(200).json({
            sucess: true,
            data: wrapData,
        });

    } catch (err) {
        console.log(err);
    }
});


router.get("/:child_category", async (req, res, next) => {
    try {

        const child_category = req.params.child_category;

        const mysqlProduct = await Product.findAll({ where: { child_category: child_category } });

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