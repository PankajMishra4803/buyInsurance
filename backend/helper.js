function getPolicyNumber(element) {
    let currentDate = new Date(element.dateOfBirth);
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let date = currentDate.getDate();
    let resultString = genrateRandomThreeLetter(3)
    let policyNumber = resultString.toUpperCase() + element.policyName + date + month + year;
    return policyNumber;
}

function genrateRandomThreeLetter(length) {
    let text = '';
    let alphabetLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < length; i++) {
        text += alphabetLetter.charAt(Math.floor(Math.random() * alphabetLetter.length))
    }
    return text;
}

exports.getPolicyNumber = getPolicyNumber;
