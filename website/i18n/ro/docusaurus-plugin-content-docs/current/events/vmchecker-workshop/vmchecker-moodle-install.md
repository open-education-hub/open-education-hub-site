# VMChecker Infrastructure Setup Guide

## Setting Up the Environment

There are two types of setups for VMChecker, the first one is concentrated onusing Moodle as a frontend for homework checking.
The second one uses our own VMChecker UI to store homework results and parse requests that will be sent to the VMChecker backend.

### Moodle Setup

The Moodle setup needs the following components:
* a Moodle instance where the homework are uploaded
* the VMChecker block plugin that will get attached to an assignment
* a GitLab instance that will receive the homework and start a pipeline based on it
* a GitLab runner accessible from the GitLab instance that is registered to a group or for the whole GitLab instance

To have a baseline for the Moodle setup, we will be using the [container templates](https://gitlab.cs.pub.ro/vmchecker/container-templates) git repository.

#### Starting the Infrastructure

From here, we are able to study the `docker-compose.yml` file provided in the `Moodle` directory contains the necessary components to set a Moodle instance together with the VMChecker backend, and a GitLab Runner.

To start up the infrastructure, you will have to run the following command in the `container-templates/moodle` directory:

```bash
docker-compose -f ./docker-compose.yml --env-file ./.env -p vmchecker-test up
```

The Moodle instance will have started when the `** Starting Apache **` message displayed on your screen.

To connect to the Docker-based Moodle you will have to open Firefox and connect to the `localhost` address. To log in use the `user/bitnami` user and password.

Once connected we need to import the VMChecker block plugin.

#### Installing the Plugin

VMChecker Next is a block-type plugin for Moodle, as such the installation directory of this plugin is `<moodle_root>/blocks/`.
The name of the plugin from Moodle's perspective is `vmchecker` and the sources of this plugin must reside in `<moodle_root>/blocks/vmchecker`.

Currently, the plugin can only be downloaded from GitHub, with the prospect of adding it to the Moodle plugin repository.

The source code for the plugin can be found at [vmchecker-next](https://github.com/open-education-hub/vmchecker-next).
Simply download the archive with the source code (go to Code -> Download ZIP).

##### Option 1: Install through Moodle UI

As an Admin user go to `Site Administration > Plugins > Install plugins`.
Upload the archive with the source files and press `Install plugin from the ZIP file`.
A summary page will be presented, which on successful validation of the archive will allow you to install the plugin. Simply click continue and then follow the steps described in the Plugin configuration section.

##### Option 2: Install Using the CLI

Simply extract the archive in a temp folder and rename the extracted folder to `vmchecker`.

```bash
unzip vmchecker-next.zip /tmp
mv /tmp/vmchecker-next /tmp/vmchecker
```

Now, move the source folder to the Moodle installation directory inside the `blocks` subfolder.

```bash
mv /tmp/vmchecker "${moodle_root_folder}/blocks
```

#### Plugin Configuration

After the plugin sources are added, on the next login of the admin user, a prompt, asking if you want to install the new plugin, will appear.
Next, you will be asked to upgrade the database, and the Admin user will be asked to configure the newly installed **vmchecker** plugin.

Currently, there are 2 configurations that must be setup:
- **vmck backend** - The backend URL, to which requests for checking submissions are made.
Currently, it should be set to `http://backend:8000/api/v1/`
- **Submissions check count** - It indicates how many submissions should be checked on each cron call.
This is to make sure that the checking of submissions does not take longer than a minute (the usual cron interval).
The default value is `50`, but it can be lowered if there are valid concerns of the plugin acaparating the entire cron job (it is left to the discretion of the admin).

**NOTE**: Because we are running in a testing environment, and Moodle is set up for security hardening, we have to allow Moodle to connect to the backend server in an unsecured manner.
To do this we have to access `Site administration > General > HTTP security` and delete the 172.16.0.0/12 line from `cURL blocked host list` and we have to add port 8000 to the `cURL allower port list`.

You can continue with setting up an [assignment with VMChecker](./vmchecker-hw-moodle-setup).
