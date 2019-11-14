## incREADible | _by: <a href="https://https://github.com/judycodes">Judy Truong</a>_
Full Stack Application Focused on Learning & Reflection

### Getting Started

### Prerequisites

---

### [ incREADible Manual ]

#### _Enjoyed_
- Being inspired by my peers' progress and work
- When the parts of the application runs and works as expected
- Implementing more exceptions
- Learning new fact tidbits about different topics while discussing this project with my peers and throughout the development of this application

#### _Challenges_
- Microservices with Docker : Experienced errors with EntityFactoryManager when Eureka was added to my API 

#### _Mistakes/Failures_
- Spending too long trying to figure out setting up Docker with Microservices, rather than on other parts of the project, so early in the development process

#### _What would you do differently?_
- Allotted more time for research and exploring new tools for the development of this project

- Planned for breaking out my React code into more components

---

### Built With
_Tools_
- Docker
- Postman
- DBeaver
- LucidChart
- Figma
- Trello

_Frontend_
- React.js
- 3rd Party APIs - Catfact.ninja, Wikipedia

_Backend_
- Java (Spring Boot)
- PostgreSQL

#### incREADible Entity Relationship Diagram
<img alt = "increadible ERD" src = "./incREADible_erd.png" />

#### incREADible Database Structure
- Increadible's database has two data models: User & Reflection
- Reflection model has `user_id` as a foreign key for reflections related to the user

#### _Relationships_
- A `User` can have zero or more reflections.
- Each `Reflection` is associated with only one `User`.

#### Wireframes
_Landing Design_ <br/>
   <img alt = "Increadible Landing Page" src=""/>

_Home Page Design_ <br/>
   <img alt = "Increadible Home Page" src=""/>

_Create Reflection Page Design_ <br/>
   <img alt = "Increadible Create Reflection Page" src=""/>

_User Reflections Page Design_ <br/>
   <img alt = "Increadible User Reflections Page" src=""/>      

_About Page Design_ <br/>
   <img alt = "Increadible About Page" src=""/>

#### User Stories

*Steven L.*<br/>
_30, Male_<br/>
_Administrative Assistant_

Steven is a new hire at his company. As a user, he wants to use Increadible to learn some trivia, which he can use when making small talk around the water cooler and build relationships with his colleagues.

*Graham R.*<br/>
_24, Male_<br/>
_Software Engineer_

Graham is working with a new language at his company.
As a user, he wants to use the reflection feature of Increadible to note his understanding of concepts and the what/how/why aspects of his solution to issues and bugs for future reference so he can track his growth and is more aware of his development and progress.

*Karen Y.*<br/>
_19, Female_<br/>
_College Student_

Karen is curious about everything. As a user, Karen wants to use Increadible to research and learn more about various random topics so that she can become a Jeopardy College Tournament contestant.

---

#### Day to Day Development
|                          Day 1                          |        Day 2        |                     Day 3                     |                          Day 4                          |                  Day 5                 |                     Day 6                     |                Day 7                |                       Day 8                       |
|:-------------------------------------------------------:|:-------------------:|:---------------------------------------------:|:-------------------------------------------------------:|:--------------------------------------:|:---------------------------------------------:|:-----------------------------------:|:-------------------------------------------------:|
| User & Reflection - Model/Service/Repository/Controller | ERD designed        | Microservices debugging                       | Update Reflection subject and tidbit methods functional | Navbar minor styling                   | Microservices and Docker basic setup          | Wikipedia Search functional         | Token saved to localstorage from login and signup |
| Checked User & Reflection Endpoints (with Postman)      | README.md created   | Restarting Spring Boot Monolith               | React Routing basic setup                               | Icon and logo added                    | Search and Result Components created          | Microservices configured and tested | Login and signup redirect functional              |
| Spring Boot, Microservices, Github setup                | Wireframing         | Add goal, update goal, and get goal from User | User stories created                                    | Setup AWS EC2 instance and S3 storage  | Wikipedia Random Search and Search Form setup | Login and Signup components toggle  | Render and generate random fact                   |
| Research & Application brainstorming                    | Microservices Error | Create React basic template                   | Research Microservices and Docker                       | Landing page setup                     |                                               | Signup functional                   | Create and Edit Reflection functionality added    |