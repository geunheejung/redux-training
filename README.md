# Redux 트레이닝

### 2018.04.28 시작
https://egghead.io/lessons/react-redux-the-single-immutable-state-tree

### 2018.05.08 1회 완주


#### 1강
arrow function으로 action 코드 단축시킴

#### 2강
redux store의 2번째인자는 Store의 구조를 정해줄수있음.
ex)

createStore(
    rootReducer,
    {
        title: ‘genie’,
        name: ‘gg’,
    }
);

store.getState();
{
        title: ‘genie’,
        name: ‘gg’,
}


이처럼 초기값 설정 가능

#### 3강
기존에는 페이지 리프레쉬할 경우 데이터가 다시 초기화되어서 매번 todo를 다시 작성해야하는 문제가 있었음.
이러한 문제를 해결하기 위해 스토어의 초기값을 localStorage로 셋팅함.

이때 localStorage에 대해 get,set용 모듈을 만들었는데 여기서 쓰이는 방법이 신기함.

Redux의 데이터를 저장할때는 Javascript의 JSON.stringfy를 이용해서 text로 저장하고,
반대로 localStorage에서 데이터를 꺼내올때는 text type으로 저장된 localStorage 데이터를 다시
JSON.parse()를 이용해서 Object로 파싱해서 사용함.

##### todoData localStorage에서 끄내올때

```
    export const loadState = () => {
      try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
          return undefined;
        }
        return JSON.parse(serializedState);
      } catch (err) {
        return undefined;
      }
    };

```


##### todoData localStorage에 저장할 떄
```
    export const saveState = (state) => {
      try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
      } catch (err) {
        // Ignore write errors.
      }
    };
```

그리고 Redux Store의 메서드중 하나인 store.subscribe()를 사용해서 saveStore()를 콜백으로 넣어줌으로써
Redux의 데이터가 변할 때 마다 실행되게 함.

```
    store.subscribe(() => {
      saveState({
        todos: store.getState().todos
      })
    })

```

이러면 매번 데이터가 변할 때 마다 localStorage에 Store 상태값을 저장하는데 저장할 때 마다 JSON.stringfy()메서드가 호출되기 때문에 이는 값비싼 기능임으로 성능에 문제가 있음.

그래서 데이터를 다룰때 사용되는 라이브러이인 lodash의 throttle() 를 한번 더 감싸준 다음 2번째 인자로 ms를 받는데 ms값을 1초로 정해줘서 데이터가 실시간으로 변해도 1초 간격으로 localStorage에 데이터를 저장하게 리팩토링함.

```
    store.subscribe(throttle(() => {
      saveState({
        todos: store.getState().todos
      })
    }, 1000 ))

```



