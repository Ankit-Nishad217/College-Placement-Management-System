const express = require("express");
const { engine } = require("express-handlebars");

const app = express();
app.use(express.static("public"));

// Setup Handlebars
app.engine("hbs", engine({
    extname: ".hbs",
    defaultLayout: false
}));

app.set("view engine", "hbs");
app.set("views", "./views");

// Company data
const companies = [
    {
        id: 1,
        name: "TCS",
        location: "Mumbai",
        jobs: ["Software Developer", "System Engineer"]
    },
    {
        id: 2,
        name: "Infosys",
        location: "Pune",
        jobs: ["Web Developer", "Java Developer"]
    },
    {
        id: 3,
        name: "Accenture",
        location: "Mumbai",
        jobs: ["Software Engineer", "Data Analyst"]
    }
];

// Student data
const students = [
    {
        id: 1,
        name: "Rahul Sharma",
        course: "B.Sc. IT",
        status: "Placed",
        company: "TCS"
    },
    {
        id: 2,
        name: "Priya Patil",
        course: "B.Sc. IT",
        status: "Not Placed",
        company: "None"
    },
    {
        id: 3,
        name: "Aman Verma",
        course: "B.Sc. IT",
        status: "Placed",
        company: "Infosys"
    }
];

// Home route
app.get("/", (req, res) => {
    res.status(200).render("home");
});

// Display all companies
app.get("/companies", (req, res) => {
    res.status(200).render("companies", {
        companies: companies
    });
});

// Display selected company
app.get("/company/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);

    const company = companies.find((item) => item.id === id);

    if (company) {
        res.status(200).render("company", company);
    } else {
        res.status(404).send("Company not found");
    }
});

// Display all students
app.get("/students", (req, res) => {
    res.status(200).render("students", {
        students: students
    });
});

// Display selected student
app.get("/student/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);

    const student = students.find((item) => item.id === id);

    if (student) {
        res.status(200).render("student", student);
    } else {
        res.status(404).send("Student not found");
    }
});

// Display jobs offered by a company
app.get("/jobs/:company", (req, res) => {
    const companyName = req.params.company;

    const company = companies.find(
        (item) => item.name.toLowerCase() === companyName.toLowerCase()
    );

    if (company) {
        res.status(200).render("jobs", {
            company: company.name,
            jobs: company.jobs
        });
    } else {
        res.status(404).send("Company not found");
    }
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

// Start server
app.listen(3000, () => {
    console.log("Express server running at http://localhost:3000");
});
