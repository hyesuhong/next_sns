# Social media app clone(with Next.js)

## Requirements

### Packages

![NextJS](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white)
![SWR](https://img.shields.io/badge/SWR-000000?style=flat-square&logo=swr&logoColor=white)

### Router

| route               | description                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| **/**               | - main page<br/>- only logged-in users can approach this page<br/>- display all tweets<br/>- write a tweet |
| **/create-account** | sign up page                                                                                               |
| **/log-in**         | sign in page                                                                                               |
| **/tweet/[id]**     | - display detail of specific tweet<br/>- a tweet has like button                                           |

## Next Steps

### To Fix

- [ ] fix like mutation bug
- [ ] sidebar's profile link

### To Do

- [ ] connect to database server
- [ ] auth
  - [ ] add password field
  - [ ] logout
- [ ] post
  - [ ] update
  - [ ] delete
  - [ ] comment
- [ ] user
  - [ ] read user profile
  - [ ] profile update
