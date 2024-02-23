# Contributing

## Coding Rules

### Structure

#### Component

하나의 컴포넌트의 구조는 아래와 같이 Container/Presentational Pattern으로 구성된다.
단, 기존에 작성된 컴포넌트는 아래 구조를 따르지 않아도 되지만 일관성을 위해 차차 수정하도록 한다.

* 컴포넌트 구성요소
  * `index.jsx`: 컴포넌트의 구성요소를 통합하고 `import` statement를 단순화 시키기 위한 파일
  * `<Component Name>.jsx`: 컴포넌트의 로직과 렌더링을 담당하는 파일
  * `<Component Name>.style.jsx`: 컴포넌트의 스타일링을 담당하는 파일

```
src/
  <Component Name>/
    index.jsx
    <Component Name>.jsx        // Container
    <Component Name>.style.jsx  // Presentation (생략가능)
```

#### `index.jsx`

모든 컴포넌트는 `index.jsx` 파일을 가진다. `index.jsx` 파일은 `create-react-app`에 내장된 Webpack에 의해 `import` 문에서 자동으로 참조된다.
이 기능을 이용하면 어떤 컴포넌트를 `import` 할 때, 해당 컴포넌트를 직접 `import`하지 않고 그 상위 디렉토리를 `import` 하는 것으로 대체할 수 있다.

* `index.jsx`를 사용하지 않는 경우
  다른 컴포넌트에서 `Navigator` 컴포넌트를 `import` 하려면 아래 코드와 같이 작성해야한다.
  해석하자면, `Navigator` 디렉토리 하위에 있는 `Navigator.jsx` 파일에 정의된 `Navigator` 컴포넌트를 `import` 한다는 의미이다.

  ```javascript
  import Navigator from './Navigator/Navigator';
  ```

* `index.jsx`를 사용하는 경우
  `index.jsx`를 하나 추가하면 `import` statement에서 반복되는 `Navigator`를 생략할 수 있다.
  대신, `Navigator/Navigator.jsx` 파일에 있는 컴포넌트 `Navigator`는 반드시 `export default`로 `export` 해야하며  `index.jsx`에 다음과 같은 코드를 추가하여야 한다.

  ```javascript
  export { default } from './Navigator';
  ```

  그리고 다른 컴포넌트에서 `Navigator` 컴포넌트를 `import` 하려면 아래 코드와 같이 작성하면 된다.

  ```javascript
  import Navigator from './Navigator';
  ```

#### 공통 스타일링 파일

여러 컴포넌트에서 공통으로 사용되는 스타일링은 아래와 같이 `src/styles` 디렉토리 하위에 작성하거나, 각자 목적에 맞게 추가 하위 디렉토리를 만들어서 작성한다.

```
src/
  styles/
    staff/
      OrderListControlPanel.style.jsx  // 주문 목록 페이지의 제어 패널의 스타일링
      handlers/
        orderControlPanel/
          Modal.style.jsx  // 유저 클릭 시에만 작동하는 핸들러에서 렌더링되는 모달창의 스타일링
```

#### 예외

* 스타일양이 적은 경우:
  * `<Component Name>.style.jsx` 파일을 생성하지 않고 대신 `<Component Name>.jsx` 파일에 스타일 코드를 작성
* Presentation 컴포넌트가 없는 경우:
  * `<Component Name>/` 디렉토리를 생성하지 않고 대신 `<Component Name>.jsx` 파일에 로직과 렌더링 코드를 작성

### Global Style

전역적 스타일은 `src/styles/Global.style.jsx` 파일에 `styled-components`를 이용하여 작성한다.
이때 작성 내용은 아래 예와 같이 Style Topic에 따라 `css` 함수로 구분하여 작성한다.

* Global Style 파일
  * 파일명: `styles/Global.style.jsx`

```javascript
import { createGlobalStyle } from 'styled-components/macro';

import { FontStyle } from './Font.style';

const GlobalStyle = createGlobalStyle`
  /* 글로벌 스타일 */

  /* ... */

  ${FontStyle}

  /* ... */
`;
```

* Font CSS
  * 파일명: `styles/Font.style.jsx`

```javascript
import { css } from 'styled-components/macro';

export const FontStyle = css`
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/NotoSansKR-Regular.woff2') format('woff2'),
      url('/fonts/NotoSansKR-Regular.woff') format('woff'),
      url('/fonts/NotoSansKR-Regular.otf') format('opentype');
  }
`;
```

### Styled Component

모든 style은 Styled Component를 이용해서 표현한다.

#### `import` Statement

