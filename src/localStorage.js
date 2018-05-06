export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      // 사용자의 브라우저에 로컬스토리지 기능이 꺼져있을 경우에 대비
      return undefined;
    }
    // 직렬화 가능한 텍스트일 경우 이를 객체로 반환 Redux는 일반적으로 직렬화 가능한 상태여야한다.
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    // 객체로온 상태값을 string값으로 변환하여 저장 사용할때는 다시 객체로 변환
    localStorage.setItem('state', serializedState);
  } catch (err) {
    //  Ignore write errors.
  }
}