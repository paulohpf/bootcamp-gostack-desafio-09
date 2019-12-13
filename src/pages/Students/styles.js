import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    div {
      display: flex;
      vertical-align: center;
      align-items: center;

      button {
        height: 36px;
        border: 0;
        border-radius: 4px;
        color: #fff;
        margin-right: 15px;
        padding: 0 15px;
        font-weight: bold;
        background: #ee4d64;
      }

      input {
        height: 36px;
        padding: 0 15px;
        border-radius: 4px;
        border: 1px solid #dddddd;

        ::placeholder {
          color: #999999;
        }
      }
    }
  }
`;

export const List = styled.div`
  table {
    width: 100%;
    text-align: left;
    border-radius: 4px 4px 0 0;
    border-collapse: separate;
    border-spacing: 0;
    background: #fff;

    tr {
      th {
        color: #444444;
        text-align: left;
        padding: 16px 16px;
        overflow-wrap: break-word;
      }

      td {
        color: #666666;
        text-align: left;
        padding: 16px 16px;
        overflow-wrap: break-word;
      }

      .edit {
        margin-right: 8px;
        color: #4d85ee;
      }

      .delete {
        color: #de3b3b;
      }
    }
  }
`;
