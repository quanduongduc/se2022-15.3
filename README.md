# SE2022-15.3 : Salyr

[![deploy status](https://github.com/quanduongduc/se2022-15.3/actions/workflows/deploy.yml/badge.svg)](https://github.com/quanduongduc/se2022-15.3/actions/workflows/deploy.yml)
[![test status](https://github.com/quanduongduc/se2022-15.3/actions/workflows/test.yml/badge.svg)](https://github.com/quanduongduc/se2022-15.3/actions/workflows/test.yml)
[![Coverage](https://codecov.io/gh/quanduongduc/se2022-15.3/branch/main/graph/badge.svg?token=WOIN4CS7K0)](https://codecov.io/gh/quanduongduc/se2022-15.3)

Salyr is a music streaming web application developed and deployed based on **_CI/CD_**, **_containerization technology_**, **_cloud computing_**, and nodejs. This project focuses on optimal development progress and application quality

Living Site : <https://salyr.online> :notes:

## Requirements

1. Docker
2. AWS Services: EC2, S3
3. Nodejs
4. Visual Studio Code (Recommend, optional)

## Download

[Download here](https://github.com/quanduongduc/se2022-15.3/releases/tag/v0.0.1) to access a stable version.

Warning: clone project or fork is not recommended if you do not want to contribute to this project

This project is containerized by docker, so **docker-compose up** to run the project.

## Deployment

This section describes how project is deployed through the internet, which is not shown anywhere in the source code.

### Deployment Diagram

The following diagram describes deployment of our project

![deployment-view](https://user-images.githubusercontent.com/59951771/218686425-9e81ff5f-f873-4b4c-a8ba-7dc4e3ce0688.png)


### Components

| No  | Name             | Description                                                                                             |                  |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------- | ---------------- |
| 1   | Cloudflare       | NameServer and mostly for achieving https connection                                                    | Cloudflare       |
| 2   | Nginx            | Web server. Because of same hosting, nginx is also used as a reverse proxy between backend and frontend | Docker Container |
| 3   | Backend          | NodeJs REST API                                                                                         | Docker Container |
| 4   | frontend         | nginx inside container serve built files from reactjs framework                                         | Docker Container |
| 5   | MongoDB database | MongoDB database                                                                                        | Docker Container |
| 6   | S3               | Object Storage from AWS service                                                                         | AWS Service      |

All the above Docker Containers are deployed in the same cloud server (AWS EC2).

## CI/CD PipeLine

Project's CI/CD pipeline is implemented using github actions.

### CI/CD Diagram

<img width="1164" alt="ci-cd-diagram" src="https://user-images.githubusercontent.com/59951771/218251844-45ccbf5b-85a6-4038-bd63-9f28ca79b0e9.png">

### CI Workflow

CI Workflow will be triggered when pushing code to [frontend branch](https://github.com/quanduongduc/se2022-15.3/tree/frontend) or [backend branch](https://github.com/quanduongduc/se2022-15.3/tree/backend)

Workflow  step :

1. Create MongoDB Test Database
2. Install Dependencies
3. Perform Test by JEST
4. Upload Test Coverage To CodeCov

When a Pull request is opened, CodeCov bot will comment Coverage information into it.

Pull requests must be reviewed by at least one contributor after merging into [main branch](https://github.com/quanduongduc/se2022-15.3/tree/main).

### CD WorkFlow

CD Workflow will only be triggered when pushing(merging) code to [main branch](https://github.com/quanduongduc/se2022-15.3/tree/main)

There are two main steps in CD Workflow :

- Build : Build docker images then push them to image registry(AWS ECR for our project)

- Deploy : Deploy to server
  1. Use SSH to Remote Server
  2. Install required packages (docker, aws cli, ... )
  3. fetch code from [deploy branch](https://github.com/quanduongduc/se2022-15.3/tree/deploy) and fill in env-files with environment variables stored in [actions secrets](#actions-secrets). This branch is only for deployment.
  4. Pull docker images from the registry
  5. Run containers

### Actions Secrets

There are some project configs, and environment files which stored in github actions secrets For security reasons.

| No  | Name                  | Description                                             |
| --- | --------------------- | ------------------------------------------------------- |
| 1   | AWS_ACCESS_KEY_ID     | AWS access key associated with an IAM user or role.     |
| 2   | AWS_SECRET_ACCESS_KEY | Specifies the secret key associated with the access key |
| 3   | AWS_PRIVATE_KEY       | Server SSH Key, Could use Amazon EC2 key pairs for this |
| 4   | HOSTNAME              | SSH HOSTNAME                                            |
| 5   | USERNAME              | SSH USERNAME                                            |
| 6   | BACKEND_ENVS          | Environment variables of backend                         |
| 7   | GLOBAL_ENVS           | Environment variables of entire project                  |

Secrets **No 1 to 5** are used for initiating SSH connection to the server.

## Directory structure

- `.github/workflows`: Github Actions workflow files
- `backend`: Backend Nodejs REST API
- `frontend`: Frontend React
- `nginx`: Contains Nginx config file

### Files

- `docker-compose.yml`: The Compose file used in the development environment
- `docker-compose.production.yml`: The Compose file used in deployment environment. This file seems to be redundant in this branch as [deploy branch](https://github.com/quanduongduc/se2022-15.3/tree/deploy) has its own docker-compose.production file. We are considering removing this file.
- `example.env`: list all global environment variables (not contain value), which will use in docker-compose files
- `/backend/example.env`: list all backend environment variables (not contain value), some variables are the same as global env

## UseCase

![218251702-25c6439e-d8cd-4d40-a1b0-2c7f1890adfd](https://user-images.githubusercontent.com/59951771/218302384-f2e52f43-5578-418f-b0ce-d8017374fb81.png)

## Features

- APIs : check all implemented APIs [here](https://github.com/quanduongduc/se2022-15.3/blob/main/backend/readme.md)
- Application Features :
  - REGISTRATION AND LOGIN AUTHENTICATION
  - MUSIC SEARCH BY NAME AND ARTIST
  - MUSIC PLAYER
  - FAVOURITE MUSIC
  - PERSONAL MUSIC PLAYLIST

## Project Notes

- **Err** output of workflow is not an actual error. It seems to be a confusing log from [ssh action](https://github.com/appleboy/ssh-action). [More information](https://github.com/appleboy/ssh-action/issues/110). [#14](https://github.com/quanduongduc/se2022-15.3/issues/14)
- For anyone who wants to contribute to the CD process: Cloud Server's OS is Ubuntu Server 22.04 LTS (HVM)(64-bit (x86))

## Future Works

- Integrate code quality analysis tool into project.
- Change deployment architecture to Per components per host.
- Optimize page load time.
- Implement more APIs.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch
3. Commit your Changes
4. Push to the above Branch
5. Open a Pull Request

## Credits

- [Docker Tutorials](https://www.youtube.com/watch?v=3c-iBn73dDE&t=5017s)
- [GitHub Actions Cheat Sheet](https://resources.github.com/whitepapers/github-actions-cheat/?fbclid=IwAR1PLAzai7XJiKhLlEyqymH3vJPSB1elpMqp4J2HKNrzyfsTUDJ0cVSPRp8)
- [Build and push Docker images](https://github.com/marketplace/actions/build-and-push-docker-images?fbclid=IwAR2ah4D8RGUDwwd6B0lxpEscDzQTjC4_7Zphd8NsZjokuB_7NmjlCm1ZmeI)
- [GitHub Actions Tutorial](https://www.youtube.com/watch?v=R8_veQiYBjI)
- Music data used in application is crawled from zingmp3.

## Acknowledgments

- Special thanks to Mr.Freddie Nguyen for the Software Engineering courses
- Thanks also to Mr.Thanh Le for guiding us in this project
- Many thanks to youtubers, and developers on the internet for tutorials and tech
- Thanks to [@quanduongduc](https://github.com/quanduongduc) for leading team to complete this project
- Thanks to [@nguyennghia1209](https://github.com/nguyennghia1209) for designing and implementing application's frontend
- Thanks to [@manhhus](https://github.com/manhhus) for massive testing works, finding and fixing bugs, application ideas, and improving UI/UX
