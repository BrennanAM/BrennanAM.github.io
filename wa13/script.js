// Problem 1: Employee JSON
let employees = [
    { firstName: "Sam", department: "Tech", designation: "Manager", salary: 40000, raiseEligible: true },
    { firstName: "Mary", department: "Finance", designation: "Trainee", salary: 18500, raiseEligible: true },
    { firstName: "Bill", department: "HR", designation: "Executive", salary: 21200, raiseEligible: false }
];
console.log("Problem 1:", JSON.stringify(employees));

// Problem 2: Company JSON
let company = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: employees
};
console.log("Problem 2:", JSON.stringify(company));

// Problem 3: Adding a new employee
company.employees.push({ firstName: "Anna", department: "Tech", designation: "Executive", salary: 25600, raiseEligible: false });
console.log("Problem 3:", JSON.stringify(company.employees));

// Problem 4: Total salary calculation
let totalSalary = company.employees.reduce((total, employee) => total + employee.salary, 0);
console.log("Problem 4: Total Salary =", totalSalary);

// Problem 5: Salary increase for eligible employees
company.employees.forEach(employee => {
    if (employee.raiseEligible) {
        employee.salary *= 1.1;
        employee.raiseEligible = false;
    }
});
console.log("Problem 5:", JSON.stringify(company.employees));

// Problem 6: Working from home
const wfhEmployees = ['Anna', 'Sam'];
company.employees.forEach(employee => {
    employee.wfh = wfhEmployees.includes(employee.firstName);
});
console.log("Problem 6:", JSON.stringify(company.employees));
