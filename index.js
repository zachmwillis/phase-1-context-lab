/* Your Code Here */
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    };
}
const employeeInfo = ["Bob", "Smith", "Manager", 30];
const record = createEmployeeRecord(employeeInfo);
console.log(record);



function createEmployeeRecords(infoArray) {
    return infoArray.map(createEmployeeRecord);
} 
const employeesData = [
    ["Bob", "Jones", "Chef", 25],
    ["Joe", "Smith", "Server", 10],
];
const infoOfEmployee = createEmployeeRecords(employeesData);  
console.log(employeeInfo);



function createTimeInEvent(employeeRecord, punchInDate) {
    const [date, time] = punchInDate.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');
    const punchInObject = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: `${year}-${month}-${day}`,
    };
    employeeRecord.timeInEvents.push(punchInObject);
    return employeeRecord;
}
const employee1 = {
    name: "Diana Willis",
    timeInEvents: [],
};
const datePunchedIn = "2023-11-28 0900";
const postPunchIn = createTimeInEvent(employee1, datePunchedIn);  
console.log(postPunchIn);



function createTimeOut(workerInfo, punchOutDate) {
    const [date, time] = punchOutDate.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');
    const timeOutObject = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: `${year}-${month}-${day}`,
    };
    workerInfo.timeOutEvents.push(timeOutObject);
    return workerInfo;
}
const worker = {
    name: "Joe Johnson",
    timeOutEvents: [],
};
const datePunchedOut = "2023-11-28 1700";
const postPunchOut = createTimeOut(worker, datePunchedOut);  
console.log(postPunchOut);



function hoursWorkedOnDate(payroll, date) {
    const punchIn = payroll.timeInEvents.find(event => event.date === date);
    const punchOut = payroll.timeOutEvents.find(event => event.date === date);
    if (punchIn && punchOut) {
        const hoursWorked = punchOut.hour - punchIn.hour;
        return hoursWorked;
    } else {
        return 0;
    }
}
const workers = {
    name: "Hilary Raab",
    timeInEvents: [
        { type: "TimeIn", hour: 9, date: "2023-11-28" },
    ],
    timeOutEvents: [
        { type: "TimeOut", hour: 17, date: "2023-11-28" },
    ],
};  
const date = "2023-11-28";
const hoursWorked = hoursWorkedOnDate(workers, date);  
console.log(hoursWorked);



function wagesEarnedOnDate(moneyEarned, daysWorked) {
    const hoursClocked = hoursWorkedOnDate(moneyEarned, daysWorked);
    const hourlyRate = moneyEarned.payRate;
    const moneyMade = hoursClocked * hourlyRate;
    return moneyMade;
}
  const employee2 = {
    name: "John Doe",
    payRate: 20,
    timeInEvents: [
        { type: "TimeIn", hour: 9, date: "2023-11-28" },
    ],
    timeOutEvents: [
      { type: "TimeOut", hour: 17, date: "2023-11-28" },
    ],
};
const dateWorked = "2023-11-28";
const money = wagesEarnedOnDate(employee2, date);  
console.log(money);



function wagesEarnedOnDate() {
    const timedClocked = this;
    const daysClocked = Object.keys(timedClocked.timeInEvents).map(dateString => new Date(dateString));
    const wagesClocked = daysClocked.reduce((sum, date) => {
        return sum + wagesEarnedOnDate.call(timedClocked, date);
    }, 0);
    return wagesClocked;
}
const payrollRecord = {
    timeInEvents: {
    },
    timeOutEvents: {
    }
};
  const wagesMade = wagesEarnedOnDate.call(payrollRecord);
  console.log(wagesMade);



function findEmployeeByFirstName(searchFirstName, firstName) {
  return searchFirstName.find(employee => employee.firstName === firstName);
}
const staffInfo = [
  { firstName: 'John', lastName: 'Smith',},
  { firstName: 'Jane', lastName: 'Smith',},
];
const foundEmployee = findEmployeeByFirstName(staffInfo, 'Jane');
console.log(foundEmployee);



function calculatePayroll(staffingInfo) {
    const payroll = staffingInfo.reduce((sum, employee) => {
      return sum + allWagesFor.call(employee);
    }, 0); 
    return payroll;
}
const workersInfo = [
    { firstName: "Bob", lastName: "Jones"},
    { firstName: "Lisa", lastName: "Smith"},
];
const totalPayroll = calculatePayroll(workersInfo);
console.log(totalPayroll);

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
};