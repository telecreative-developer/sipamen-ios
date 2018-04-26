


let array1 = [
  {id: 1, name: "Dicky"},
  {id: 2, name: "Kevin"},
  {id: 3, name: "Rendi"}
]

let array2 = [
  {id_job: 1, id: 1, job: "Software Engineering"},
  {id_job: 2, id: 2, job: "Engineer"},
  {id_job: 3, id: 2, job: "Data Science"},
  {id_job: 4, id: 3, job: "Backend Dev"}
]

let result = [
  {
    id: 1,
    name: "Dicky",
    jobs: [
      {
        job: "Software Engineer"
      }
    ]
  },
  {
    id: 2,
    name: "Kevin",
    jobs: [
      {
        job: "Engineer"
      },
      {
        job: "Data Science"
      }
    ]
  },
  {
    id: 3,
    name: "Rendi",
    jobs: [
      {
        job: "Backend Dev"
      }
    ]
  }
]