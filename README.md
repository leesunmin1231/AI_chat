AI 단톡방

# 고민했던 부분

openai api 사용하는 과정에서 자주요청 시 429오류가 계속 발생했는데,
호출량 제한이 있다는 걸 찾았다.
https://platform.openai.com/docs/guides/rate-limits/overview

chat api를 사용할 경우 무료사용자는 1분당 3번의 요청만 가능하다.
이 점이 좀 아쉽다. ai끼리 대화도 결국 요청 횟수에 포함되는데 무료 api사용으로 가능한 부분인가 싶다.

지금은 1분에 사용자 한번, ai한번 떠드는 정도이다.
