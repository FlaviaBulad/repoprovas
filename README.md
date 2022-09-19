# <p align = "center"> Project RepoProvas API</p>

<p align="center">
   <img src="https://cdn-icons-png.flaticon.com/512/4838/4838291.png" width="320px"/>
  
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Flávia Bulad-4dae71?style=flat-square" />
   
   <img src="https://img.shields.io/github/languages/count/FlaviaBulad/projeto20-repoprovas?color=4dae71&style=flat-square" />
</p>

## 📋 Description

- RepoProvas is a system for sharing tests between students.
- At RepoProvas anyone can search for old tests of their subjects and teachers or send old exams to help fellow freshmen.

---

## 🚀 Deploy

<p>
<a href="https://server-repoprovas.herokuapp.com/">  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white"/>
</a>
  
 
</p>

## 💻 Technology and Concepts

 <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px">
  <img src="https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink" height="30px">
  <img src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white" height="30px">
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->

---

## 🚀 Routes

```yml
POST /sign-up
    - Route to register a new user
    - headers: {}
    - body:{
        "email": "lorem@gmail.com",
        "password": "loremipsum"
        "confirm_password": "loremipsum"
        }
```

```yml
POST /sign-in
    - Route to login
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "senha": "loremipsum"
    }
```

```yml
POST /tests (authenticated)
    - Route to post a test
    - headers: { "Authorization": ${token} }
    - body: {
     "name": "project parrots",
     "pdfUrl": "http://testpdf.com" ,
     "discipline": "JavaScript",
     "category": "Projeto",
     "teacher": "Diego Pinho"
  };

```

```yml
GET /tests/disciplines (authenticated)
    - Route to search for a test by subject
     - headers: { "Authorization": ${token} }
    - response: {[
  {
    "number": 1,
    "disciplines": [
      {
        "name": "HTML e CSS",
        "teacherDiscipline": [
          {
            "teacher": {
              "name": "Diego Pinho"
            },
            "tests": []
          }
        ]
      },
      {
        "name": "Humildade",
        "teacherDiscipline": [
          {
            "teacher": {
              "name": "Bruna Hamori"
            },
            "tests": []
          }
        ]
      }
    ]
  },
  {
    "number": 2,
    "disciplines": [
      {
        "name": "JavaScript",
        "teacherDiscipline": [
          {
            "teacher": {
              "name": "Diego Pinho"
            },
            "tests": []
          }
        ]
      },
      {
        "name": "Planejamento",
        "teacherDiscipline": [
          {
            "teacher": {
              "name": "Bruna Hamori"
            },
            "tests": []
          }
        ]
      }
    ]
  },
  {
    "number": 3,
    "disciplines": [
      {
        "name": "React",
        "teacherDiscipline": [
          {
            "teacher": {
              "name": "Diego Pinho"
            },
            "tests": []
          }
        ]
      },
      {
        "name": "Autoconfiança",
        "teacherDiscipline": [
          {
            "teacher": {
              "name": "Bruna Hamori"
            },
            "tests": []
          }
        ]
      }
    ]
  },
  {
    "number": 4,
    "disciplines": []
  },
  {
    "number": 5,
    "disciplines": []
  },
  {
    "number": 6,
    "disciplines": []
  }
]}
```

```yml
GET /tests/teachers (authenticated)
    - Route to search for a test by teacher
    - headers: { "Authorization": "Bearer $token" }
    - response: {
       [
  {
    "name": "Diego Pinho",
    "teacherDiscipline": [
      {
        "discipline": {
          "name": "HTML e CSS"
        },
        "tests": []
      },
      {
        "discipline": {
          "name": "JavaScript"
        },
        "tests": []
      },
      {
        "discipline": {
          "name": "React"
        },
        "tests": []
      }
    ]
  },
  {
    "name": "Bruna Hamori",
    "teacherDiscipline": [
      {
        "discipline": {
          "name": "Humildade"
        },
        "tests": []
      },
      {
        "discipline": {
          "name": "Planejamento"
        },
        "tests": []
      },
      {
        "discipline": {
          "name": "Autoconfiança"
        },
        "tests": []
      }
    ]
  }
]
    }
```

---

## 🏁 Running the App

First, clone this repository on your machine:

```
git clone https://github.com/FlaviaBulad/projeto20-repoprovas.git
```

Then, inside the folder, run the following command to install the dependencies.

```
npm install
```

Then populate the database with the supplied seed:

```
npx prisma db seed
```

Once it's done, just start the server

```
npm start
```

To perform integration tests, run the following command:

```
npm test
```

## 👏 Acknowledgements

- [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)

- <a href="https://www.flaticon.com/free-icons/online-test" title="online test icons">Online test icons created by Andrean Prabowo - Flaticon</a>
  </br>

## 👩‍💻 Authors

- Flávia Bulad is a student at Driven Education and is putting effort into it to become a FullStack Web Developer.
  <br/>
