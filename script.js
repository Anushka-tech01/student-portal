

function login() {

    let username =
        document.getElementById("username").value;

    let password =
        document.getElementById("password").value;

    fetch("users.xml")
    .then(response => response.text())
    .then(xmlText => {

        let parser = new DOMParser();

        let xml =
            parser.parseFromString(
                xmlText,
                "application/xml"
            );

        let users =
            xml.getElementsByTagName("user");

        let valid = false;

        for(let i=0;i<users.length;i++){

            let xmlUser =
                users[i]
                .getElementsByTagName("username")[0]
                .textContent;

            let xmlPass =
                users[i]
                .getElementsByTagName("password")[0]
                .textContent;

            if(username===xmlUser &&
               password===xmlPass){

                valid=true;
                break;
            }
        }

        if(valid){
            window.location.href="portal.html";
        }
        else{
            document.getElementById("message")
            .innerHTML="Invalid Username or Password";
        }

    });
}

// LOAD STUDENTS

function loadStudents(){

fetch("students.xml")
.then(response=>response.text())
.then(xmlText=>{

let parser = new DOMParser();

let xml =
parser.parseFromString(
xmlText,
"application/xml"
);

let students =
xml.getElementsByTagName("student");

let tbody =
document.getElementById("tableBody");

let highest = 0;
let topper = "";

for(let i=0;i<students.length;i++){

let name =
students[i]
.getElementsByTagName("name")[0]
.textContent;

let course =
students[i]
.getElementsByTagName("course")[0]
.textContent;

let semester =
students[i]
.getElementsByTagName("semester")[0]
.textContent;

let marks =
students[i]
.getElementsByTagName("marks")[0]
.textContent;

let row =
document.createElement("tr");

row.innerHTML=
`
<td>${name}</td>
<td>${course}</td>
<td>${semester}</td>
<td>${marks}</td>
`;

tbody.appendChild(row);

if(Number(marks) > highest){
highest = Number(marks);
topper = name;
}

}

document.getElementById("topStudent")
.innerHTML=
`
<h3>${topper}</h3>
<p>Marks : ${highest}</p>
`;

});

}

// SHOW HIDE TABLE

function toggleTable(){

let table =
document.getElementById("studentTable");

if(table.style.display==="none"){
table.style.display="table";
}
else{
table.style.display="none";
}

}

// CHANGE HEADING

function changeHeading(){

document.getElementById("heading")
.innerHTML =
"Welcome to Student Portal";

}

// DARK MODE

function toggleMode(){

document.body.classList.toggle("dark");

}