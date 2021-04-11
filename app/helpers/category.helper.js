'use strict'

const _ = require('lodash')
const SERVER_RESPONSE = require('../config/serverResponses')
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const helpingHelperMethods = require('./helping.helper')


///// creating new category
function createCategory(input) {
    let categoryObj = input;

    return db.Category.findOne({
        where: {
            title: categoryObj.title
        } 
    })
    .then(async (category) => {
        const errorsArray = []
        // check user existence
        if (category) {
          // user phone already exist.
          errorsArray.push({
              field: 'title',
              error: 1500,
              message: 'category already exist with this name'
          })
        }

        if (!_.isEmpty(errorsArray)) {
            return generalHelpingMethods.rejectPromise(errorsArray, SERVER_RESPONSE.CONFLICT)
        }
        
        //// saving category
        return db.Category.create(categoryObj)
        .then(async (insertedCategory) => {

        // adding week days
        let weekDays = input.weekDaysId;
        const categoryDays = []
        for (let i = 0; i < weekDays.length; i++) {
            categoryDays.push({
                CategoryId: insertedCategory.id,
                WeekDaysId: weekDays[i]
            })
        }
        db.CategoryDay.bulkCreate(categoryDays)
        return insertedCategory.save()
        })
        .catch(generalHelpingMethods.catchException)
    })
}

////get all categories
function getAllCategories(input) {
    return db.Category.findAll({
        where: input,
        order: [
          ['createdAt', 'DESC'],
        ],
        // include:
        //     [
        //         {
        //             model: db.Product,
        //             as: `relatedProducts`,
        //             attributes: [`id`, `name`],
        //             through: {attributes: []},
        //             required: false,
        //         }
        //     ]
    })
}

function AllCategoriesByDay(data) {
    let query = data;
    return db.WeekDays.findAll({
        // where: {id: dayId},
        attributes: [`id`, `day`],
        include:
            [
                {
                    model: db.Category,
                    where: query,
                    as: `categoryDays`,
                    attributes: [`id`, `title`],
                    through: {attributes: []},
                    required: false,
                }
            ]
    })
    .then(async days => {

        // console.log(JSON.parse(JSON.stringify(days)));
        let result = JSON.parse(JSON.stringify(days));

        //// iterating through all days
        for(let day of result) {
            await fetchProducts(day)
                .then(response => {
                    // temp.push(response);
                    day.categoryDays = response;
                    // console.log(response);
                })
        }

        return result;
    })
}

function getCategoriesByDeliveryAreaRegular(data) {
    let postCode = data.postCode;
    let partnerId = data.partnerId;
    let categoryQuery = {};

    if (partnerId) {
        categoryQuery.PartnerId = partnerId;
    }

    let dayQuery = {};

    if (data.dayId) {
        dayQuery.id = data.dayId;
    }

    return db.DeliveryArea.findOne({
        where: {postCode: postCode},
        attributes: [`id`, `postCode`],
        include:
            [
                {
                    model: db.WeekDays,
                    as: `regularDeliveryDay`,
                    where: dayQuery,
                    attributes: [`id`, `day`],
                    through: {attributes: []},
                    required: false,
                }
            ]
    })
    .then(async days => {
        if (!days) {
            return false
        }
        let result = days.toJSON();
        let daysId = result.regularDeliveryDay.map(x => x.id);
        return daysId;
    })
    .then(async daysId => {
        return db.WeekDays.findAll({
        where: {id: daysId},
        attributes: [`id`, `day`],
        include:
            [
                {
                    model: db.Category,
                    where: categoryQuery,
                    as: `categoryDays`,
                    attributes: [`id`, `title`],
                    through: {attributes: []},
                    required: false,
                }
            ]
        })
        .then(async days => {
            let result = JSON.parse(JSON.stringify(days));

            //// iterating through all days
            for(let day of result) {
                await fetchProducts(day)
                    .then(response => {
                        day.categoryDays = response;
                    })
            }
            return result;
        })
    })
    .then(result => {
        let categoryDays = [];
        let allDays = result.map(x => x.day);   

        //// iterating through result arr to finalize categories
        for (let day of result) {
            for (let category of day.categoryDays) {
                // console.log(`category === `, category);
                let currentDay = category.day;
                let currentDayId = category.dayId;
                let found = categoryDays.findIndex(x => x.title === category.title);
                if (found === -1) {
                    //// adding available days
                    for (let product of category.Products) {
                        product.availableDays = [];
                        let obj = {
                            day: currentDay,
                            id: currentDayId
                        }
                        product.availableDays.push(obj);
                    }
                    categoryDays.push(category);
                } else {
                    //// if category already exist
                    for (let product of category.Products) {
                        // product.availableDays = [];
                        let foundProduct = categoryDays[found].Products.findIndex(x => x.name === product.name);
                        if (foundProduct === -1) {
                            product.availableDays = [];
                            let obj = {
                                day: currentDay,
                                id: currentDayId
                            }
                            
                            product.availableDays.push(obj);
                            categoryDays[found].Products.push(product);
                        } else {
                            //// if product already exist
                            let obj = {
                                day: currentDay,
                                id: currentDayId
                            }
                            categoryDays[found].Products[foundProduct].availableDays.push(obj);
                        }
                    }
                }
            }
        }

        let data = {};
        data.categoryDays = categoryDays;
        data.allDays = allDays;
        return data;
    })
}

