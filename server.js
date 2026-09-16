const http = require("http");

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
        status: "Placed",
        company: "Infosys"
    },
    {
        id: 3,
        name: "Aman Verma",
        course: "B.Sc. IT",
        status: "Not Placed",
        company: "Not Assigned"
    }
];

function htmlPage(title, body) {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>${title}</title>

    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #f2f5f8;
        }

        nav {
            background: #174a7e;
            padding: 20px;
            text-align: center;
        }

        nav a {
            color: white;
            text-decoration: none;
            margin: 0 15px;
            font-weight: bold;
        }

        .container {
            width: 85%;
            margin: 40px auto;
        }

        .box {
            background: white;
            padding: 30px;
            margin-bottom: 20px;
            border-radius: 10px;
            box-shadow: 0 3px 10px #ccc;
        }

        h1 {
            color: #174a7e;
        }

        h2 {
            color: #25639c;
        }

        a.button {
            display: inline-block;
            background: #174a7e;
            color: white;
            padding: 10px 18px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
        }

        li {
            margin: 8px;
        }

        footer {
            background: #174a7e;
            color: white;
            text-align: center;
            padding: 15px;
            margin-top: 40px;
        }
    </style>
</head>

<body>

<nav>
    <a href="/">Home</a>
    <a href="/companies">Companies</a>
    <a href="/students">Students</a>
</nav>

<div class="container">
    ${body}
</div>

<footer>
    College Placement Management System
</footer>

</body>
</html>
`;
}

const server = http.createServer(function(req, res) {

    const path = req.url;

    res.setHeader("Content-Type", "text/html");

    // HOME
    if (path === "/" && req.method === "GET") {

        res.statusCode = 200;

        res.end(htmlPage(
            "Home",
            `
            <div class="box">
                <h1>College Placement Management System</h1>

                <p>
                    Welcome to the College Placement Portal.
                </p>

                <p>
                    This system provides information about
                    companies, job openings and students.
                </p>

                <a class="button" href="/companies">
                    View Companies
                </a>

                <a class="button" href="/students">
                    View Students
                </a>
            </div>
            `
        ));
    }

    // COMPANIES
    else if (path === "/companies" && req.method === "GET") {

        res.statusCode = 200;

        let output = `
            <h1>Participating Companies</h1>
        `;

        companies.forEach(function(company) {

            output += `
                <div class="box">

                    <h2>${company.name}</h2>

                    <p>
                        <b>Location:</b>
                        ${company.location}
                    </p>

                    <p>
                        <b>Number of Jobs:</b>
                        ${company.jobs.length}
                    </p>

                    <a class="button"
                       href="/company/${company.id}">
                        View Details
                    </a>

                </div>
            `;
        });

        res.end(htmlPage("Companies", output));
    }

    // COMPANY DETAILS
    else if (
        path.startsWith("/company/") &&
        req.method === "GET"
    ) {

        const id = Number(path.split("/")[2]);

        const company = companies.find(function(item) {
            return item.id === id;
        });

        if (company) {

            res.statusCode = 200;

            let jobs = "";

            company.jobs.forEach(function(job) {
                jobs += `<li>${job}</li>`;
            });

            res.end(htmlPage(
                "Company Details",
                `
                <div class="box">

                    <h1>${company.name}</h1>

                    <p>
                        <b>Location:</b>
                        ${company.location}
                    </p>

                    <h2>Job Openings</h2>

                    <ul>
                        ${jobs}
                    </ul>

                    <a class="button" href="/companies">
                        Back to Companies
                    </a>

                </div>
                `
            ));

        } else {

            res.statusCode = 404;

            res.end(htmlPage(
                "404",
                `
                <div class="box">
                    <h1>Company Not Found</h1>
                    <p>The company does not exist.</p>

                    <a class="button" href="/companies">
                        Back to Companies
                    </a>
                </div>
                `
            ));
        }
    }

    // STUDENTS
    else if (path === "/students" && req.method === "GET") {

        res.statusCode = 200;

        let output = `
            <h1>Registered Students</h1>
        `;

        students.forEach(function(student) {

            output += `
                <div class="box">

                    <h2>${student.name}</h2>

                    <p>
                        <b>Course:</b>
                        ${student.course}
                    </p>

                    <p>
                        <b>Status:</b>
                        ${student.status}
                    </p>

                    <p>
                        <b>Company:</b>
                        ${student.company}
                    </p>

                    <a class="button"
                       href="/student/${student.id}">
                        View Details
                    </a>

                </div>
            `;
        });

        res.end(htmlPage("Students", output));
    }

    // STUDENT DETAILS
    else if (
        path.startsWith("/student/") &&
        req.method === "GET"
    ) {

        const id = Number(path.split("/")[2]);

        const student = students.find(function(item) {
            return item.id === id;
        });

        if (student) {

            res.statusCode = 200;

            res.end(htmlPage(
                "Student Details",
                `
                <div class="box">

                    <h1>${student.name}</h1>

                    <p>
                        <b>Course:</b>
                        ${student.course}
                    </p>

                    <p>
                        <b>Status:</b>
                        ${student.status}
                    </p>

                    <p>
                        <b>Company:</b>
                        ${student.company}
                    </p>

                    <a class="button" href="/students">
                        Back to Students
                    </a>

                </div>
                `
            ));

        } else {

            res.statusCode = 404;

            res.end(htmlPage(
                "404",
                `
                <div class="box">
                    <h1>Student Not Found</h1>

                    <a class="button" href="/students">
                        Back to Students
                    </a>
                </div>
                `
            ));
        }
    }

    // JOBS BY COMPANY
    else if (
        path.startsWith("/jobs/") &&
        req.method === "GET"
    ) {

        const companyName = path.split("/")[2];

        const company = companies.find(function(item) {
            return item.name.toLowerCase() ===
                   companyName.toLowerCase();
        });

        if (company) {

            res.statusCode = 200;

            let jobs = "";

            company.jobs.forEach(function(job) {
                jobs += `<li>${job}</li>`;
            });

            res.end(htmlPage(
                "Jobs",
                `
                <div class="box">

                    <h1>${company.name} Jobs</h1>

                    <ul>
                        ${jobs}
                    </ul>

                    <a class="button" href="/companies">
                        Back to Companies
                    </a>

                </div>
                `
            ));

        } else {

            res.statusCode = 404;

            res.end(htmlPage(
                "404",
                `
                <div class="box">
                    <h1>Company Not Found</h1>
                </div>
                `
            ));
        }
    }

    // 404 PAGE
    else {

        res.statusCode = 404;

        res.end(htmlPage(
            "404",
            `
            <div class="box">
                <h1>404 - Page Not Found</h1>

                <p>
                    The requested page does not exist.
                </p>

                <a class="button" href="/">
                    Go to Home
                </a>
            </div>
            `
        ));
    }

});

server.listen(3001, function() {
    console.log("Server running at http://localhost:3001");
});