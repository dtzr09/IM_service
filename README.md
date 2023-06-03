# FullStack IM_Service (Tiktok Immersion Program)

# Contents:
1. [Assignment Overview](#introduction)
2. [Setting Up](#settingup)
3. [Usage](#usage)
4. [How It Works](#work)
5. [Performance Testing](#performance)
6. [Possible Improvments](#improvement)

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

## Request Processing and Validation Flow <a name="work"></a>
### Send Request
The request body undergoes a series of validation check.
1. Ensure no empty field.
2. All whitespaces were removed for the fields `chat` and `sender`.
3. The field `chat` has to be in the format of `a:b`.
4. The `sender` must be part of the `chat`.

Once all validation pass, the values will be inserted in sorted order and in lowercase. E.g. If the `chat` is `John:doe`, the values inserted will be `john:doe`.

### Pull Request
The request body undergoes a series of validation checks.
1. Ensure `chat` field is not empty.
2. The field `chat` has to be in the format of `a:b`.
3. If the `limit` is not defined or is `0`, it will be set to the default value of `10`.
4. The `chat` field is transformed to lowercase.

The query being made to the database will be 1 more than the given limit to retrieve the `sendtime` of the next message.

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
Request Body (100 words in `text`):
```bash
{
    "chat": "john:doe",
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque purus nisi, aliquam at tincidunt ac, pellentesque eget est. Sed suscipit faucibus eros, sit amet dapibus mi mattis ac. Vestibulum facilisis tellus sapien, eget euismod nisi condimentum in. Aenean tempus pulvinar nisl id varius. Aenean massa felis, vestibulum vitae tempus vel, euismod vel ante. Morbi a condimentum ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed id nisi metus.Integer interdum, eros vel condimentum convallis, tortor lacus auctor dolor, vitae elementum lorem mi vel nulla. Nunc euismod congue tincidunt. Nullam tortor sapien, dapibus eu blandit sed, tempus ac.",
    "sender": "john"
}
```
- At 50 qps:
  ![Screenshot 2023-06-03 at 8 54 33 PM](https://github.com/dtzr09/IM_service/assets/66049247/d037e03a-1183-441a-9320-54942d32bb54)
  - **The average response time is 4ms.**
- At 1000 qps:
  ![Screenshot 2023-06-03 at 8 52 14 PM](https://github.com/dtzr09/IM_service/assets/66049247/159f8202-b8b2-4d41-afb8-d52f74c525d6)
  - **The average response time is 6ms.**
- At 5000 qps:
  ![Screenshot 2023-06-03 at 4 34 40 PM](https://github.com/dtzr09/IM_service/assets/66049247/1493ad2a-66dd-43c7-b1f1-085e085764b2)
  ![Screenshot 2023-06-03 at 9 41 16 PM](https://github.com/dtzr09/IM_service/assets/66049247/209828c9-c346-4eaf-bba9-8b3293f65c76)
  - **The average response time is 4ms but it ran out of memory at around 40k threads.**


#### (b) Pull Request
Queries used:
![Screenshot 2023-06-03 at 4 38 35 PM](https://github.com/dtzr09/IM_service/assets/66049247/7980896b-5a7f-48c6-ae3b-e1974efaad2a)

- At 50 qps:
  ![Screenshot 2023-06-03 at 9 48 29 PM](https://github.com/dtzr09/IM_service/assets/66049247/ad0963b0-9668-4b53-8ada-70c0f4a2a9ef)
  - **The average response time is 10ms.**

- At 150 qps:
  ![Screenshot 2023-06-03 at 9 47 35 PM](https://github.com/dtzr09/IM_service/assets/66049247/313fc2dc-f731-4a6b-98d9-81da3a4a2b7f)
  - **The average response time is 9ms.**
  
- At 500 qps:
  - ![Screenshot 2023-06-03 at 9 50 54 PM](https://github.com/dtzr09/IM_service/assets/66049247/1324a399-9490-4c43-b646-1f66c5ffa38c)
  - **The average response time is 256ms.**
  - The thread stops at rouhgly 4.6k and has an error of `Too many connections.`

## Possible Improvements <a name="improvements"></a>
1. Allow messages to have paragraphing
2. Ensure that username is unique
3. Scaling can be done with kubernetes to distribute the traffic for http requests.
    - I have tried scaling with kubernetes but I am not able to resolve the rpc-server connection to mysql. 
