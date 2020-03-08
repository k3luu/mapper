import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
`;

export const Counter = styled.div`
  margin: 20px 0;
  text-align: right;
`;

export const TotalTimeList = styled.ul`
  list-style-type: none;

  li {
    display: flex;

    > div {
      margin: 10px;
      width: 100px;
    }
  }
`;
