// Your code here
function createEmployeeRecord([name, surname, job, payRate]){
let employeeObj = {
    firstName: name,
    familyName: surname,
    title: job,
    payPerHour: payRate,
    timeInEvents: [],
    timeOutEvents: [],
}
return employeeObj
}

function createEmployeeRecords(array){
    let newArray = [];
    for(const element of array){
        newArray.push(createEmployeeRecord(element))
    }
    return newArray
}

function createTimeInEvent(employeeRecordObj, dateString){
    const dateStringArray = dateString.split(" ");
    const newObj = {
        type: "TimeIn",
        hour: parseInt(dateStringArray[1], 10),
        date: dateStringArray[0]
    }
    employeeRecordObj.timeInEvents.push(newObj);
    return employeeRecordObj
}

function createTimeOutEvent(employeeRecordObj, dateString){
    const dateStringArray = dateString.split(" ");
    const newObj = {
        type: "TimeOut",
        hour: parseInt(dateStringArray[1], 10),
        date: dateStringArray[0]
    }
    employeeRecordObj.timeOutEvents.push(newObj);
    return employeeRecordObj
}

function hoursWorkedOnDate(employeeRecordObj, date){
    const timeIn = employeeRecordObj.timeInEvents.find(e => e.date === date).hour
    const timeOut = employeeRecordObj.timeOutEvents.find(e => e.date === date).hour
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employeeRecordObj, date){
    const payRate = employeeRecordObj.payPerHour
    return hoursWorkedOnDate(employeeRecordObj, date) * payRate
}

function allWagesFor(employeeRecordObj){
    const datesArray = employeeRecordObj.timeInEvents.map(obj => obj.date)
    const wagesArray = datesArray.map(date => wagesEarnedOnDate(employeeRecordObj, date));
    const wageTotal = wagesArray.reduce((total, current)=>total + current, 0);
    return wageTotal;
}

function calculatePayroll(recordsArray){
    let wagesArray = [];
    for (const e of recordsArray){
        for (const j of e.timeInEvents){
            // wagesArray.push(j.date)
            // wagesArray.push(wagesEarnedOnDate(j, j.date))
            wagesArray.push(wagesEarnedOnDate(e, j.date))
        }
    }
    return wagesArray.reduce((total, current)=> total + current, 0)
    return recordsArray[0].timeInEvents[0].date
}