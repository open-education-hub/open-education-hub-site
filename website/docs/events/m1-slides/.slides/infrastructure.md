---

## Infrastructure

---

### Current Issues

- Most users (students and contributors) don't actually write courses from scratch
- Teachers spend more time preparing course setups
- Our role is to teach students, not build infrastructure

---

### Goals

- Eliminate and automate as much of the class setup work as possible
- Be easy to use by both technical and non-technical people
- Use as many pre-build solutions as possible

---

### Setup Tasks?

- Writing course/lab materials
- Maintaining course infrastructure
  - Generating and publishing materials by hand
  - Homework checking
  - Quiz checking and integration with other materials

---

### Ideal Class

- Classes are `git` repos
- Open source
- A page where students easily have access to all their resources
- See the [operating-systems repo](https://github.com/open-education-hub/operating-systems)

----

#### Class Actions Using Repos

- Fork (copy) an existing class
- Modify an existing class
- Raising issues centrally
- Allow external users to suggest changes

---

### OpenEduHub Organization (1)

- Use a GitHub org to collate open source courses

![OpenEduGitHub](media/open-edu-github.png)

----

#### OpenEduHub Organization (2)

- We'll try to include as many classes as possible
- Review changes based on aforementioned methodology

---

### Infrastructure Overview

- Content builder
- Content publisher

---

### Content Builder

- Configurable pipeline
- Parses different kinds of content
- Outputs HTML

----

#### Builder Input

- `.md` files for now
- `reveal.js` slides

----

#### Builder output (1)

- HTML content build using [Docusaurus](https://docusaurus.io/)
- TODO: integrate other output frameworks

----

#### Builder output (2)

![Docusaurus](media/docusaurus-output.png)

---

#### Builder TODOs

- Add support for quiz integration
- Add more output frameworks

---

### Content Publisher

- Scripts that will publish builder output to different infrastructures

----

#### Publisher Status

- Only made up of GitHub workflows so far
- Homework checker is in production at this point
