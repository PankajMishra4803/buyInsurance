const express = require('express');
const getPolicyNumber = require('./helper');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/InsurancePortalDateBase', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the InsurancePortalDateBase database.');
});
// Get All User Details
router.get("/users", (req, res, next) => {
    const sql = "SELECT * FROM TableUserInfo"
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});
// Get All insurance Details
router.get("/users", (req, res, next) => {
    const sql = "SELECT * FROM TableUserInfo"
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});
// Get All userInsurance Details
router.get("/userInsurance/:userName", (req, res, next) => {
    const sql = "SELECT * FROM TablePayPremiumAmountDetails ";
    const params = [];
    const userId = req.params;
    let userSpecific = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        if (rows.length > 0) {
            rows.forEach((elment) => {
                if (elment.userName == userId.userName) {
                    userSpecific.push(elment);
                }
            })
            res.json({
                "message": "success",
                "data": userSpecific
            })
        }

    });
});
// Get All userInsurance Details
router.get("/userInsurance", (req, res, next) => {
    const sql = "SELECT * FROM TablePayPremiumAmountDetails ";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        } else {
            res.json({
                "message": "success",
                "data": rows
            });
        }
    });
});
router.put("/updateUserInsurance", (req, res, next) => {
    let sql = `UPDATE TablePayPremiumAmountDetails SET createDate = "${new Date()}" WHERE policyNumber ="ZDUPOL12322020"`;
    db.run(sql, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        } else {
            res.json({
                "message": "success",
                "data": rows
            });
        }
    });
});
router.put("/chnageModeOfPayment", (req, res, next) => {
    const params = [req.body.modeOfPayment, req.body.policyNumber]
    const sql = "UPDATE TablePayPremiumAmountDetails SET modeOfPayment =? WHERE policyNumber =?";
    db.run(sql, params, (err) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        } else {
            res.json({
                "message": "Entry Updated",
            });
        }
    });
});
// Get All insurance Details
router.get("/insurance", (req, res, next) => {
    const sql = "SELECT * FROM TableBuyInsurances"
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});
router.get("/insuranceDetails/:policyNumber", (req, res, next) => {
    const params = [req.params.policyNumber]
    const sql = "SELECT * FROM TablePayPremiumAmountDetails WHERE policyNumber =?"
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});
// Login API to saving usersaving
router.post('/logIn', (req, res) => {
    const data = {
        userName: req.body.userName,
        password: req.body.password,
    }
    const sqlTableUserInfo = 'INSERT INTO TableUserInfo (userName, password) VALUES(?,?)';
    const params = [data.userName, data.password]
    db.run(sqlTableUserInfo, params, function(err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
});
router.post('/addInsurance', (req, res) => {
    if (req.body) {
        var data;
        req.body.forEach(element => {
            data = {
                name: element.name,
                nominee: element.nominee,
                birthDate: element.birthDate,
                relationShip: element.relationShip,
                gender: element.gender,
                address: element.address,
                policyName: element.policyName,
                tenure: element.tenure,
                modeOFPayment: element.modeOFPayment,
                premiumAmount: element.premiumAmount,
                createDate: element.createDate,
                userName: element.userName,
            }
        });
    }
    const sqlTableBuyInsurances = 'INSERT INTO TableBuyInsurances (name, nominee,birthDate,relationship,gender,address,policyName,tenure,modeOFPayment,premiumAmount,createDate,userName) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
    const params = [data.name, data.nominee, data.birthDate, data.relationShip, data.gender, data.address, data.policyName, data.tenure, data.modeOFPayment, data.premiumAmount, data.createDate, data.userName]
    db.run(sqlTableBuyInsurances, params, function(err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
});
router.post('/addpremium', (req, res) => {
    if (req.body) {
        var data;
        req.body.forEach(element => {
            data = {
                premiumAmount: element.premiumAmount,
                policyName: element.policyName,
                policyNumber: getPolicyNumber.getPolicyNumber(element),
                dateOfBirth: element.dateOfBirth,
                modeOfPayment: element.modeOfPayment,
                createDate: element.createDate,
                userName: element.userName,
            }
        });
    }
    const sqlTablePayPremiumAmountDetails = 'INSERT INTO TablePayPremiumAmountDetails (premiumAmount, policyName, policyNumber,dateOfBirth,modeOfPayment,createDate,userName) VALUES(?,?,?,?,?,?,?)';
    const params = [data.premiumAmount, data.policyName, data.policyNumber, data.dateOfBirth, data.modeOfPayment, data.createDate, data.userName]
    db.run(sqlTablePayPremiumAmountDetails, params, function(err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
});

module.exports = router;
