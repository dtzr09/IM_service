# FullStack IM_Service (Tiktok Immersion Program)

# Contents:
1. [Assignment Overview](#introduction)
2. [Setting Up](#settingup)
3. [Usage](#usage)
4. [Performance Testing](#performance)

## Assignment Overview <a name="introduction"></a>
#### Assignment
Design and implement a backend Instant Messaging system.

#### Overview:
In this assignment, you will design and develop an IM system implementing a set of specific APIs using Golang. You need only develop the backend side of the system, focusing on core message features without the front-end part and the account/authentication part.

#### Requirements:
1. **Architecture**: 
    - The system should contain two services: one HTTP server and one RPC server. The IDL of HTTP API is provided below. The RPC IDL is not restricted, but you can also get an example from the demo repository.
3. **Data storage**: 
    - The system should store messages data. Receivers can access this data at any time. At least one database must be used (MySQL or Redis are recommended). There is no limitation on data schema design.
5. **Message delivery**: 
    - The system should be able to deliver messages to the intended recipients by PULL mode in a timely and consistent manner. Pull mode means there is no need to maintain the connection and push new messages to receivers in real-time. Only the pull API must be implemented, so the receiver can use pull API to fetch messages.
7. **Performance and scalability**: 
    - The system should be designed to handle a relatively large number of users and messages. (Support more than 20 concurrency in testing)

## Setting Up <a name="settingup"></a>

![Screenshot 2023-06-03 at 4 33 59 PM](https://github.com/dtzr09/IM_service/assets/66049247/5ac5a6fd-76be-4632-92a1-cb2c38e6fcb0)

### Backend
1. ```bash
   docker-compose up --build
   ```
    - 4 containers should be running:
      1. etcd : 2379
      2. mysql : 3306
      3. rpc-server : 8888
      4. http-server : 8080
    - **mysql** is used as I considered the possiblily of making it more fullscale with the creation of chatgroups and authentication etc, which having a relational database might make it easier.
 2. If you want to connect to the database:
      1. Download MySQL Workbench
      2. Make a new connection
         ![Screenshot 2023-06-03 at 3 21 15 PM](https://github.com/dtzr09/IM_service/assets/66049247/815c44b1-6c60-45ec-ad02-7a7df8cabb50)
          - username: **user06**
          - password: **password**
### Frontend (Optional)
1. ```bash
   cd im-service
   ```
3. ```bash
   npm i
   ```
5. ```bash
   npm run dev
   ```
   
## Usage <a name="usage"></a>
### Postman
You can import the file `http_server.postman_collection.json` into postman for the API request

### With Frontend
A simple frontend to simulate the sending and retrieving of messages.

![Screenshot 2023-06-03 at 3 43 08 PM](https://github.com/dtzr09/IM_service/assets/66049247/ea905711-e7b1-484c-aeb7-6c555023ccad)

You can open up two terminals with different avatar and simulate the sending and receiving of message between the two avatars.

## Performance Testing <a name="performance"></a>
### Requirement
- Jmeter has to be installed
  - Using homebrew:
    ```bash
    brew install jmeter
    ```
- To open up Jmeter, open a new terminal and type in `jmeter`

### Load and Stress Testing
- Load and stress testing were performed for both the Pull and Send request.
#### (a) Send Request
- At 50qps:
  ![Screenshot 2023-06-03 at 4 12 51 PM](https://github.com/dtzr09/IM_service/assets/66049247/3d313208-6eb4-44c2-8a49-69dfa2ffac3b)
  - **The average response time is 5ms.**
- At 1000qps:
  ![Screenshot 2023-06-03 at 4 14 27 PM](https://github.com/dtzr09/IM_service/assets/66049247/3ea95de8-7912-4a01-9480-b7921bbe6143)
  - **The average response time is 9ms.**
- At 5000qps:
  ![Screenshot 2023-06-03 at 4 34 40 PM](https://github.com/dtzr09/IM_service/assets/66049247/1493ad2a-66dd-43c7-b1f1-085e085764b2)

  ![Screenshot 2023-06-03 at 4 34 28 PM](https://github.com/dtzr09/IM_service/assets/66049247/b31d9033-ddc9-4da2-9e83-f878ba03dab0)
  
  - **The average response time is 4ms but it ran out of memory at around 40k threads.**


#### (b) Pull Request
Queries used:
![Screenshot 2023-06-03 at 4 38 35 PM](https://github.com/dtzr09/IM_service/assets/66049247/7980896b-5a7f-48c6-ae3b-e1974efaad2a)

- At 50qps:
  ![Screenshot 2023-06-03 at 4 39 02 PM](https://github.com/dtzr09/IM_service/assets/66049247/a8f4c1b8-9400-428e-9826-45e8e3821a88)
  - **The average response time is 41ms.**

- At 150qps
  ![Screenshot 2023-06-03 at 6 52 02 PM](https://github.com/dtzr09/IM_service/assets/66049247/1e8e6789-2aae-488c-9a67-c19aa07b8954)
  - **The average response time is 694ms.**
  
- At 200qps

