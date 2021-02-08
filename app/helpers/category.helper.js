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
        
        let newCategory = db.Category.build(categoryObj);
        await newCategory.save()

        return {
        id: newCategory.id,
        name: newCategory.name,
        }
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
    editCategory
}