////// to edit the category
function editCategory(data, id) {
    return db.Category.findOne({ where: {id: id}})
    .then( async (category) => {
        if (_.isEmpty(category)) {
            // category not found, return error
            return generalHelpingMethods.rejectPromise([{
                field: 'id',
                error: 1572,
                message: 'Category not found.'
            }])
        }

        return db.Category.update(
            data,
            { where: { id: id } }
        )
    })
}

//// to delete category
const deleteCategory = (input) => {
    return db.Category.findOne({
      where: {
        id: input.id,
        isDeleted: false
      }
    })
      .then((category) => {
        if (_.isEmpty(category)) {
          // Employee not found, return error
          return generalHelpingMethods.rejectPromise([{
            field: 'id',
            error: 1575,
            message: 'No Category found against given id.'
          }])
        }
        // employee found, change value of isDeleted to true
        category.isDeleted = true
        // save employee
        category.save()
        return true
    })
}


////// function to get products
function fetchProducts(data) {
    return new Promise((resolve, reject) => {
        let categories = data.categoryDays;
        let dayId = data.id;
        let categoryIds = categories.map(x => x.id);

        db.WeekDays.findOne({
            where: {id: dayId},
            attributes: [`id`, `day`],
            include: [
                {
                    model: db.Product,
                    where: { CategoryId: categoryIds, isTrailAvailable: true },
                    as: `productWeekDays`,
                    attributes: [`id`, `name`, `designation`, `shortDescription`, `productPrice`, `purchasingPrice`, `description`, `image`, `CategoryId`],
                    through: {attributes: []},
                    required: false,
                }
            ]
        })
        .then(products => {
            products = products.toJSON();
            // console.log(`products === `, products)
            let day = products.day;
            let dayId = products.id;
            let allCategories = data.categoryDays;
            let allProducts = products.productWeekDays;
            let finalCategory = [];

            for (let i = 0; i < allCategories.length; i ++) {
                allCategories[i].day = day;
                allCategories[i].dayId = dayId;
                finalCategory.push(allCategories[i]);

                finalCategory[i].Products = [];
                for (let product of allProducts) {
                    if (allCategories[i].id === product.CategoryId) {
                        finalCategory[i].Products.push(product);
                    }
                }
            }

            resolve(finalCategory);
        })
    })
}


module.exports = {
    createCategory,
    getAllCategories,
    editCategory,
    AllCategoriesByDay,
    getCategoriesByDeliveryAreaRegular,
    deleteCategory
}