# SE2022-15.3 : Salyr

Salyr is a music streaming web application developed and deployed based on CI/CD, containerization technology, cloud computing, and nodejs.

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

The following diagram describe deployment of our project

![deployment-view](https://user-images.githubusercontent.com/59951771/218251843-77aac474-234a-45a5-8f68-0c9ef32a3c66.png)

### Component

| No  | Name             | Description                                                                                             |                  |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------- | ---------------- |
| 1   | Cloudflare       | NameServer and mostly for achieving https connection                                                    | Cloudflare       |
| 2   | Nginx            | Web server. Because of same hosting, nginx is also used as a reverse proxy between backend and frontend | Docker Container |
| 3   | Backend          | NodeJs REST API                                                                                         | Docker Container |
| 4   | frontend         | nginx inside container serve built files from reactjs framework                                         | Docker Container |
| 5   | MongoDB database | MongoDB database                                                                                        | Docker Container |
| 6   | S3               | Object Storage from AWS service                                                                         | AWS Service      |

All above Docker Containers are deployed in a same cloud server (AWS EC2).

## CI/CD PipeLine

Project's CI/CD pipeline is implemented using github actions.

### CI/CD Diagram

<img width="1164" alt="ci-cd-diagram" src="https://user-images.githubusercontent.com/59951771/218251844-45ccbf5b-85a6-4038-bd63-9f28ca79b0e9.png">

### CI Workflow

CI Workflow will be triggered when pushing code to [frontend branch](https://github.com/quanduongduc/se2022-15.3/tree/frontend) or [backend branch](https://github.com/quanduongduc/se2022-15.3/tree/backend)

Workflow's step :

1. Create MongoDB Test Database
2. Install Dependencies
3. Perform Test by JEST
4. Upload Test Coverage To CodeCov

When a Pull request opened, CodeCov bot will comment Coverage information into it.

Pull requests must be reviewed by at least one contributor after merging into the main branch.

### CD WorkFlow

CD Workflow will only be triggered when pushing(merging) code to [main branch](https://github.com/quanduongduc/se2022-15.3/tree/main)

There are two main steps in CD Workflow :

- Build : Build docker images then pushing them to registry(AWS ECR for our project)

- Deploy : Deploy to server
  1. Use SSH to Remote Server
  2. Install required packages (docker, aws cli, ... )
  3. fetch code from [deploy branch](https://github.com/quanduongduc/se2022-15.3/tree/deploy) and fill in env-files with env store in actions secret. This branch is only for deployment.
  4. Pull docker images from the registry
  5. Run containers

### Actions Secrets

There are some project configs, enviroment files which stored in github actions secret For security reasons.

| No  | Name                  | Description                                             |
| --- | --------------------- | ------------------------------------------------------- |
| 1   | AWS_ACCESS_KEY_ID     | AWS access key associated with an IAM user or role.     |
| 2   | AWS_SECRET_ACCESS_KEY | Specifies the secret key associated with the access key |
| 3   | AWS_PRIVATE_KEY       | Server SSH Key, Could use Amazon EC2 key pairs for this |
| 4   | HOSTNAME              | HOSTNAME Of server                                      |
| 5   | USERNAME              | server's USERNAME                                       |
| 6   | BACKEND_ENVS          | Enviroment variables of backend                         |
| 7   | GLOBAL_ENVS           | Enviroment variables of entire project                  |

Secrets **No 1 to 5** are used for initiating SSH connection to the server.

## Directory structure

## UseCase

## Application Features

## Project Notes

## Future Works

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch
3. Commit your Changes
4. Push to the the above Branch
5. Open a Pull Request

## Acknowledgments
