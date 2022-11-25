# Báo Cáo Tuần 1

Báo cáo những công việc đã thực hiện được trong tuần đầu tiên.

## Tìm Hiểu Về Docker

- Tìm hiểu được cái khái niệm của docker : Image, Container, Registry, Dockerfile, docker compose, networking trong docker

- Thực hiện build image và chạy container, demo bằng một ứng dụng web đơn giản

  - build image và chạy container frontend với [Dockerfile](../frontend/Dockerfile)

    ![Image](images/front-end-build-run.png)
    ![Image](images/front-end-result.png)

  - build image và chạy container backend với [Dockerfile](../backend/Dockerfile)

    ![Image](images/backend-build-run.png)
    ![Image](images/backend-result.png)

  - Sử dụng docker compose để chạy nhiều container [docker-compose file](../docker-compose.yml)

    ![Alt text](images/compose-up.png)
    ![Alt text](images/compose-result.gif)
    Đã có thể gọi api được từ backend.

## Kế Hoạch Cho Các Tuần Tiếp Theo

- Thực hiện deploy thủ công lên server sau đó nghiên cứu github actions để tự động hóa quá trình deploy ([issue #5](https://github.com/quanduongduc/se2022-15.3/issues/5))
- Cả nhóm thống nhất một ứng dụng web thực tế để triển khai.
