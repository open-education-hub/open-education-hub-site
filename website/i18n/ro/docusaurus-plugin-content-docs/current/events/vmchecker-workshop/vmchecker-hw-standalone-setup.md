# VMChecker Guide for the Standalone UI

## 1. Introduction

VMChecker Next is a new type of homework testing environment. It makes it so a student and a teacher can both use the same infrastructure in order to test homework with minimal input.

When you want to add a new assignment to VMChecker next you will need to have the following components ready:

* a private assignment repository, based on which the homework will be tested. This repository will have to remain private, as assignments are tested by creating a new branch for each submission through Moodle;
* a public repository that is a mirror of the private repository which can be forked privately by students in order to test their homework using the same scripts and containers;
* a frontend instance such as vmchecker-next-ui or Moodle where students will have to upload their homework;

### 1.1 Clone the Template Repository

To have a baseline for this workshop, we will be using the [container templates](https://gitlab.cs.pub.ro/vmchecker/container-templates) git repository.

From here, we are able to study the `docker-compose.yml` file provided in the `vmchecker-next-ui` directory.
It contains the necessary components to set up a Frontend instance together with the VMChecker backend and a GitLab Runner.

To start up the infrastructure, you will have to run the following command in
the `container-templates/vmchecker-next-ui` directory:

```bash
docker-compose -f ./docker-compose.yml --env-file ./.env -p vmchecker-test up
```

To connect to the Docker-based vmchecker-next-ui you will have to open Firefox and connect
to the `localhost:7000` address. The UI is fully integrated with LDAP and we have a few users
to login in with at our disposal (user/password):

* `user01`/`password1`
* `user02`/`password2`

## 2. Gitlab Setup

The private and public repositories must have the following structure:

```text
├── checker/
│   ├── checker.sh
│   ├── input/
│   │   ├── test0
│   └── output/
│       ├── test0.ref
├── Dockerfile
├── .gitlab-ci.yml
├── local.sh
└── src/
    └── skel.c
```

It is recommended to fork https://gitlab.cs.pub.ro/vmchecker/vmchecker-next-assignment for a faster start.

If you are working on **Gitlab.com** you can import the repository by going from the main page `New Project > Import Project > Repository by URL` and then filling in the `Git repository URL` with: https://gitlab.cs.pub.ro/vmchecker/vmchecker-next-assignment.git.

The project also contains the solution under `src/solution.c` if you want to test your GitLab setup before porting your assignment.

A typical assignment will have the above structure with the following files and folders of interest to teaching assistants:
- **src/** - Here the student will develop their solution according to the assignment's specification. Here, you can add a skeleton for the assignment.
- **local.sh** - A utility script used to check the assignment locally. It simulates a Gitlab pipeline.
- **Dockerfile** - Used to build the docker image for the Gitlab pipeline. The following is an example that should satisfy most cases:

```docker
FROM jokeswar/base-ctl
COPY ./checker ${CHECKER_DATA_DIRECTORY}
```

**NOTE**: The **base-ctl** image is based on the ubuntu:20.04 image and has the following additional packages installed: build-essential and python3.

**NOTE**: When the image is built the entire checker is copied into the docker image, to prevent the user from changing tests.

- **.gitlab-ci.yml** - The definition of the pipeline. You **must** change the image used to the one you built;
- **checker/** - The checker directory;
- **checker/checker.sh** - The entry point of the checker. When execution is passed to this script, the **current working directory** is set to the **checker/** folder.

**NOTE**: In order for VMChecker Next to be able to grade the assignment it will look for the last string that matches the following regex: `Total:\ *([0-9]+)` (the grade must be an integer).

Valid format:

```text
              Total:100/100
              Total:    0/100
Total:50/100
```

Invalid format:

```text
              Total: 55.37/100       # The grade will be set as 55, not 55.37 on Moodle
```

**NOTE**: You will need to generate a [project access token](https://docs.gitlab.com/ee/user/project/settings/project_access_tokens.html#create-a-project-access-token) that will allow VMChecker to access Gitlab's API. You will need to give the token access to `api`, `read_api`, `read_registry`, `write_registry`, `read_repository`, `write_repository` and the role should be at least `Developer`. Also, the project ID for the private repository is needed.

#### First Changes Needed ###

1. Change the `DEFAULT_IMAGE_NAME` with the name of the public repository of your homework in the format `groupname/projectname`. This variable is found in the [`local.sh` script](https://gitlab.cs.pub.ro/vmchecker/vmchecker-next-assignment/-/blob/master/local.sh#L12)
2. Change the image used to the same name set as above in the `.gitlab-ci.yml` file on [line 29](https://gitlab.cs.pub.ro/vmchecker/vmchecker-next-assignment/-/blob/master/.gitlab-ci.yml#L29)

### 2.1. Disable Merge Requests for the Public Repository

To avoid the possibility of students accidentally sharing their solution, **Merge Requests** for the public repository must be disabled. To do that:
1. Go to your public project page
2. On the left panel under **Settings** select **General**
3. Under the **Visibility, project features, permissions** disable **Merge Requests**.

![mr_disable](https://user-images.githubusercontent.com/24795454/170046159-4a45db7a-1a52-48d1-905f-662d0287badf.png)

### 2.2. Set Up a CD Pipeline for the Checker Image

In **.gitlab-ci.yml** set the image name for the **checker** step to **registry.gitlab.com/\<group-name\>/\<project-name\>:\<tag\>** (e.g: registry.gitlab.com/ASC/Assignment-3-Public:latest).

#### 2.2.1. Build the Checker Image Using Gitlab Pipelines

Set up the **BUILD_DOCKER_IMAGE** [pipeline environment variable](https://docs.gitlab.com/ee/ci/variables/#add-a-cicd-variable-to-a-project) to **true** for your public repository. Each time a new commit is made to the repository a new Docker image build will be triggered. The image will be uploaded to Gitlab's own Docker registry.

#### 2.2.2. Build the Checker Image Manually

```bash
./local.sh docker build
./local.sh docker push --user "$GITLAB_USERNAME" --token "$GITLAB_ACCESS_TOKEN"
```

To create a **GITLAB_ACCESS_TOKEN** access token follow the [documentation on Gitlab](https://docs.gitlab.com/ee/user/packages/container_registry/#authenticate-by-using-gitlab-cicd).

For more information on **local.sh** run `./local.sh -h`.

### 2.3. Find the Project ID

1. Go to your project page
2. The ID is found under the project name

![project_id](https://user-images.githubusercontent.com/24795454/163970448-e4e47e5e-7739-4d09-a60b-b621ed5a0e33.png)

### 2.4. Setup the Gitlab Runner

Lastly, we need to register our Gitlab Runner, so that our assignment verification jobs get checked. To do that we go to our project and click on `Settings > CI/CD > Project Runners`. While we are here make sure that the option `Enable shared runners for this project` is disabled!

![add-runner](https://github.com/Jokeswar/Investi/assets/24795454/c39f77d6-70b3-4129-8232-e1001f847e56)

Then you will have to select your Operating System and whether to use Docker or Kubernetes to host the runner. Currently, we will use the Docker engine to start and host the GitLab Runner. In this step, make sure that `Run untagged jobs` is checked.

![runner-config-1](https://github.com/Jokeswar/Investi/assets/24795454/36255270-4afe-4d99-bac4-a8843a0a695a)

The Docker runner container was already started as part of the docker-compose command. Finally, click on `Create runner` found at the bottom of the page

Now you will be presented with some instructions on how to register the runner instance on your machine with Gitlab. The official documentation is found [here](https://docs.gitlab.com/runner/register/index.html#docker). In our case, the command to register the runner is:

```bash
docker exec -it vmchecker-test-runner-1 gitlab-runner register
```

![runner-config-2](https://github.com/Jokeswar/Investi/assets/24795454/d3b3cbb3-1725-4c92-acc4-e7597cc334c9)

## 3. VMChecker Next UI Assignment Setup

First log into the admin dashboard of the UI found at http://localhost:7000/admin/login/?next=/admin/. The credentials, user/password, are `admin`/`admin`.

Under the `UI` group select `Assignments` then click on `Short Name of Assignment` to start editing it.

![ui-config-1](https://github.com/Jokeswar/Investi/assets/24795454/4131ac66-dacd-474e-89e3-76f13d422a5c)

Here you will be able to configure the most important settings of your assignment.

* **Gitlab private token** - This is the token you created in step 2, and it allows the middleware to commit changes to your private repository;
* **Gitlab branch** - This is the default branch of the repository. If you imported/forked the vmchecker-next-assignment repository, the default branch is `master`;
* **Gitlab project ID** - This is the ID of your private repository found on Gitlab (See [2.3. Find the project ID](#23-find-the-project-id));


![ui-config-2](https://github.com/Jokeswar/Investi/assets/24795454/d413f420-b5c8-4715-96ce-6901cf38e8da)

## 4. Test Your Assignment

After the setup is done, go to the homepage, select the assignment, and upload your submission via `Submit your Archive`. Your solution will run on the GitLab CI. You can check your [private repository](#5-check-a-submission-on-gitlab). When the pipeline is finished the trace will be set as feedback for your assignment and the the submission graded.


**NOTE**: On the local website, the feedback string will be computed from the trace found on the Gitlab pipeline and will be the first 300 lines of the content between the start of the checker string mark (i.e. **<VMCK_NEXT_BEGIN>**) and the end string mark (i.e. **<VMCK_NEXT_END>**).

```text
<Pipeline output>
<VMCK_NEXT_BEGIN>
Test 1....0              ---|
.                           |
.                           |
.                           |   This will be the feedback for the student assignment.
Test n...0                  |
                            |
    Total 0/100          ---|
<VMCK_NEXT_END>
<some more Pipeline output>
```

## 5. Check a Submission on Gitlab

To check the pipeline of a certain student, go to the assignment's private repository on GitLab. From the menu on the left select **Repository** &rarr; **Branches**. Every student submission has a separate branch of the following format `${username}-${year}-${month}-${day}-${hour}-${minute}-${second}-${uuid}`. Using the search bar, look for the desired submission.

![branches](https://user-images.githubusercontent.com/24795454/165287222-68f7bd0d-1622-4b43-b268-e04a5cd3cd75.png)

To check the user code click on the branch name and check the **src** folder.

If you want to see the pipeline output, click on the pipeline status icon.

![pipeline_select](https://user-images.githubusercontent.com/24795454/165287255-b50a7fef-b37d-4df8-9fd8-9cc73e8ea827.png)

Next, click on **Jobs** and select the first job ID.

![jobs](https://user-images.githubusercontent.com/24795454/165121389-9f554fb3-9e23-4923-87cc-5177f91295ec.png)
