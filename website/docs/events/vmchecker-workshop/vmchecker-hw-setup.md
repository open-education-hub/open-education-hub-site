# VMchecker TA guide for homeworks

## 1. Introduction

VMchecker next is a new type of homework testing environment. It makes it so a student and a teacher can both use the same infrastructure in order to test homework with minimal input.

When you want to add a new assignment to VMchecker next you will need to have the following components ready:

* a private assignment repository, based on which the homework will be tested. This repository will have to remain private, as assignments are tested by creating a new branch for each submission through Moodle;
* a public repository that is a mirror of the private repository which can be forked privately by students in order to test their homework using the same scripts and containers as on Moodle;
* a Moodle assignment where students will have to upload their homework;
* a Moodle VMchecker block where TAs can configure the plugin that controls homework checking.

## 2. Gitlab Setup

The private and public repositories must have the following structure:

```
├── checker/
│   ├── checker.sh
│   ├── input/
│   │   ├── test0
│   └── output/
│       ├── test0.ref
├── Dockerfile
├── .gitlab-ci.yml
├── local.sh
└── src/
    └── skel.c
```

It is recommended to fork https://gitlab.cs.pub.ro/vmchecker/vmchecker-next-assignment for a faster start.

A typical assignment will have the above structure with the following files and folders of interest to teaching assistants:
- **src/** - Here the student will develop their solution according to the assignment's specification. Here, you can add a skeleton for the assignment.
- **local.sh** - A utility script used to check the assignment locally. It simulates a Gitlab pipeline.
- **Dockerfile** - Used to build the docker image for the Gitlab pipeline. The following is an example that should satisfy most cases:
```
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
```
              Total:100/100
              Total:    0/100
Total:50/100
```
Invalid format:
```
              Total: 55.37/100       # the grade will be set as 55, not 55.37 on Moodle
```

**NOTE**: You will need to generate a [project access token](https://docs.gitlab.com/ee/user/project/settings/project_access_tokens.html#create-a-project-access-token) that will allow VMChecker to access Gitlab's API. You will need to give the token acces to `api`, `read_api`, `read_registry`, `write_registry`, `read_repository`, `write_repository`. Also, the project ID for the private repository is needed.

#### First changes needed ###

1. Change the `DEFAULT_IMAGE_NAME` with the name of the public repository of your homework in the format `groupname/projectname`. This variable is found in the [`local.sh` script](https://gitlab.cs.pub.ro/vmchecker/vmchecker-next-assignment/-/blob/master/local.sh#L12)
2. Change the image used to the same name set as above in the `.gitlab-ci.yml` file on [line 29](https://gitlab.cs.pub.ro/vmchecker/vmchecker-next-assignment/-/blob/master/.gitlab-ci.yml#L29)

### 2.1. Disable Merge Requests for the public repository

To avoid the possibility of students accidentally sharing their solution, **Merge Requests** for the public repository must be disabled. To do that:
1. Go to your public project page
2. On the left panel under **Settings** select **General**
3. Under the **Visibility, project features, permissions** disable **Merge Requests**.

![mr_disable](https://user-images.githubusercontent.com/24795454/170046159-4a45db7a-1a52-48d1-905f-662d0287badf.png)

### 2.2. Set up a CD pipeline for the checker image

In **.gitlab-ci.yml** set the image name for the **checker** step to **registry.gitlab.cs.pub.ro/\<group-name\>/\<project-name\>:\<tag\>** (e.g: gitlab.cs.pub.ro:5050/ASC/TEMA-3-Public:latest).

#### 2.2.1. Build the checker image using Gitlab Pipelines

Set up the **BUILD_DOCKER_IMAGE** [pipeline environment variable](https://docs.gitlab.com/ee/ci/variables/#add-a-cicd-variable-to-a-project) to **true** for your public repository. Each time a new commit is made to the repository a new Docker image build will be triggered. The image will be uploaded to Gitlab's own Docker registry.

#### 2.2.2. Build the checker image manually

```bash
./local.sh docker build
./local.sh docker push --user "$GITLAB_USERNAME" --token "$GITLAB_ACCESS_TOKEN"
```

To create a **GITLAB_ACCESS_TOKEN** access token follow the [documentation on Gitlab](https://docs.gitlab.com/ee/user/packages/container_registry/#authenticate-by-using-gitlab-cicd).

For more information on **local.sh** run ```./local.sh -h```.

### 2.3. Find the project ID

1. Go to your project page
2. The ID is found under the project name

![project_id](https://user-images.githubusercontent.com/24795454/163970448-e4e47e5e-7739-4d09-a60b-b621ed5a0e33.png)

## 3. Moodle Setup

First, set up a Moodle [assignment](https://docs.moodle.org/311/en/Assignment_activity) with the following additional settings:
- Submission types &rarr; Submission types &rarr; File submissions
- Submission types &rarr; Maximum number of uploaded files &rarr; 1
- Submission types &rarr; Maximum submission size &rarr; 50kb (The **maximum** submission size of VMChecker Next is **10 MB**)
- Submission types &rarr; Accepted file types &rarr; zip
- Feedback types &rarr; Offline grading worksheet &rarr; true (enables feedback download)

Next, add a new VMChecker block on the current page by clicking on **Add a block** and selecting **VMChecker block** from the list.

![add_block](https://user-images.githubusercontent.com/24795454/164005615-a502d467-887a-40b9-8bd9-9a5a473a2f76.png)

Click on the gear and select **Configure VMChecker block**. Here you must fill in a couple of options for the **VMChecker settings** header:
- Enable autograding of submissions - If you want the assignment to be automatically graded with the mark from the checker
- Gitlab repository ID - The [project ID](#21-find-the-project-id) of your private repository
- Gitlab [private token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token) - The previously generated private access token
- Gitlab branch - The parent branch name from which student branches will have their changes merged and tested in the private repository
- Assignment - From the list select the assignment you want VMChecker to manage

**WARNING**: There is a one-to-one relationship between an assignment and a VMChecker block. Make sure there is **only one** VMChecker block per assignment.

Save!

## 4. Test your assignment

After the setup is done, switch to the student test account and upload your submission. After a couple of minutes, your submission will run on the Gitlab CI. You can check your [private repository](#53-check-a-submission-on-gitlab). When the pipeline is finished the trace will be set as feedback for your assignment. If autograding is enabled, your submission will also be marked.


**NOTE**: On Moodle, the feedback string will be computed from the trace found on the Gitlab pipeline, and will be the first 300 lines of the content between the start of the checker string mark (i.e. **<VMCK_NEXT_BEGIN>**) and the end string mark (i.e. **<VMCK_NEXT_END>**).
```
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

## 5. Grading an assignment

### 5.1. Download all submissions

1. Go to the course page on Moodle
2. Click on the assignment
3. Click on the gear and from the drop-down select **Download all submissions**

![download_all](https://user-images.githubusercontent.com/24795454/165136031-2bfaa0b1-4cdd-46e8-bd72-45435235e2e2.png)

**NOTE**: If you do not have permission, the assignment page will show the upload form only.

### 5.2. Download grading worksheet

1. Go to the course page on Moodle
2. Click on the assignment
3. Click on **View all submissions**
4. From grading action select **Download grading worksheet**

![download_worksheet](https://user-images.githubusercontent.com/24795454/165139873-eb8bc93f-9814-43a7-a926-83c1d0320ccb.png)

**NOTE**: You can grade submissions and give feedback in the downloaded CSV.

### 5.3. Check a submission on Gitlab

To check the pipeline of a certain student, go to the assignment's private repository on Gitlab. From the menu on the left select **Repository** &rarr; **Branches**. Every student submission has a separate branch of the following format ```${username}-${year}-${month}-${day}-${hour}-${minute}-${second}-${uuid}```. Using the search bar, look for the desired submission.

![branches](https://user-images.githubusercontent.com/24795454/165287222-68f7bd0d-1622-4b43-b268-e04a5cd3cd75.png)

To check the user code click on the branch name and check the **src** folder.

If you want to see the pipeline output, click on the pipeline status icon.

![pipeline_select](https://user-images.githubusercontent.com/24795454/165287255-b50a7fef-b37d-4df8-9fd8-9cc73e8ea827.png)

Next, click on **Jobs** and select the first job ID.

![jobs](https://user-images.githubusercontent.com/24795454/165121389-9f554fb3-9e23-4923-87cc-5177f91295ec.png)

### 5.4. Import grades

1. Go to the course page on Moodle
2. Click on the assignment
3. Click on **View all submissions**
4. From grading action select **Upload grading worksheet**

![upload_worksheet](https://user-images.githubusercontent.com/24795454/165139881-5fcc1496-1cf4-4fa7-bf32-4cf14d3108d6.png)

5. Upload the worksheet downloaded previously
6. After you preview the changes click **Confirm**

## 6. VMChecker block

### 6.1. Recheck submission for ...

In the VMChecker block for the desired assignment select **Recheck submission for ...**, as action. Search in the list for the student, you can use the search bar for a faster lookup. Finally press **Run action**.

**NOTE**: Only students that have submitted their assignments will be found on the list.

![recheck_for](https://user-images.githubusercontent.com/24795454/165276403-5577d4cd-9f96-4f06-88a9-92b0a203de01.png)

### 6.2. Recheck all

In the VMChecker block for the desired assignment select **Recheck all submissions**, as action, and press **Run action**. All students that have submitted their homework will have their last submission rechecked.

![recheck_all](https://user-images.githubusercontent.com/24795454/165276413-04b24be0-f91e-4ad6-a668-f3e9bfdfa20d.png)
