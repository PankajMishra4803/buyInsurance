const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/InsurancePortalDateBase', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the InsurancePortalDateBase database.');
});
sqlCommandForBuyInsurance = `CREATE TABLE TableBuyInsurances(
                                id INTEGER PRIMARY KEY,
                                name TEXT NOT NULL,
                                nominee TEXT NOT NULL,
                                birthDate TEXT NOT NULL,
                                relationShip TEXT NOT NULL,
                                gender TEXT NOT NULL,
                                address CHAR(100) NOT NULL,
                                policyName TEXT NOT NULL,
                                tenure INT NOT NULL,
                                modeOFPayment TEXT NOT NULL,
                                premiumAmount TEXT NOT NULL,
                                createDate DATE NOT NULL,
                                userName TEXT NOT NULL)`
sqlUserInfo = `CREATE TABLE TableUserInfo(
                                     user_id INTEGER PRIMARY KEY,
                                     userName TEXT NOT NULL,
                                     password TEXT NOT NULL)`
sqlPayPremiumAmountDetails = `CREATE TABLE TablePayPremiumAmountDetails(
                                      payment_id INTEGER PRIMARY KEY,
                                      premiumAmount TEXT NOT NULL,
                                      policyName TEXT NOT NULL,
                                      policyNumber TEXT NOT NULL,
                                      dateOfBirth TEXT NOT NULL,
                                      modeOfPayment TEXT NOT NULL,
                                      createDate DATE NOT NULL,
                                      userName TEXT NOL NULL)`
db.serialize(function() {
    db.run(sqlUserInfo, (err) => {
        if (err) {
            return console.log('Error Message', err.message);
        }
        console.log("CREATED TABLE TableUserInfo");
    });
    db.run(sqlCommandForBuyInsurance, (err) => {
        if (err) {
            return console.log('Error Message', err);
        }
        console.log("CREATED TABLE TableBuyInsurance");
    });

    db.run(sqlPayPremiumAmountDetails, (err) => {
        if (err) {
            return console.log('Error Message', err.message);
        }
        console.log("CREATED TABLE TablePayPremiumAmountDetails");
    });
});
db.close();
