# VMchecker Infrastructure setup guide

## Setting up the environment

There are two types of setups for VMchecker, the first one is concentrated on
using Moodle as a frontend for homework checking. The second one user our own
vmchecker UI to store homework results and parse requests that will be sent to
the VMchecker backend.

### Moodle setup

The Moodle setup needs the following components:
* a Moodle instance where the homeworks are uploaded
* the VMchecker block plugin that will get attached to an assignment
* a GitLab instance that will receive the homework and start a pipeline based on
  it
* a GitLab runner accessible from the GitLab instance that is registered to a
  group or for the whole GitLab instance

To have a baseline for the Moodle setup, we will be using the [container
templates](https://gitlab.cs.pub.ro/vmchecker/container-templates) git
repository.

#### Starting the infrastructure

From here, we are able to study the `docker-compose.yml` file provided in the
`moodle` directory contains the necesary components to seutp a Moodle instance
together with the VMchecker backend, and a GitLab Runner.

To start up the infrastructure, you will have to run the following command in
the `container-templates/moodle` directory:
```
source .env ; docker-compose -f ./docker-compose.yml -p vmchecker-test up
```

The Moodle instance will have started when the `** Starting Apache **` message
displayed on you screen.

To connect to the Docker based Moodle you will have to open Firefox and connect
to the `localhost` address. To login use the `user/bitnami` user and password.

Once connected we need to import the VMchecker block plugin.

#### Installing the plugin

VMChecker Next is a block type plugin for Moodle, as such the instalation directory of this plugin is `<moodle_root>/blocks/`. The name of the from Moodle's perspective is  and the sources of this plugin must reside in `<moodle_root>/blocks/vmchecker`.

Currently, the plugin can only be downloaded from Github, with the prospect of adding it to the Moodle plugin repository.

The source code for the plugin can be found at [vmchecker-next](https://github.com/Jokeswar/vmchecker-next). Simply download the archive with the source code (go to Code -> Download ZIP).

##### Option 1: Install through Moodle UI

As an Admin user go to Site Administration -> Plugins -> Install plugins. Upload
the archive with the source files and press `Install plugin from the ZIP file`.
A summary page will be presented, which on successful validation of the arhcive
will allow you to install the plugin. Simply click continue and then follow the
steps described in the Plugin configuration section.

##### Option 2: Install using the CLI

Simply extract the archive in a tmp folder and rename the extracted folder to
`vmchecker`.
```bash
unzip vmchecker-next.zip /tmp
mv /tmp/vmchecker-next /tmp/vmchecker
```
Now, move the source folder to the Moodle installation directory inside the
`blocks` subfolder.
```bash
mv /tmp/vmchecker "${moodle_root_folder}/blocks
```

#### Plugin configuration

After the plugin sources are added, on the next login of the admin user, a prompt, asking if you want to install the new plugin, will appear. Next, you will be asked to upgrade the database, the Admin user will be asked to configure the newly installed **vmchecker** plugin.

Currently there are 2 configurations that must be setup:
- **vmck backend** - The backend URL, to which requests for checking submissions are made. Currently it should be set to `http://backend:8000/api/v1/`
- **Submissions check count** - It indicates how many submissions should be checked on each cron call. This is to make sure that the checking of submissions does not take longer than a minute (the usual cron interval). The default value is `50`, but it can be lowered if there are valid conerns of the plugin acaparating then entire cron job (it is left to the discretion of the admin).

**NOTE**: Because we are running in a testing environment, and Moodle is set up
for security hardening, we have to allow Moodle to connect to the backend
server in an unsecure manner. To do this we have to access `Site administration
General > HTTP security` and delete the 172.16.0.0/12 line from `cURL blocked
host list` and we have to add port 8000 to the `cURL allower port list`.
