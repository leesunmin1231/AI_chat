# AI 단톡방

- 배포 URL: https://ai-chat.polarmin.net/

## 구현 결과

|                                                               로그인 페이지                                                               |                                                              방 선택 페이지                                                               | 채팅방 페이지                                                                                                                             |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: | ----------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="416" alt="image" src="https://user-images.githubusercontent.com/81913106/233832523-c72097c3-9864-4a4a-8283-4ae6920d1f52.png"> | <img width="405" alt="image" src="https://user-images.githubusercontent.com/81913106/233832615-6b3d8d31-d91b-49aa-a7ff-bb08b19ae8e9.png"> | <img width="399" alt="image" src="https://user-images.githubusercontent.com/81913106/233832707-7dcd1d6d-3580-4e4e-af35-d7fb4d27e5d0.png"> |

## 고민했던 부분

## open ai 요청

open ai api요청을 어디에서 해야하나 고민이 많았다.

클라이언트 사이드에서 openAI API를 직접 호출하면 요청이 거절된다.

API key는 private하게 관리해야 하는 정보이기 때문에 이를 위한 보안장치를 해둔 거 같다.

이 부분 때문에 Next에서 제공하는 API route를 사용해서 간단한 api를 구축하고 서버에서 open ai 요청을 보내는 방식을 채택했다.

## 데이터 저장

서버에서 open ai 요청을 보내기 때문에 유저 데이터와(API key), 채팅방 정보들도 서버에서 관리했다.

db를 써야할까 고민했는데 애초에 많은 양의 데이터가 아니고 테이블이 그리 복잡한 데이터도 아니라서 json파일 하나를 두고 읽고 쓰는 방식으로 구현했다.

처음에 사용자의 API key를 입력 받아서 API key를 쿠키로 관리하면서 사용자 정보를 체크해야하는데, 이러면 앞서 고민했던 보안 문제가 의미가 없어진다.

쿠키로는 따로 발급한 클라이언트 id를 주고받고, API키는 세션에서 관리했어야 했는데 이부분이 좀 아쉽다.

## 여러명의 ai 대화

처음 계획은 사용자의 응답에 ai들이 대답을 보내면 그중 물음표가 있는 대답들은 다시 요청을 보내 다른 ai가 응답하도록 구현하려 했다.

문제는 openai API 무료버전은 Chat api 요청이 분당 최대 3회이다.

위의 방법대로 구현하면 사용자가 1분동안 보낼수 있는 요청수가 3회보다 더 줄어드는 것이다.

이부분 때문에 원래 코드는 제거 하고 ai끼리 대화 없이 사용자에 대한 응답이 오도록 구현했다. 이부분이 살짝 아쉽다.

분당 3회를 넘어가면 api응답으로 429에러가 오는데, 이 부분은 요청횟수가 너무 많다는 시스템 메시지를 띄워 예외처리 해주었다.
