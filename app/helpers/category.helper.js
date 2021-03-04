'use strict'

const _ = require('lodash')
const SERVER_RESPONSE = require('../config/serverResponses')
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const helpingHelperMethods = require('./helping.helper')


///// creating new category
function createCategory(input) {
    let categoryObj = {
        title: input.name,
        PartnerId: input.partnerId
    }

    return db.Category.findOne({
        where: {
            title: categoryObj.title,
            PartnerId: categoryObj.PartnerId
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


////// to get all categories of partner
async function getCategoriesOfPartner (input) {
    let query = {PartnerId: input.partnerId, isDeleted: false}

    return db.Category.findAll({
        where: query,
        include: [{
            model: db.Product,
            as : 'relatedProducts',
            required: true
        }]
    })
        .then(async result => {
            // console.log(result.toJSON())
            let categories = JSON.stringify(result, null, 2)
            categories = JSON.parse(categories);

            ///// temp days
            let daysWithCategories = []
            let weeklyDays = [`MON`, `TUE`, `WED`, `THU`, `FRI`, `SAT`, `SUN`]
            for (let i=0; i< 7; i++) {
                let obj = {
                    id: i+1,
                    day: weeklyDays[i],
                    categories: categories
                }

                daysWithCategories.push(obj);
            }

            return daysWithCategories;
        })
        .catch(generalHelpingMethods.catchException)
}

function AllCategoriesByDay(data) {
    let dayId = data.dayId;
    let partnerId = data.partnerId;
    return db.WeekDays.findOne({
        where: {id: dayId},
        include: 
            [
                {
                    model: db.Category,
                    where: { PartnerId: partnerId },
                    as: `categoryDays`,
                    required: false,
                    // include: [
                    //     {
                    //         model: db.Product,
                    //         as : 'relatedProducts',
                    //         required: false,
                    //         // include: [
                    //         //     {
                    //         //         model: db.WeekDays,
                    //         //         as: `productWeekDays`,
                    //         //         required: true,
                    //         //     }
                    //         // ]
                    //     }
                    // ],
                }
            ]
    })
    .then(days => {
        // console.log(days.toJSON());
        // return days.toJSON();
        let result = days.toJSON();

        db.WeekDays.findOne({
            where: {id: dayId},
            include: [
                
            ]
        })
    })
}

//// get all categories & products by day
async function getCategoriesByDay(data) {
    console.log(`data is ===`, data);
    let dayId = data.dayId;
    let partnerId = data.partnerId;

    let query = {PartnerId: input.partnerId, isDeleted: false}

    return db.Category.findOne({ where: query})
    .then(res => {
        console.log(res);
        return res
    })

    // return db.WeekDays.findOne({
    //     where: { id: dayId},
    // //     include: [
    // //         {
    // //         model: db.Category,
    // //         as: `categoryDays`,
    // //         include: [
    // //             {
    // //                 model: db.Product,
    // //                 as : 'relatedProducts',
    // //                 required: true
    // //             }
    // //         ],

    // //         through: { where: { PartnerId: partnerId } }
    // //     }
    // // ]
    // })
    //     .then(async result => {
    //         console.log(result)
    //         // let categories = JSON.stringify(result, null, 2)
    //         // categories = JSON.parse(categories);
    //         // console.log(categories);

    //         ///// temp days
    //         // let daysWithCategories = []
    //         // let weeklyDays = [`MON`, `TUE`, `WED`, `THU`, `FRI`, `SAT`, `SUN`]
    //         // for (let i=0; i< 7; i++) {
    //         //     let obj = {
    //         //         id: i+1,
    //         //         day: weeklyDays[i],
    //         //         categories: categories
    //         //     }

    //         //     daysWithCategories.push(obj);
    //         // }

    //         // return daysWithCategories;
    //     })
        // .catch(generalHelpingMethods.catchException)
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

module.exports = {
    createCategory,
    getCategoriesOfPartner,
    editCategory,
    getCategoriesByDay,
    AllCategoriesByDay
}