const AppError = require('./appError');

exports.get = (req, res, next) => {
    try {
        res.status(200).json({
            message: "My Rule-Validation API",
            status: 'success',
            data: {
                "name": "Ajoge Abdulwahid",
                "github": "@rhvp",
                "email": "bugsabdul@yahoo.com",
                "mobile": "08162106120"
            }
        }) 
    } catch (error) {
        console.error(error);
    }
}
const validateConditionNested = (rule, data, dataField, nest1) => {
    let field = data[dataField];
    let fieldData = field[nest1];
    console.log(fieldData, rule);
    if(rule.condition === 'gte') {
        if(fieldData >= rule.condition_value) return true;
        return false;
    }

    else if(rule.condition === 'eq') {
        if(fieldData == rule.condition_value) return true;
        return false;
    }

    else if(rule.condition === 'neq') {
        if(fieldData != rule.condition_value) return true;
        return false;
    }

    else if(rule.condition === 'gt') {
        if(fieldData > rule.condition_value) return true;
        return false;
    }

    else if(rule.condition === 'contains') {
        if(fieldData.includes(rule.condition_value)) return true;
        return false;
    }

    else return 'Unsupported Condition';
}
const validateNested = (rule, data) => {
    let fieldString = rule.field;
    const seperate = fieldString.split('.');
    const dataField = seperate[0];
    const nest1 = seperate[1];
    const nest2 = seperate[2];
    console.log(dataField, nest1, nest2);
    let fieldValid = data[dataField];
    if(fieldValid && fieldValid[nest1]) return validateConditionNested(rule, data, dataField, nest1);
    return 'field missing from data';
}



const filterRule = (rule, data) => {
    let ruleField = rule.field;
    if(ruleField.includes('.')) {
        console.log('nested field');
        return validateNested(rule, data);
    } else return validateCondition(rule, data);
}

const validateCondition = (rule, data) => {
    let field = data[rule.field];
    if(!data.includes(ruleField)) return 'field missing from data';
    if(rule.condition === 'gte') {
        if(field >= rule.condition_value) return true;
        return false;
    }

    else if(rule.condition === 'eq') {
        if(field == rule.condition_value) return true;
        return false;
    }

    else if(rule.condition === 'neq') {
        if(field != rule.condition_value) return true;
        return false;
    }

    else if(rule.condition === 'gt') {
        if(field > rule.condition_value) return true;
        return false;
    }

    else if(rule.condition === 'contains') {
        if(field.includes(rule.condition_value)) return true;
        return false;
    }

    else return 'Unsupported Condition';
}

exports.validate = (req, res, next) => {
        let {rule, data} = req.body;
        // const isJson = isJSON(req.body);
        // if(!isJson) return next(new AppError('Invalid JSON payload passed.', 400));
        if(typeof(rule) !== 'object') return next(new AppError('rule must be an object.', 400));
        if(!rule) return next(new AppError('rule is required.', 400));
        if(!rule.field) return next(new AppError('rule.field is required.', 400));
        if(!rule.condition) return next(new AppError('rule.condition is required.', 400));
        if(!rule.condition_value) return next(new AppError('rule.condition_value is required.', 400));
        if(!data) return next(new AppError('data is required.', 400));
        const validCondition = filterRule(rule, data);
        if(validCondition === 'Unsupported Condition') return next(new AppError('Unsupported condition.', 400));
        if(validCondition === 'nested data') return next(new AppError('Nested Data.', 500));
        if(validCondition === 'field missing from data') return next(new AppError(`field ${rule.field} missing from data.`, 400));
        console.log(validCondition);
        if(validCondition) return res.status(200).json({
            message: `field ${rule.field} successfully validated`,
            status: "success",
            data: {
                validation: {
                    error: false,
                    field: rule.field,
                    field_value: data[rule.field],
                    condition: rule.condition,
                    condition_value: rule.condition_value
                }
            }
        })

        else return res.status(200).json({
            message: `field ${rule.field} failed validation`,
            status: "error",
            data: {
                validation: {
                    error: true,
                    field: rule.field,
                    field_value: data[rule.field],
                    condition: rule.condition,
                    condition_value: rule.condition_value
                }
            }
        })

}