* `styled-component`를 `import` 할 때 스크립트 최상단에 `import styled from 'styled-components/macro';`를 선언한다.
  * 만약 그냥 `import styled from 'styled-components';`를 사용하면:
    * 개발자 도구에서 스타일을 적용한 컴포넌트의 html 태그 class 이름에 랜덤 해쉬값이 표시되기 때문에 디버깅이 상당히 어렵다.

    ![image](https://github.com/mosepeople/searoad-s-web/assets/22609242/2b3fd899-2b97-4aa0-95e9-2df62c2b095e)
  * 이때 `styled-components/macro`를 사용하면:
    * 개발자 도구에서 스타일이 적용된 컴포넌트의 html 태그의 class 이름에 Styled Component 변수명이 표시되므로 빠른 디버깅이 가능해진다.

    ![image](https://github.com/mosepeople/searoad-s-web/assets/22609242/88a3d56c-53a2-4439-b155-33d2689ebe43)

#### Naming

* Styled Component의 이름은 `PascalCase`로 작성한다.
* Styled Component의 이름은 (접두사 `Styled`) + (`HTML Tag`) + (`React Component` 이름(생략 가능))으로 작성한다.
  * 예
    * Navigator로 사용되는 `div` 태그의 Styled Component의 이름: `StyledDivNavigator`
    * 최상위 `button` 컴포넌트의 Styled Component의 이름: `StyledButton`

#### Declaration

* Styled Component의 이름은 각자 하나의 `const` 변수로 선언한다.
* `const`로 선언하면 아래의 이점이 있다
  * Rename이 쉬움
  * 다른 컴포넌트에서 재사용 가능
  * __다른 Styled Component에서 상속 가능__
    * 다른 방식에서는 이 이점을 누리기 어려움
* 구체적으로 다음과 같은 방식으로 `styled-component`를 선언한다.

  ```javascript
  const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  ```

#### 지양해야할 Declaration

* 접두사 `Styled` 미사용
  * 장점
    * 변수명 길이가 짧아짐
    * 중복 글자 제거
  * 단점: `styled-component`를 사용한 것인지 구분이 어려움

    ```javascript
    <ArticleBody>  // styled component
      <SideNavigator></SideNavigator>  // react component
    </ArticleBody>
    ```

* `HTML Tag` 미사용
  * 장점: 변수명 길이가 짧아짐
  * 단점: 브라우저에서 어떤 `HTML Tag`로 렌더링되는지 구분이 어려움

    ```javascript
    <StyledContainerBody>
      <StyledContainerHeader></StyledContainerHeader>
      <StyledContainerContent></StyledContainerContent>
    </StyledContainerBody>
    ```

* `Json` Object를 사용하는 방식
  * 장점
    * 재사용이 쉬움
      * 재사용이 아주 많은 케이스에서는 괜찮은 방식이지만, 보통 재사용이 많이 일어나지 않음
  * 단점
    * 동일 `Json` Object 내 Styled Component 간 상속이 불가능
      * 그것이 가장 빈번한 방식의 상속 패턴이지만, 불가능해짐

    ```javascript
    const S = {
      Container: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
      `,
      VerticalContainer: styled(S.Container)`  <- 동일 객체 내 참조 불가능
        flex-direction: column;
      `,
    };
    ```

#### 다층구조 컴포넌트의 처리

일반적으로 어떤 Styled Component의 하위 컴포넌트 역시 Styled Component로 작성한다.

#### 다층구조 컴포넌트의 예외적 허용

여러개의 Styled Component들이 다층구조로 구성되어 있을 때,
아래의 경우, 가독성 확보를 위해 하위 Styled Component를 만들지 않고 `HTML Tag`에 className를 붙이는 방식으로 하위 구성요소를 작성하고 상위 컴포넌트의 스타일시트에서 해당 className에 대한 스타일을 작성할 수 있다.

* 하위 구성요소가 깊이 2~3 이상의 다층 구조를 가지는 경우

  ```javascript
  const StyledDivC = styled.div`
    .title {
      ...
    }
  `;

  <StyledDivA>
    <StyledDivB>
      <StyledDivC>
        <span className="title">
          ...
        </span>
      </StyledDivC>
    </StyledDivB>
  </StyledDivA>
  ```

* 컴포넌트(Styled Component)의 하위 구성요소가 명백히 상위의 일부분인 경우
  * 다른 곳에서 재사용되는 경우 이러한 형태의 하위 구성요소라도 Styled Component로 작성할 수 있음

  ```javascript
  <StyledTableOrderList>
    <tbody>
      <tr>
        <td>
          ...
        </td>
      </tr>
    </tbody>
  </StyledTableOrderList>
  ```

* 컴포넌트(Styled Component)의 하위 구성요소가 재사용될 가능성이 없는 경우

  ```javascript
  <StyledDivContainerBody>
    <SideNavigator />
    <StyledDivContainerBodyContent>
      <div className="title">
          {props.contentTitle}
      </div>
      <div className="body">
        {props.contentBody}
      </div>
    </StyledDivContainerBodyContent>
  </StyledDivContainerBody>
  ```
