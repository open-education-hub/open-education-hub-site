---

## Infrastructure

Makes the world go round and severs go brr

----

### Problems

- class setup takes time
- assignment and drill evaluation takes time
- integrating feedback is not an easy process

----

### Goals

- make teachers jobs easier
- automate everything
- give student instant feedback

----

### Building OER Content

- everything is text (slides, tasks, assignments, quizzes, drawings)
- using git is a must
- use already existing and tools

----

### OER Builder

![Builder Schema](media/oer-builder.svg)

----

### Builder Modules

- docusaurus converts MD to HTML
- reveal-md generates HTML slides from MD
- runs arbitrary commands
- working on quiz introduction

----

### Content Publishing

- using GitHub/GitLab to host pages
- automatic publishing
- updates through GUI

----

### New Content Integration

- PRs to add new content
- automatic content checking before publishing
- allows externals to contribute

----

### Automated Verification

- students need instant feedback
- same environment for assignment validation
- less time grading, more time teaching

----

### vmchecker

- use containers for easy checking
- make students use git
- check more than just functionality
- as little code as possible

----

### vmchecker Architecture

![Builder Schema](media/vmchecker-arch.svg)

----

### vmchecker Results

* 30k+ assignments checked
* integrated in various subjects (systems, algorithms)
* completely decentralized

----

### Digital Awards (SmileyCoins)

* students feel good when rewarded
* rewards should hold some value
* rewards awarded automatically
* offer students acknowledgement of achievements

----

### SmileyCoins

* used for public good projects in Africa
* cryptocurrency with value
* can be transacted with students

----

### Offering rewards

* built system for awarding coins on PR
* will offer awards (summer schools, books, TBD)
* student's can't redeem yet
